import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/database/prisma.service';
import generateInviteCode from '@/commons/utils/generateInviteCode';
import { GroupsRepository } from './groups.repository';
import { CreateGroupData } from './schema/create-group.schema';
import { JoinGroupBodyDTO, JoinGroupDTO } from '@siklo/shared-schemas';
import { ActivityService } from '../activity/activity.service';
import { shuffle } from './utils/shuffle.members';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupsRepository: GroupsRepository,
    private readonly activityService: ActivityService,
  ) {}

  private async getExistingGroup(groupId: string, userId: string) {
    const group = await this.groupsRepository.getGroupById(groupId, userId);

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

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

  async createGroup(dto: CreateGroupData, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const existingGroup = await this.groupsRepository.findGroupByName(
        tx,
        dto.name,
      );

      if (existingGroup) {
        throw new ConflictException('Group name already exist');
      }

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

      const inviteCode = generateInviteCode();
      const group = await this.groupsRepository.createGroup(tx, {
        ...dto,
        inviteCode,
        organizerId: userId,
      });

      await this.groupsRepository.createMembership(
        tx,
        {
          groupId: group.id,
          userId,
        },
        1,
      );

      await this.activityService.createActivity(
        {
          userId,
          groupId: group.id,
          activityType: 'ROTATED',
          description: 'Joined the group as Organizer at Slot #1',
        },
        tx,
      );

      return {
        message: 'Group created successfully',
        group,
      };
    });
  }

  async joinGroup(dto: JoinGroupBodyDTO, userId: string) {
    return this.prisma.$transaction(async (tx) => {
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
        while (
          firstFree <= group.maxMembers &&
          takenPositions.has(firstFree)
        ) {
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

  async getUsersGroup(userId: string, status?: string) {
    const groups = await this.groupsRepository.getUserGroup(userId);

    const processedGroups = groups.map((group) => {
      const verifiedPayments = (group.activities || []).filter(
        (a) => a.activity === 'PAYMENT_VERIFIED',
      ).length;
      const requiredPayments = group.maxMembers || 0;
      const isCycleDone =
        !!group.startDate &&
        requiredPayments > 0 &&
        verifiedPayments >= requiredPayments;

      const computedStatus = isCycleDone
        ? 'COMPLETED'
        : group.startDate
        ? 'ACTIVE'
        : 'UPCOMING';

      return {
        ...group,
        isCycleDone,
        status: computedStatus,
      };
    });

    if (status === 'COMPLETED') {
      return processedGroups.filter((g) => g.isCycleDone);
    }

    if (status === 'ACTIVE') {
      return processedGroups.filter((g) => !g.isCycleDone);
    }

    return processedGroups;
  }

  async getGroupById(groupId: string, userId: string) {
    return this.getExistingGroup(groupId, userId);
  }

  async startGroupCycle(groupId: string, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    if (group.organizerId !== userId) {
      throw new ForbiddenException('Only the organizer can start the cycle');
    }
    if (group.startDate) {
      throw new ConflictException('Group cycle has already started');
    }

    if (group._count.memberships < 3) {
      throw new ConflictException(
        'At least 3 members are required to start a cycle',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      if (group.payoutSequence === 'RANDOM') {
        const memberships = await tx.membership.findMany({
          where: { groupId },
        });

        for (let i = 0; i < memberships.length; i++) {
          await tx.membership.update({
            where: { id: memberships[i].id },
            data: { position: -(i + 1) },
          });
        }

        const positions = Array.from(
          { length: memberships.length },
          (_, i) => i + 1,
        );

        const shuffled = shuffle(positions);

        for (let i = 0; i < memberships.length; i++) {
          await tx.membership.update({
            where: { id: memberships[i].id },
            data: { position: shuffled[i] },
          });
        }
      }

      const updatedGroup = await tx.group.update({
        where: { id: groupId },
        data: { startDate: new Date() },
      });

      await this.activityService.createActivity(
        {
          userId,
          groupId,
          activityType: 'CYCLE_STARTED',
          description: 'Cycle started by the organizer',
        },
        tx,
      );

      return updatedGroup;
    });
  }

  async getGroupByInviteCodePreview(inviteCode: string) {
    const group =
      await this.groupsRepository.getGroupPreviewByInviteCode(inviteCode);
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
    return group;
  }

  async markMemberPaid(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
    cycleNumber?: number,
  ) {
    const group = await this.getExistingGroup(groupId, organizerUserId);
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can mark members as paid');
    }
    if (!group.startDate) {
      throw new ConflictException('Group cycle has not started yet');
    }

    const targetMember = group.memberships?.find(
      (m) => m.userId === memberUserId,
    );
    if (!targetMember) {
      throw new NotFoundException('Member not found in this group');
    }

    const cycleInfo = cycleNumber ? ` (Cycle ${cycleNumber})` : '';
    const description = `${targetMember.user.name}'s payment for Turn #${targetMember.position}${cycleInfo} was verified and marked as paid by the organizer.`;

    await this.activityService.createActivity({
      userId: organizerUserId,
      groupId,
      activityType: 'PAYMENT_VERIFIED',
      description,
    });

    return {
      message: 'Member marked as paid successfully',
      memberUserId,
      cycleNumber,
    };
  }

  async sendAnnouncement(
    groupId: string,
    message: string,
    organizerUserId: string,
  ) {
    const group = await this.getExistingGroup(groupId, organizerUserId);
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException(
        'Only the organizer can post announcements',
      );
    }

    const activity = await this.activityService.createActivity({
      userId: organizerUserId,
      groupId,
      activityType: 'ANNOUNCEMENT' as any,
      description: message,
    });

    return {
      message: 'Announcement posted successfully',
      activity,
    };
  }

  async removeMember(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
  ) {
    const group = await this.getExistingGroup(groupId, organizerUserId);
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

  async selectSlot(groupId: string, position: number, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    if (group.startDate) {
      throw new ConflictException(
        'Cannot select slot after group cycle has started',
      );
    }
    if (group.payoutSequence !== 'FREECHOOSING') {
      throw new ConflictException(
        'Slot selection is only available for Free Choice groups',
      );
    }
    if (position < 1 || position > group.maxMembers) {
      throw new ConflictException(
        `Invalid position. Must be between 1 and ${group.maxMembers}`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const occupied = await this.groupsRepository.findMembershipByPosition(
        tx,
        groupId,
        position,
      );
      if (occupied && occupied.userId !== userId) {
        throw new ConflictException(
          'This slot has already been claimed by another member',
        );
      }

      await tx.membership.update({
        where: {
          userId_groupId: {
            userId,
            groupId,
          },
        },
        data: { position },
      });

      await this.activityService.createActivity(
        {
          userId,
          groupId,
          activityType: 'ROTATED',
          description: `Selected Slot #${position}`,
        },
        tx,
      );

      return {
        message: 'Slot selected successfully',
        position,
      };
    });
  }

  async deleteGroup(groupId: string, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    if (group.organizerId !== userId) {
      throw new ForbiddenException('Only the organizer can delete the group');
    }
    if (group.startDate) {
      throw new ConflictException(
        'Cannot delete a group whose cycle has already started',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.membership.deleteMany({
        where: { groupId },
      });
      await tx.group.delete({
        where: { id: groupId },
      });
      return {
        message: 'Group deleted successfully',
      };
    });
  }

  async updateGroupDescription(
    groupId: string,
    description: string | undefined,
    userId: string,
  ) {
    const group = await this.getExistingGroup(groupId, userId);
    if (group.organizerId !== userId) {
      throw new ForbiddenException(
        'Only the organizer can update the group description',
      );
    }

    const updatedGroup = await this.groupsRepository.updateGroupDescription(
      groupId,
      description,
    );

    await this.activityService.createActivity({
      userId,
      groupId,
      activityType: 'ROTATED',
      description: 'Group description was updated by the organizer',
    });

    return {
      message: 'Group description updated successfully',
      group: updatedGroup,
    };
  }
}
