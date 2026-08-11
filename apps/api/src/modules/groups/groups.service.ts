import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import {
  Prisma,
  PaymentMethodType,
  BackupFundAction,
  PaymentStatus,
} from '@/generated/prisma/client';
import { PrismaService } from '@/database/prisma.service';
import generateInviteCode from '@/commons/utils/generateInviteCode';
import { GroupsRepository } from './groups.repository';
import { CreateGroupData } from './schema/create-group.schema';
import {
  JoinGroupBodyDTO,
  JoinGroupDTO,
  SubmitPaymentDTO,
  RejectPaymentDTO,
  UpdateMemberPaymentPreferenceDTO,
  UpdateGroupDTO,
} from '@siklo/shared-schemas';
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
          enableBackupFund: dto.enableBackupFund ?? false,
          backupFundPerTurn: dto.backupFundPerTurn ?? 0,
          backupFundAction: dto.backupFundAction ?? 'EQUAL_REFUND',
          inviteCode,
          organizerId: userId,
          startDate: dto.startDate,
        },
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
        data: { startDate: new Date(), inviteCode: null },
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

  async submitPayment(dto: SubmitPaymentDTO, userId: string) {
    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const round = await this.prisma.round.findUnique({
      where: { id: dto.roundId },
    });
    if (!round) {
      throw new NotFoundException('Round not found');
    }

    const membership = await this.prisma.membership.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId: dto.groupId,
        },
      },
      include: { user: true },
    });
    if (!membership) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const now = new Date();
    const dueDateWithGrace = new Date(round.targetDate);
    dueDateWithGrace.setDate(
      dueDateWithGrace.getDate() + group.gracePeriodDays,
    );

    let penaltyAmount = 0;
    if (now > dueDateWithGrace) {
      const daysOverdue = Math.ceil(
        (now.getTime() - dueDateWithGrace.getTime()) / (1000 * 3600 * 24),
      );
      penaltyAmount =
        Math.max(0, daysOverdue) *
        (group.contributionAmount * (group.latePenaltyAmount / 100));
    }

    const backupFundAmount = group.enableBackupFund
      ? (group.backupFundPerTurn ?? 0)
      : 0;
    const totalAmount =
      group.contributionAmount + penaltyAmount + backupFundAmount;

    const payment = await this.prisma.payment.create({
      data: {
        groupId: dto.groupId,
        roundId: dto.roundId,
        userId,
        paymentMethod: dto.paymentMethod,
        baseAmount: group.contributionAmount,
        penaltyAmount,
        backupFundAmount,
        totalAmount,
        referenceNumber: dto.referenceNumber,
        proofUrl: dto.proofUrl,
        status: PaymentStatus.PENDING,
      },
    });

    await this.activityService.createActivity({
      userId: group.organizerId,
      groupId: dto.groupId,
      activityType: 'PAYMENT',
      description: `${membership.user.name} submitted payment proof for Round #${round.roundNumber} (Ref: ${dto.referenceNumber || 'N/A'})`,
    });

    return {
      message: 'Payment proof submitted successfully',
      payment,
    };
  }

  async verifyPayment(paymentId: string, organizerUserId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { group: true, user: true, round: true },
    });
    if (!payment) {
      throw new NotFoundException('Payment record not found');
    }

    if (payment.group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can verify payments');
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.VERIFIED,
        verifiedAt: new Date(),
      },
    });

    await this.activityService.createActivity({
      userId: payment.userId,
      groupId: payment.groupId,
      activityType: 'PAYMENT_VERIFIED',
      description: `Payment for Round #${payment.round.roundNumber} was verified and approved by organizer.`,
    });

    return {
      message: 'Payment verified successfully',
      payment: updatedPayment,
    };
  }

  async rejectPayment(
    paymentId: string,
    dto: RejectPaymentDTO,
    organizerUserId: string,
  ) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { group: true, user: true, round: true },
    });
    if (!payment) {
      throw new NotFoundException('Payment record not found');
    }

    if (payment.group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can reject payments');
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.REJECTED,
        rejectionReason: dto.rejectionReason,
        rejectionProofUrl: dto.rejectionProofUrl,
      },
    });

    await this.activityService.createActivity({
      userId: payment.userId,
      groupId: payment.groupId,
      activityType: 'PAYMENT_REJECTED',
      description: `Payment for Round #${payment.round.roundNumber} was rejected by organizer. Reason: ${dto.rejectionReason}`,
    });

    return {
      message: 'Payment rejected successfully',
      payment: updatedPayment,
    };
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

  async getPendingPayments(groupId: string, organizerUserId: string) {
    const group = await this.getExistingGroup(groupId, organizerUserId);
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException(
        'Only the organizer can view pending verification queue',
      );
    }

    return this.prisma.payment.findMany({
      where: {
        groupId,
        status: PaymentStatus.PENDING,
      },
      include: {
        user: true,
        round: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getEqualBackupRefundSummary(groupId: string, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    const payments = await this.prisma.payment.findMany({
      where: { groupId },
    });
    const memberships = await this.prisma.membership.findMany({
      where: { groupId },
    });

    const totalBackupCollected = payments.reduce(
      (acc, p) => acc + p.backupFundAmount,
      0,
    );
    const totalPenaltiesCollected = payments.reduce(
      (acc, p) => acc + p.penaltyAmount,
      0,
    );
    const totalMembers = memberships.length;

    const refundPerMember =
      totalMembers > 0 ? Math.floor(totalBackupCollected / totalMembers) : 0;

    return {
      enableBackupFund: group.enableBackupFund,
      totalBackupCollected,
      totalPenaltiesCollected,
      totalMembers,
      refundPerMember,
      hasZeroDefaults: totalPenaltiesCollected === 0,
    };
  }

  async markMemberPaid(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
    cycleNumber?: number,
  ) {
    const group = await this.getExistingGroup(groupId, organizerUserId);
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException(
        'Only the organizer can mark members as paid',
      );
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
      throw new ForbiddenException('Only the organizer can post announcements');
    }

    const activity = await this.activityService.createActivity({
      userId: organizerUserId,
      groupId,
      activityType: 'ANNOUNCEMENT',
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
        dto.latePenaltyAmount !== undefined ||
        dto.enableBackupFund !== undefined ||
        dto.backupFundPerTurn !== undefined;

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
