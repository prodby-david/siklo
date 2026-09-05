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
import { calculatePenaltyAmount } from '../utils/paymentCalculator';
import { PrismaService } from '@/database/prisma.service';
import { RoundStatus } from '@/generated/prisma/client';

@Injectable()
export class PaymentsSubmissionService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly activityService: ActivityService,
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  private async getPendingPaymentForOrganizer(
    paymentId: string,
    organizerUserId: string,
    action: 'verify' | 'reject',
  ) {
    const payment = await this.paymentsRepository.findPaymentById(paymentId);
    if (!payment) {
      throw new NotFoundException('Payment record not found');
    }

    if (payment.group.organizerId !== organizerUserId) {
      throw new ForbiddenException(`Only the organizer can ${action} payments`);
    }

    if (payment.status !== PAYMENT_STATUS.PENDING) {
      throw new ConflictException(
        `This payment has already been processed and can no longer be ${action}ed`,
      );
    }

    return {
      payment,
      cycleNum: payment.round?.cycleNumber || 1,
      turnNum: payment.round?.roundNumber || 1,
      memberName: payment.user?.name || 'Member',
    };
  }

  async submitPayment(dto: SubmitPaymentDTO, userId: string) {
    const round = await this.paymentsRepository.findRoundByRoundId(dto.roundId);
    if (!round) {
      throw new NotFoundException('Payment round not found');
    }

    const group = await this.paymentsRepository.findGroupByGroupId(
      round.groupId,
    );
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (!group.startDate) {
      throw new ConflictException('Group cycle has not started yet');
    }

    if (round.status !== RoundStatus.PENDING) {
      throw new ConflictException('This payment round is no longer open');
    }

    const currentRound =
      await this.paymentsRepository.findCurrentRoundByGroupId(group.id);
    if (!currentRound || currentRound.id !== round.id) {
      throw new ConflictException(
        'Payments are only open for the current round',
      );
    }

    if (!group.allowedPaymentMethods.includes(dto.paymentMethod)) {
      throw new BadRequestException(
        'This payment method is not allowed for the group',
      );
    }

    const membership = await this.paymentsRepository.findMembership(
      userId,
      group.id,
    );
    if (!membership) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const { savedPayment, cycleNumber, turnNumber } =
      await this.prisma.$transaction(async (tx) => {
        const existingPayment =
          await this.paymentsRepository.findPaymentByGroupRoundAndUser(
            group.id,
            round.id,
            userId,
            tx,
          );

        if (
          existingPayment &&
          existingPayment.status === PAYMENT_STATUS.VERIFIED
        ) {
          throw new ConflictException(
            'Your contribution for this cycle has already been verified and paid.',
          );
        }

        if (
          existingPayment &&
          existingPayment.status === PAYMENT_STATUS.PENDING
        ) {
          throw new ConflictException(
            'Your contribution is already awaiting organizer verification.',
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

        const hasPaidOrganizerFee =
          await this.paymentsRepository.findPriorVerifiedOrganizerFeePayment(
            group.id,
            userId,
            tx,
          );

        const isOrganizer = userId === group.organizerId;
        const isFeeApplicable =
          !isOrganizer &&
          (group.organizerFeeAmount || 0) > 0 &&
          !hasPaidOrganizerFee;

        const organizerFeeAmount =
          isFeeApplicable && dto.includeOrganizerFee === true
            ? group.organizerFeeAmount || 0
            : 0;

        const totalAmount =
          group.contributionAmount + penaltyAmount + organizerFeeAmount;

        const refLabel = dto.referenceNumber
          ? ` (Ref: ${dto.referenceNumber})`
          : '';

        const savedPayment = existingPayment
          ? await this.paymentsRepository.updatePaymentRecord(
              existingPayment.id,
              {
                paymentMethod: dto.paymentMethod,
                baseAmount: group.contributionAmount,
                penaltyAmount,
                organizerFeeAmount,
                totalAmount,
                referenceNumber: dto.referenceNumber,
                proofUrl: dto.proofUrl,
                status: PAYMENT_STATUS.PENDING,
              },
              tx,
            )
          : await this.paymentsRepository.createPayment(
              {
                groupId: group.id,
                roundId: round.id,
                userId,
                paymentMethod: dto.paymentMethod,
                baseAmount: group.contributionAmount,
                penaltyAmount,
                organizerFeeAmount,
                totalAmount,
                referenceNumber: dto.referenceNumber,
                proofUrl: dto.proofUrl,
                status: PAYMENT_STATUS.PENDING,
              },
              tx,
            );

        await this.activityService.createActivity(
          {
            userId: group.organizerId,
            groupId: group.id,
            activityType: 'PAYMENT',
            description: `${membership.user.name} submitted payment proof for Cycle #${round.cycleNumber} Turn #${round.roundNumber}${refLabel}`,
          },
          tx,
        );

        return {
          savedPayment,
          cycleNumber: round.cycleNumber,
          turnNumber: round.roundNumber,
        };
      });

    await this.notificationsService.createNotification({
      userId: group.organizerId,
      groupId: group.id,
      notificationType: 'PAYMENT',
      description: `${membership.user.name} submitted payment proof for Cycle #${cycleNumber} (Turn #${turnNumber}). Please review and verify.`,
    });

    return {
      message: 'Payment proof submitted successfully',
      payment: savedPayment,
    };
  }

  async verifyPayment(paymentId: string, organizerUserId: string) {
    const { payment, cycleNum, turnNum, memberName } =
      await this.getPendingPaymentForOrganizer(
        paymentId,
        organizerUserId,
        'verify',
      );

    const updatedPayment = await this.prisma.$transaction(async (tx) => {
      const verified =
        await this.paymentsRepository.updatePaymentStatusVerified(
          paymentId,
          tx,
        );

      await this.activityService.createActivity(
        {
          userId: payment.userId,
          groupId: payment.groupId,
          activityType: 'PAYMENT_VERIFIED',
          description: `${memberName}'s payment for Turn #${turnNum} (Cycle ${cycleNum}) was verified and approved by organizer.`,
        },
        tx,
      );

      return verified;
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
    const { payment, cycleNum, turnNum, memberName } =
      await this.getPendingPaymentForOrganizer(
        paymentId,
        organizerUserId,
        'reject',
      );

    const updatedPayment = await this.prisma.$transaction(async (tx) => {
      const rejected =
        await this.paymentsRepository.updatePaymentStatusRejected(
          paymentId,
          dto.rejectionReason,
          dto.rejectionProofUrl,
          tx,
        );

      await this.activityService.createActivity(
        {
          userId: payment.userId,
          groupId: payment.groupId,
          activityType: 'PAYMENT_REJECTED',
          description: `${memberName}'s payment for Turn #${turnNum} (Cycle ${cycleNum}) was rejected: ${dto.rejectionReason}`,
        },
        tx,
      );

      return rejected;
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
