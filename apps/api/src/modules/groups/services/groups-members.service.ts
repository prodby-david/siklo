import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { GroupsRepository } from '../groups.repository';
import {
  JoinGroupBodyDTO,
  JoinGroupDTO,
  UpdateMemberPaymentPreferenceDTO,
} from '@siklo/shared-schemas';
import { ActivityService } from '../../activity/activity.service';
import { GroupsCoreService } from './groups-core.service';
import { hasUsablePaymentAccount } from '@/commons/utils/hasUsablePaymentAccount';

@Injectable()
export class GroupsMembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupsRepository: GroupsRepository,
    private readonly activityService: ActivityService,
    private readonly groupsCoreService: GroupsCoreService,
  ) {}

  private async ensureNotMember(
    tx: Prisma.TransactionClient,
    dto: JoinGroupDTO,
  ) {
    const existingMembership = await this.groupsRepository.findMembership(
      tx,
      dto,
    );

    if (existingMembership) {
      throw new ConflictException('You are already a member of this group');
    }
  }

  async joinGroup(dto: JoinGroupBodyDTO, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!hasUsablePaymentAccount(user?.paymentAccounts)) {
        throw new ForbiddenException(
          'Payout account setup required in Settings before joining a group',
        );
      }

      const group = await this.groupsRepository.findGroupByInviteCode(
        tx,
        dto.inviteCode,
      );
      if (!group) {
        throw new NotFoundException(
          "Group doesn't exist. Please check the invite code and try again.",
        );
      }

      if (group.startDate) {
        throw new ConflictException(
          'Group invite is closed because the cycle has already started or completed.',
        );
      }

      const existingMemberships =
        await this.groupsRepository.findMembershipsByGroupId(tx, group.id);

      if (existingMemberships.length >= group.maxMembers) {
        throw new ConflictException('Group is already full');
      }

      const takenPositions = new Set(
        existingMemberships.map((m) => m.position),
      );

      let position: number;
      if (group.payoutSequence === 'FREECHOOSING' && dto.position) {
        if (dto.position < 1 || dto.position > group.maxMembers) {
          throw new ConflictException(
            `Invalid position. Must be between 1 and ${group.maxMembers}`,
          );
        }
        if (takenPositions.has(dto.position)) {
          throw new ConflictException(
            'This slot has already been chosen by another member',
          );
        }
        position = dto.position;
      } else {
        let firstFree = 1;
        while (firstFree <= group.maxMembers && takenPositions.has(firstFree)) {
          firstFree++;
        }
        if (firstFree > group.maxMembers) {
          throw new ConflictException('Group is already full');
        }
        position = firstFree;
      }

      await this.ensureNotMember(tx, {
        groupId: group.id,
        userId,
      });

      const MAX_GROUPS_PER_USER = 3;
      const membershipCount = await this.groupsRepository.countUserMemberships(
        tx,
        userId,
      );
      if (membershipCount >= MAX_GROUPS_PER_USER) {
        throw new ConflictException(
          `You can only be part of up to ${MAX_GROUPS_PER_USER} groups`,
        );
      }
      await this.groupsRepository.createMembership(
        tx,
        {
          groupId: group.id,
          userId,
        },
        position,
      );

      await this.activityService.createActivity(
        {
          userId,
          groupId: group.id,
          activityType: 'ROTATED',
          description: `Joined the group at Slot #${position}`,
        },
        tx,
      );

      return {
        message: 'Group joined successfully',
        groupId: group.id,
      };
    });
  }

  async updateMemberPaymentPreference(
    groupId: string,
    dto: UpdateMemberPaymentPreferenceDTO,
    userId: string,
  ) {
    const membership = await this.prisma.membership.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    const updatedMembership = await this.prisma.membership.update({
      where: { id: membership.id },
      data: {
        preferredPaymentMethod: dto.preferredPaymentMethod,
        paymentAccountDetails: dto.paymentAccountDetails,
      },
    });

    return {
      message: 'Payout receiving preference updated successfully',
      membership: updatedMembership,
    };
  }

  async removeMember(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
  ) {
    const group = await this.groupsCoreService.getExistingGroup(
      groupId,
      organizerUserId,
    );
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can remove members');
    }
    if (memberUserId === organizerUserId) {
      throw new ForbiddenException(
        'Organizer cannot be removed from the group',
      );
    }
    if (group.startDate) {
      throw new ConflictException(
        'Cannot remove members after group cycle has started',
      );
    }

    const targetMember = group.memberships?.find(
      (m) => m.userId === memberUserId,
    );
    if (!targetMember) {
      throw new NotFoundException('Member not found in this group');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.membership.delete({
        where: {
          userId_groupId: {
            userId: memberUserId,
            groupId,
          },
        },
      });

      await this.activityService.createActivity(
        {
          userId: organizerUserId,
          groupId,
          activityType: 'ROTATED',
          description: `${targetMember.user.name} was removed from the group by the organizer.`,
        },
        tx,
      );

      return {
        message: 'Member removed successfully',
        memberUserId,
      };
    });
  }
}
