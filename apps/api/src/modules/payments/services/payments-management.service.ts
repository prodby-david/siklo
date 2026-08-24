import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PaymentMethodType } from '@/generated/prisma/client';
import { ActivityService } from '../../activity/activity.service';
import { GroupsCoreService } from '../../groups/services/groups-core.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { PaymentsRepository } from '../payments.repository';
import { PAYMENT_STATUS } from '../constants/payment.constants';
import { BILLING_CYCLE_DAYS } from '@/commons/constants/billing-cycle.constants';
import {
  calculateRoundStep,
  calculateTargetDate,
} from '../utils/paymentCalculator';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class PaymentsManagementService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly activityService: ActivityService,
    private readonly groupsCoreService: GroupsCoreService,
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  async getPendingPayments(groupId?: string, organizerUserId?: string) {
    if (!organizerUserId) {
      throw new ForbiddenException(
        'Authentication required to view pending verification queue',
      );
    }

    if (groupId) {
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

    return this.paymentsRepository.findPendingPaymentsByOrganizerId(
      organizerUserId,
    );
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

    const hasProof = Boolean(proofUrl && proofUrl.trim().length > 0);
    if (!hasProof) {
      throw new BadRequestException(
        'Payment receipt proof image is required when marking a member as paid',
      );
    }

    const targetMember = group.memberships?.find(
      (m) => m.userId === memberUserId,
    );
    if (!targetMember) {
      throw new NotFoundException('Member not found in this group');
    }

    const currentCycleNum = cycleNumber || 1;

    if (currentCycleNum > group.cycleDuration) {
      throw new BadRequestException(
        `Cycle ${currentCycleNum} does not exist for this group`,
      );
    }

    const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
    const totalMembers = group.memberships?.length || 1;
    const step = calculateRoundStep(
      currentCycleNum,
      targetMember.position,
      totalMembers,
    );
    const targetDate = calculateTargetDate(group.startDate, step, intervalDays);

    const cycleInfo = cycleNumber ? ` (Cycle ${cycleNumber})` : '';
    const refInfo = referenceNumber ? ` [Ref: ${referenceNumber}]` : '';
    const description = `${targetMember.user.name}'s payment for Turn #${targetMember.position}${cycleInfo} was verified and marked as paid by the organizer${refInfo}.`;

    const paymentRecord = await this.prisma.$transaction(async (tx) => {
      const round = await this.paymentsRepository.findOrCreateRound(
        {
          groupId,
          cycleNumber: currentCycleNum,
          roundNumber: targetMember.position,
          recipientId: targetMember.userId,
          targetDate,
        },
        tx,
      );

      const existingPayment =
        await this.paymentsRepository.findPaymentByGroupRoundAndUser(
          groupId,
          round.id,
          memberUserId,
          tx,
        );

      const savedPayment = existingPayment
        ? await this.paymentsRepository.updatePaymentRecord(
            existingPayment.id,
            {
              status: PAYMENT_STATUS.VERIFIED,
              verifiedAt: new Date(),
              referenceNumber:
                referenceNumber || existingPayment.referenceNumber,
              proofUrl: proofUrl || existingPayment.proofUrl,
              baseAmount: group.contributionAmount,
              penaltyAmount: 0,
              totalAmount: group.contributionAmount,
            },
            tx,
          )
        : await this.paymentsRepository.createPayment(
            {
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
              status: PAYMENT_STATUS.VERIFIED,
            },
            tx,
          );

      await this.activityService.createActivity(
        {
          userId: organizerUserId,
          groupId,
          activityType: 'PAYMENT_VERIFIED',
          description,
        },
        tx,
      );

      return savedPayment;
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

    if (currentCycleNum > group.cycleDuration) {
      throw new BadRequestException(
        `Cycle ${currentCycleNum} does not exist for this group`,
      );
    }

    const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
    const totalMembers = group.memberships?.length || 1;
    const step = calculateRoundStep(
      currentCycleNum,
      targetMember.position,
      totalMembers,
    );
    const targetDate = calculateTargetDate(group.startDate, step, intervalDays);

    const cycleInfo = cycleNumber ? ` (Cycle ${cycleNumber})` : '';
    const reasonInfo = reason ? `: ${reason}` : '';
    const description = `${targetMember.user.name}'s payment for Turn #${targetMember.position}${cycleInfo} was marked as rejected by the organizer${reasonInfo}.`;

    const paymentRecord = await this.prisma.$transaction(async (tx) => {
      const round = await this.paymentsRepository.findOrCreateRound(
        {
          groupId,
          cycleNumber: currentCycleNum,
          roundNumber: targetMember.position,
          recipientId: targetMember.userId,
          targetDate,
        },
        tx,
      );

      const existingPayment =
        await this.paymentsRepository.findPaymentByGroupRoundAndUser(
          groupId,
          round.id,
          memberUserId,
          tx,
        );

      const savedPayment = existingPayment
        ? await this.paymentsRepository.updatePaymentRecord(
            existingPayment.id,
            {
              status: PAYMENT_STATUS.REJECTED,
              rejectionReason: reason,
              rejectionProofUrl,
            },
            tx,
          )
        : await this.paymentsRepository.createPayment(
            {
              groupId,
              roundId: round.id,
              userId: memberUserId,
              paymentMethod:
                (targetMember.preferredPaymentMethod as PaymentMethodType) ||
                PaymentMethodType.CASH,
              baseAmount: group.contributionAmount,
              penaltyAmount: 0,
              totalAmount: group.contributionAmount,
              status: PAYMENT_STATUS.REJECTED,
              rejectionReason: reason,
              rejectionProofUrl,
            },
            tx,
          );

      await this.activityService.createActivity(
        {
          userId: organizerUserId,
          groupId,
          activityType: 'PAYMENT_REJECTED',
          description,
        },
        tx,
      );

      return savedPayment;
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
}
