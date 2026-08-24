import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SubmitPaymentDTO, RejectPaymentDTO } from '@siklo/shared-schemas';
import { ActivityService } from '../../activity/activity.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { PaymentsRepository } from '../payments.repository';
import { PAYMENT_STATUS } from '../constants/payment.constants';
import { BILLING_CYCLE_DAYS } from '@/commons/constants/billing-cycle.constants';
import {
  calculatePenaltyAmount,
  calculateRoundStep,
  calculateTargetDate,
} from '../utils/paymentCalculator';

@Injectable()
export class PaymentsSubmissionService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly activityService: ActivityService,
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

    let round =
      dto.roundId && dto.roundId !== 'current'
        ? await this.paymentsRepository.findRoundByRoundId(dto.roundId)
        : null;

    if (round && round.groupId !== dto.groupId) {
      throw new ForbiddenException('Invalid round for this group');
    }

    if (!round) {
      if (targetCycleNum > group.cycleDuration) {
        throw new BadRequestException(
          `Cycle ${targetCycleNum} does not exist for this group`,
        );
      }

      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const totalMembers = group.memberships?.length || 1;
      const step = calculateRoundStep(
        targetCycleNum,
        targetTurnNum,
        totalMembers,
      );
      const targetDate = calculateTargetDate(
        group.startDate,
        step,
        intervalDays,
      );

      const recipientMember = group.memberships?.find(
        (m) => m.position === targetTurnNum,
      );

      round = await this.paymentsRepository.findOrCreateRound({
        groupId: dto.groupId,
        cycleNumber: targetCycleNum,
        roundNumber: targetTurnNum,
        recipientId: recipientMember?.userId || membership.userId,
        targetDate,
      });
    }

    const existingPayment =
      await this.paymentsRepository.findPaymentByGroupRoundAndUser(
        dto.groupId,
        round.id,
        userId,
      );

    if (existingPayment && existingPayment.status === PAYMENT_STATUS.VERIFIED) {
      throw new ConflictException(
        'Your contribution for this cycle has already been verified and paid.',
      );
    }

    const now = new Date();
    const penaltyAmount = calculatePenaltyAmount(
      now,
      round.targetDate,
      group.gracePeriodDays,
      group.contributionAmount,
      group.latePenaltyAmount,
    );

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
          status: PAYMENT_STATUS.PENDING,
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
        status: PAYMENT_STATUS.PENDING,
      });
    }

    const refLabel = dto.referenceNumber
      ? ` (Ref: ${dto.referenceNumber})`
      : '';

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

    if (payment.status !== PAYMENT_STATUS.PENDING) {
      throw new ConflictException(
        'This payment has already been processed and can no longer be verified',
      );
    }

    const updatedPayment =
      await this.paymentsRepository.updatePaymentStatusVerified(paymentId);

    const cycleNum = payment.round?.cycleNumber || 1;
    const turnNum = payment.round?.roundNumber || 1;
    const memberName = payment.user?.name || 'Member';

    await this.activityService.createActivity({
      userId: payment.userId,
      groupId: payment.groupId,
      activityType: 'PAYMENT_VERIFIED',
      description: `${memberName}'s payment for Turn #${turnNum} (Cycle ${cycleNum}) was verified and approved by organizer.`,
    });

    await this.notificationsService.createNotification({
      userId: payment.userId,
      groupId: payment.groupId,
      notificationType: 'PAYMENT',
      description: `Your payment of ₱${payment.totalAmount.toLocaleString()} for Turn #${turnNum} (Cycle ${cycleNum}) was approved and verified by the organizer.`,
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

    if (payment.status !== PAYMENT_STATUS.PENDING) {
      throw new ConflictException(
        'This payment has already been processed and can no longer be rejected',
      );
    }

    const updatedPayment =
      await this.paymentsRepository.updatePaymentStatusRejected(
        paymentId,
        dto.rejectionReason,
        dto.rejectionProofUrl,
      );

    const cycleNum = payment.round?.cycleNumber || 1;
    const turnNum = payment.round?.roundNumber || 1;
    const memberName = payment.user?.name || 'Member';

    await this.activityService.createActivity({
      userId: payment.userId,
      groupId: payment.groupId,
      activityType: 'PAYMENT_REJECTED',
      description: `${memberName}'s payment for Turn #${turnNum} (Cycle ${cycleNum}) was rejected: ${dto.rejectionReason}`,
    });

    await this.notificationsService.createNotification({
      userId: payment.userId,
      groupId: payment.groupId,
      notificationType: 'PAYMENT',
      description: `Your payment proof for Turn #${turnNum} (Cycle ${cycleNum}) was rejected: ${dto.rejectionReason}. Please resubmit valid payment proof.`,
    });

    return {
      message: 'Payment rejected successfully',
      payment: updatedPayment,
    };
  }
}
