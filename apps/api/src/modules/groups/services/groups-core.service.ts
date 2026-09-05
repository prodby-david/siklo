import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import generateInviteCode from '@/commons/utils/generateInviteCode';
import { GroupsRepository } from '../groups.repository';
import {
  CreateGroupDTO as CreateGroupData,
  UpdateGroupDTO,
} from '@siklo/shared-schemas';
import { ActivityService } from '../../activity/activity.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { shuffle } from '../utils/shuffleMembers';
import { computeGroupCompletion } from '@/commons/utils/computeGroupCompletion';
import { BILLING_CYCLE_DAYS } from '@/commons/constants/billing-cycle.constants';
import { computeNextPayoutee } from '@/commons/utils/computeNextPayoutee';
import { hasUsablePaymentAccount } from '@/commons/utils/hasUsablePaymentAccount';

@Injectable()
export class GroupsCoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupsRepository: GroupsRepository,
    private readonly activityService: ActivityService,
    private readonly notificationService: NotificationsService,
  ) {}

  async getExistingGroup(groupId: string, userId: string) {
    const group = await this.groupsRepository.getGroupById(groupId, userId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async createGroup(dto: CreateGroupData, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!hasUsablePaymentAccount(user?.paymentAccounts)) {
        throw new ForbiddenException(
          'Payment account setup required in Settings before creating a group',
        );
      }

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
      const isOrganizerParticipating = dto.isOrganizerParticipating ?? true;
      const organizerFeeAmount = isOrganizerParticipating
        ? 0
        : (dto.organizerFeeAmount ?? 0);

      if (!isOrganizerParticipating && organizerFeeAmount <= 0) {
        throw new BadRequestException(
          'Organizer fee is required when organizer is not participating in the cycle',
        );
      }

      const group = await tx.group.create({
        data: {
          name: dto.name,
          description: dto.description,
          contributionAmount: dto.contributionAmount,
          billingCycle: dto.billingCycle,
          payoutSequence: dto.payoutSequence,
          cycleDuration: dto.cycleDuration,
          maxMembers: dto.maxMembers,
          allowedPaymentMethods: dto.allowedPaymentMethods,
          paymentDetails: dto.paymentDetails,
          gracePeriodDays: dto.gracePeriodDays ?? 0,
          latePenaltyAmount: dto.latePenaltyAmount ?? 0,
          isOrganizerParticipating,
          organizerFeeAmount,
          inviteCode,
          organizerId: userId,
          startDate: dto.startDate,
        },
      });

      if (isOrganizerParticipating) {
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
      } else {
        await this.activityService.createActivity(
          {
            userId,
            groupId: group.id,
            activityType: 'ANNOUNCEMENT',
            description:
              'Created group as Manager / Facilitator (Excluded from cycle)',
          },
          tx,
        );
      }

      return {
        message: 'Group created successfully',
        group,
      };
    });
  }

  async getUsersGroup(userId: string, status?: string) {
    const groups = await this.groupsRepository.getUserGroup(userId);

    const processedGroups = groups.map((group) => {
      const completion = computeGroupCompletion(group);

      const computedStatus = completion.isComplete
        ? 'COMPLETED'
        : group.startDate
          ? 'ACTIVE'
          : 'PENDING';

      return {
        ...group,
        isCycleDone: completion.isComplete,
        status: computedStatus,
      };
    });

    if (status === 'COMPLETED') {
      return processedGroups.filter((g) => g.status === 'COMPLETED');
    }

    if (status === 'ACTIVE') {
      return processedGroups.filter((g) => g.status === 'ACTIVE');
    }

    if (status === 'PENDING' || status === 'FORMING' || status === 'UPCOMING') {
      return processedGroups.filter((g) => g.status === 'PENDING');
    }

    return processedGroups;
  }

  async getGroupById(groupId: string, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    return { ...group, nextPayoutee: computeNextPayoutee(group) };
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

    const { updatedGroup, memberships } = await this.prisma.$transaction(
      async (tx) => {
        const memberships = await tx.membership.findMany({
          where: { groupId },
        });

        if (group.payoutSequence === 'RANDOM') {
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

        const finalMemberships = await tx.membership.findMany({
          where: { groupId },
          orderBy: { position: 'asc' },
        });

        const startDate = new Date();
        const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;

        for (let c = 1; c <= group.cycleDuration; c++) {
          for (const member of finalMemberships) {
            const step = (c - 1) * finalMemberships.length + member.position;
            const targetDate = new Date(
              startDate.getTime() + step * intervalDays * 24 * 60 * 60 * 1000,
            );

            await tx.round.create({
              data: {
                groupId,
                cycleNumber: c,
                roundNumber: member.position,
                recipientId: member.userId,
                targetDate,
              },
            });
          }
        }

        const updatedGroup = await tx.group.update({
          where: { id: groupId },
          data: { startDate, inviteCode: null },
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

        return { updatedGroup, memberships: finalMemberships };
      },
    );

    for (const member of memberships) {
      await this.notificationService.createNotification({
        userId: member.userId,
        groupId,
        notificationType: 'ANNOUNCEMENT',
        description: `Your group "${group.name}" has officially started!`,
      });
    }

    return updatedGroup;
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
      await tx.payment.deleteMany({
        where: { groupId },
      });
      await tx.round.deleteMany({
        where: { groupId },
      });
      await tx.activity.deleteMany({
        where: { groupId },
      });
      await tx.notification.deleteMany({
        where: { groupId },
      });
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

  async updateGroup(groupId: string, dto: UpdateGroupDTO, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    if (group.organizerId !== userId) {
      throw new ForbiddenException('Only the organizer can edit this group');
    }

    if (group.startDate) {
      const hasCoreEdits =
        dto.name !== undefined ||
        dto.contributionAmount !== undefined ||
        dto.maxMembers !== undefined ||
        dto.billingCycle !== undefined ||
        dto.payoutSequence !== undefined ||
        dto.gracePeriodDays !== undefined ||
        dto.latePenaltyAmount !== undefined;

      if (hasCoreEdits) {
        throw new BadRequestException(
          'Group parameters cannot be modified once the cycle has started',
        );
      }
    }

    const updatedGroup = await this.groupsRepository.updateGroup(groupId, dto);

    await this.activityService.createActivity({
      userId,
      groupId,
      activityType: 'ANNOUNCEMENT',
      description: 'Group settings were updated by the organizer',
    });

    return {
      message: 'Group updated successfully',
      group: updatedGroup,
    };
  }
}
