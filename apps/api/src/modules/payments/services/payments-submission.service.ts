import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { SubmitPaymentDTO, RejectPaymentDTO } from '@siklo/shared-schemas';
import { ActivityService } from '../../activity/activity.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { PaymentsRepository } from '../payments.repository';
import {
  BILLING_CYCLE_DAYS,
  PAYMENT_STATUS,
} from '../constants/payment.constants';
import {
  calculatePenaltyAmount,
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
        : await this.paymentsRepository.findRoundByGroupCycleAndNumber(
            dto.groupId,
            targetCycleNum,
            targetTurnNum,
          );

    if (round && round.groupId !== dto.groupId) {
      throw new ForbiddenException('Invalid round for this group');
    }

    if (!round) {
      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const totalMembers = group.maxMembers || 1;
      const step = (targetCycleNum - 1) * totalMembers + targetTurnNum;
      const targetDate = calculateTargetDate(
        group.startDate,
        step,
        intervalDays,
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
}
