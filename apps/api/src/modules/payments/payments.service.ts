import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SubmitPaymentDTO, RejectPaymentDTO } from '@siklo/shared-schemas';
import { ActivityService } from '../activity/activity.service';
import { GroupsCoreService } from '../groups/services/groups-core.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PaymentsRepository } from './payments.repository';

import { PaymentMethodType } from '@/generated/prisma/client';

const PaymentStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly activityService: ActivityService,
    private readonly groupsCoreService: GroupsCoreService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async submitPayment(dto: SubmitPaymentDTO, userId: string) {
    const group = await this.paymentsRepository.findGroupByGroupId(dto.groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const membership = await this.paymentsRepository.findMembership(
      userId,
      dto.groupId,
    );
    if (!membership) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const targetCycleNum = dto.cycleNumber || 1;
    const targetTurnNum = dto.turnNumber || membership.position;

    let round = dto.roundId && dto.roundId !== 'current'
      ? await this.paymentsRepository.findRoundByRoundId(dto.roundId)
      : await this.paymentsRepository.findRoundByGroupCycleAndNumber(
          dto.groupId,
          targetCycleNum,
          targetTurnNum,
        );

    if (!round) {
      const BILLING_CYCLE_DAYS: Record<string, number> = {
        DAILY: 1,
        WEEKLY: 7,
        BIMONTHLY: 15,
        MONTHLY: 30,
        QUARTERLY: 90,
      };
      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const startMs = group.startDate
        ? new Date(group.startDate).getTime()
        : Date.now();
      const totalMembers = group.maxMembers || 1;
      const step = (targetCycleNum - 1) * totalMembers + targetTurnNum;
      const targetDate = new Date(
        startMs + step * intervalDays * 24 * 60 * 60 * 1000,
      );

      round = await this.paymentsRepository.createRound({
        groupId: dto.groupId,
        cycleNumber: targetCycleNum,
        roundNumber: targetTurnNum,
        recipientId: membership.userId,
        targetDate,
      });
    }

    const existingPayment =
      await this.paymentsRepository.findPaymentByGroupRoundAndUser(
        dto.groupId,
        round.id,
        userId,
      );

    if (existingPayment && existingPayment.status === PaymentStatus.VERIFIED) {
      throw new ConflictException(
        'Your contribution for this cycle has already been verified and paid.',
      );
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

    const totalAmount = group.contributionAmount + penaltyAmount;

    let payment;
    if (existingPayment) {
      payment = await this.paymentsRepository.updatePaymentRecord(
        existingPayment.id,
        {
          paymentMethod: dto.paymentMethod,
          baseAmount: group.contributionAmount,
          penaltyAmount,
          totalAmount,
          referenceNumber: dto.referenceNumber,
          proofUrl: dto.proofUrl,
          status: PaymentStatus.PENDING,
        },
      );
    } else {
      payment = await this.paymentsRepository.createPayment({
        groupId: dto.groupId,
        roundId: round.id,
        userId,
        paymentMethod: dto.paymentMethod,
        baseAmount: group.contributionAmount,
        penaltyAmount,
        totalAmount,
        referenceNumber: dto.referenceNumber,
        proofUrl: dto.proofUrl,
        status: PaymentStatus.PENDING,
      });
    }

    const refLabel = dto.referenceNumber ? ` (Ref: ${dto.referenceNumber})` : '';

    await this.activityService.createActivity({
      userId: group.organizerId,
      groupId: dto.groupId,
      activityType: 'PAYMENT',
      description: `${membership.user.name} submitted payment proof for Cycle #${round.cycleNumber} Turn #${round.roundNumber}${refLabel}`,
    });

    await this.notificationsService.createNotification({
      userId: group.organizerId,
      groupId: dto.groupId,
      notificationType: 'PAYMENT',
      description: `${membership.user.name} submitted payment proof for Cycle #${round.cycleNumber} (Turn #${round.roundNumber}). Please review and verify.`,
    });

    return {
      message: 'Payment proof submitted successfully',
      payment,
    };
  }

  async verifyPayment(paymentId: string, organizerUserId: string) {
    const payment = await this.paymentsRepository.findPaymentById(paymentId);
    if (!payment) {
      throw new NotFoundException('Payment record not found');
    }

    if (payment.group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can verify payments');
    }

    const updatedPayment =
      await this.paymentsRepository.updatePaymentStatusVerified(paymentId);

    await this.activityService.createActivity({
      userId: payment.userId,
      groupId: payment.groupId,
      activityType: 'PAYMENT_VERIFIED',
      description: `Payment for Round #${payment.round.roundNumber} was verified and approved by organizer.`,
    });

    await this.notificationsService.createNotification({
      userId: payment.userId,
      groupId: payment.groupId,
      notificationType: 'PAYMENT',
      description: `Your payment of ₱${payment.totalAmount.toLocaleString()} for Round #${payment.round.roundNumber} was approved and verified by the organizer.`,
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
    const payment = await this.paymentsRepository.findPaymentById(paymentId);
    if (!payment) {
      throw new NotFoundException('Payment record not found');
    }

    if (payment.group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can reject payments');
    }

    const updatedPayment =
      await this.paymentsRepository.updatePaymentStatusRejected(
        paymentId,
        dto.rejectionReason,
        dto.rejectionProofUrl,
      );

    await this.activityService.createActivity({
      userId: payment.userId,
      groupId: payment.groupId,
      activityType: 'PAYMENT_REJECTED',
      description: `Payment for Round #${payment.round.roundNumber} was rejected: ${dto.rejectionReason}`,
    });

    await this.notificationsService.createNotification({
      userId: payment.userId,
      groupId: payment.groupId,
      notificationType: 'PAYMENT',
      description: `Your payment proof for Round #${payment.round.roundNumber} was rejected: ${dto.rejectionReason}. Please resubmit valid payment proof.`,
    });

    return {
      message: 'Payment rejected successfully',
      payment: updatedPayment,
    };
  }

  async getPendingPayments(groupId: string, organizerUserId: string) {
    const group = await this.groupsCoreService.getExistingGroup(
      groupId,
      organizerUserId,
    );
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException(
        'Only the organizer can view pending verification queue',
      );
    }

    return this.paymentsRepository.findPendingPaymentsByGroupId(groupId);
  }

  async markMemberPaid(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
    cycleNumber?: number,
    referenceNumber?: string,
    proofUrl?: string,
  ) {
    const group = await this.groupsCoreService.getExistingGroup(
      groupId,
      organizerUserId,
    );
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException(
        'Only the organizer can mark members as paid',
      );
    }
    if (!group.startDate) {
      throw new ConflictException('Group cycle has not started yet');
    }

    const hasRef = Boolean(referenceNumber && referenceNumber.trim().length >= 3);
    const hasProof = Boolean(proofUrl && proofUrl.trim().length > 0);
    if (!hasRef && !hasProof) {
      throw new BadRequestException(
        'Please provide either a transaction reference number or a receipt image',
      );
    }

    const targetMember = group.memberships?.find(
      (m) => m.userId === memberUserId,
    );
    if (!targetMember) {
      throw new NotFoundException('Member not found in this group');
    }

    const currentCycleNum = cycleNumber || 1;

    let round = await this.paymentsRepository.findRoundByGroupCycleAndNumber(
      groupId,
      currentCycleNum,
      targetMember.position,
    );

    if (!round) {
      const BILLING_CYCLE_DAYS: Record<string, number> = {
        DAILY: 1,
        WEEKLY: 7,
        BIMONTHLY: 15,
        MONTHLY: 30,
        QUARTERLY: 90,
      };
      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const startMs = group.startDate
        ? new Date(group.startDate).getTime()
        : Date.now();
      const totalMembers = group.memberships?.length || 1;
      const step = (currentCycleNum - 1) * totalMembers + targetMember.position;
      const targetDate = new Date(
        startMs + step * intervalDays * 24 * 60 * 60 * 1000,
      );

      round = await this.paymentsRepository.createRound({
        groupId,
        cycleNumber: currentCycleNum,
        roundNumber: targetMember.position,
        recipientId: targetMember.userId,
        targetDate,
      });
    }

    const existingPayment =
      await this.paymentsRepository.findPaymentByGroupRoundAndUser(
        groupId,
        round.id,
        memberUserId,
      );

    let paymentRecord;
    if (existingPayment) {
      paymentRecord = await this.paymentsRepository.updatePaymentRecord(
        existingPayment.id,
        {
          status: PaymentStatus.VERIFIED,
          verifiedAt: new Date(),
          referenceNumber: referenceNumber || existingPayment.referenceNumber,
          proofUrl: proofUrl || existingPayment.proofUrl,
          baseAmount: group.contributionAmount,
          totalAmount: group.contributionAmount,
        },
      );
    } else {
      paymentRecord = await this.paymentsRepository.createPayment({
        groupId,
        roundId: round.id,
        userId: memberUserId,
        paymentMethod:
          (targetMember.preferredPaymentMethod as PaymentMethodType) ||
          PaymentMethodType.CASH,
        baseAmount: group.contributionAmount,
        penaltyAmount: 0,
        totalAmount: group.contributionAmount,
        referenceNumber,
        proofUrl,
        status: PaymentStatus.VERIFIED,
      });
    }

    const cycleInfo = cycleNumber ? ` (Cycle ${cycleNumber})` : '';
    const refInfo = referenceNumber ? ` [Ref: ${referenceNumber}]` : '';
    const description = `${targetMember.user.name}'s payment for Turn #${targetMember.position}${cycleInfo} was verified and marked as paid by the organizer${refInfo}.`;

    await this.activityService.createActivity({
      userId: organizerUserId,
      groupId,
      activityType: 'PAYMENT_VERIFIED',
      description,
    });

    await this.notificationsService.createNotification({
      userId: memberUserId,
      groupId,
      notificationType: 'PAYMENT',
      description: `Your payment for Turn #${targetMember.position}${cycleInfo} was verified and approved by the organizer${refInfo}.`,
    });

    return {
      message: 'Member marked as paid successfully',
      memberUserId,
      cycleNumber,
      referenceNumber,
      proofUrl,
      payment: paymentRecord,
    };
  }

  async markMemberRejected(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
    reason?: string,
    cycleNumber?: number,
    rejectionProofUrl?: string,
  ) {
    const group = await this.groupsCoreService.getExistingGroup(
      groupId,
      organizerUserId,
    );
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can reject payments');
    }

    const targetMember = group.memberships?.find(
      (m) => m.userId === memberUserId,
    );
    if (!targetMember) {
      throw new NotFoundException('Member not found in this group');
    }

    const currentCycleNum = cycleNumber || 1;

    let round = await this.paymentsRepository.findRoundByGroupCycleAndNumber(
      groupId,
      currentCycleNum,
      targetMember.position,
    );

    if (!round) {
      const BILLING_CYCLE_DAYS: Record<string, number> = {
        DAILY: 1,
        WEEKLY: 7,
        BIMONTHLY: 15,
        MONTHLY: 30,
        QUARTERLY: 90,
      };
      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const startMs = group.startDate
        ? new Date(group.startDate).getTime()
        : Date.now();
      const totalMembers = group.memberships?.length || 1;
      const step = (currentCycleNum - 1) * totalMembers + targetMember.position;
      const targetDate = new Date(
        startMs + step * intervalDays * 24 * 60 * 60 * 1000,
      );

      round = await this.paymentsRepository.createRound({
        groupId,
        cycleNumber: currentCycleNum,
        roundNumber: targetMember.position,
        recipientId: targetMember.userId,
        targetDate,
      });
    }

    const existingPayment =
      await this.paymentsRepository.findPaymentByGroupRoundAndUser(
        groupId,
        round.id,
        memberUserId,
      );

    let paymentRecord;
    if (existingPayment) {
      paymentRecord = await this.paymentsRepository.updatePaymentRecord(
        existingPayment.id,
        {
          status: PaymentStatus.REJECTED,
          rejectionReason: reason,
          rejectionProofUrl,
        },
      );
    } else {
      paymentRecord = await this.paymentsRepository.createPayment({
        groupId,
        roundId: round.id,
        userId: memberUserId,
        paymentMethod:
          (targetMember.preferredPaymentMethod as PaymentMethodType) ||
          PaymentMethodType.CASH,
        baseAmount: group.contributionAmount,
        penaltyAmount: 0,
        totalAmount: group.contributionAmount,
        status: PaymentStatus.REJECTED,
        rejectionReason: reason,
        rejectionProofUrl,
      });
    }

    const cycleInfo = cycleNumber ? ` (Cycle ${cycleNumber})` : '';
    const reasonInfo = reason ? `: ${reason}` : '';
    const description = `${targetMember.user.name}'s payment for Turn #${targetMember.position}${cycleInfo} was marked as rejected by the organizer${reasonInfo}.`;

    await this.activityService.createActivity({
      userId: organizerUserId,
      groupId,
      activityType: 'PAYMENT_REJECTED',
      description,
    });

    await this.notificationsService.createNotification({
      userId: memberUserId,
      groupId,
      notificationType: 'PAYMENT',
      description: `Your payment for Turn #${targetMember.position}${cycleInfo} was rejected by the organizer${reasonInfo}. Please check and resubmit.`,
    });

    return {
      message: 'Payment rejected and member kept unpaid',
      memberUserId,
      cycleNumber,
      rejectionProofUrl,
      payment: paymentRecord,
    };
  }

  async getNearestUnpaidContribution(userId: string) {
    const activeGroups =
      await this.paymentsRepository.findUserActiveGroupsWithMemberships(userId);

    const nonCompletedGroups = activeGroups.filter(
      (group) => !this.isGroupCycleCompleted(group),
    );

    const due = this.computeNextUnpaidContribution(nonCompletedGroups, userId);
    const payout = this.computeNextUpcomingPayout(nonCompletedGroups, userId);

    return {
      nextContributionAmount: due.amount,
      nearestDueDate: due.dueDate,
      dueGroupName: due.groupName,
      dueGroupId: due.groupId,
      nearestGroupName: due.groupName,
      nearestGroupId: due.groupId,
      activeGroupsCount: nonCompletedGroups.length,
      nextPayoutDate: payout.date,
      nextPayoutAmount: payout.amount,
      nextPayoutGroupName: payout.groupName,
      nextPayoutGroupId: payout.groupId,
    };
  }

  private isGroupCycleCompleted(
    group: Awaited<
      ReturnType<
        typeof this.paymentsRepository.findUserActiveGroupsWithMemberships
      >
    >[number],
  ): boolean {
    if (
      !group.startDate ||
      !group.memberships ||
      group.memberships.length === 0
    ) {
      return false;
    }

    const memberCount = group.memberships.length;
    const duration = group.cycleDuration || 1;
    const totalRequiredPayments = duration * memberCount * memberCount;

    const verifiedPayments = (group.payments || []).filter(
      (p) => p.status === PaymentStatus.VERIFIED,
    );

    return verifiedPayments.length >= totalRequiredPayments;
  }

  private computeNextUnpaidContribution(
    groups: Awaited<
      ReturnType<
        typeof this.paymentsRepository.findUserActiveGroupsWithMemberships
      >
    >,
    userId: string,
  ) {
    const BILLING_CYCLE_DAYS: Record<string, number> = {
      DAILY: 1,
      WEEKLY: 7,
      BIMONTHLY: 15,
      MONTHLY: 30,
      QUARTERLY: 90,
    };

    let earliestDue: {
      amount: number;
      dueDate: string | null;
      groupName: string;
      groupId: string;
    } | null = null;

    for (const group of groups) {
      if (!group.startDate) continue;

      const membership = group.memberships.find((m) => m.userId === userId);
      if (!membership) continue;

      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const startMs = new Date(group.startDate).getTime();
      const memberCount = group.memberships.length;
      const verifiedPayments = group.payments || [];

      for (let c = 1; c <= group.cycleDuration; c++) {
        for (let turn = 1; turn <= memberCount; turn++) {
          const matchingRound = group.rounds?.find(
            (r) => r.cycleNumber === c && r.roundNumber === turn,
          );

          const hasPaid = verifiedPayments.some((p) => {
            if (p.status !== PaymentStatus.VERIFIED || p.userId !== userId) {
              return false;
            }
            return matchingRound ? p.roundId === matchingRound.id : true;
          });

          if (!hasPaid) {
            const step = (c - 1) * memberCount + (turn - 1);
            const dueMs = startMs + step * intervalDays * 24 * 60 * 60 * 1000;
            const dueIso = new Date(dueMs).toISOString();

            if (!earliestDue || dueIso < (earliestDue.dueDate || '')) {
              earliestDue = {
                amount: group.contributionAmount,
                dueDate: dueIso,
                groupName: group.name,
                groupId: group.id,
              };
            }
            break;
          }
        }
      }
    }

    return (
      earliestDue || {
        amount: 0,
        dueDate: null,
        groupName: '',
        groupId: '',
      }
    );
  }

  private computeNextUpcomingPayout(
    groups: Awaited<
      ReturnType<
        typeof this.paymentsRepository.findUserActiveGroupsWithMemberships
      >
    >,
    userId: string,
  ) {
    const BILLING_CYCLE_DAYS: Record<string, number> = {
      DAILY: 1,
      WEEKLY: 7,
      BIMONTHLY: 15,
      MONTHLY: 30,
      QUARTERLY: 90,
    };

    let earliestPayout: {
      date: string | null;
      amount: number;
      groupName: string;
      groupId: string;
    } | null = null;

    for (const group of groups) {
      if (!group.startDate) continue;

      const membership = group.memberships.find((m) => m.userId === userId);
      if (!membership) continue;

      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const startMs = new Date(group.startDate).getTime();
      const memberCount = group.memberships.length;
      const payoutAmount = group.contributionAmount * group.maxMembers;

      for (let c = 1; c <= group.cycleDuration; c++) {
        const round = group.rounds?.find(
          (r) => r.cycleNumber === c && r.roundNumber === membership.position,
        );

        if (round && round.status === 'PAID') {
          continue;
        }

        const step = (c - 1) * memberCount + membership.position;
        const payoutMs = startMs + step * intervalDays * 24 * 60 * 60 * 1000;
        const payoutIso = new Date(payoutMs).toISOString();

        if (!earliestPayout || payoutIso < (earliestPayout.date || '')) {
          earliestPayout = {
            date: payoutIso,
            amount: payoutAmount,
            groupName: group.name,
            groupId: group.id,
          };
        }
        break;
      }
    }

    return (
      earliestPayout || {
        date: null,
        amount: 0,
        groupName: '',
        groupId: '',
      }
    );
  }
}
