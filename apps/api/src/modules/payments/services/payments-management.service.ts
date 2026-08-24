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
import {
  BILLING_CYCLE_DAYS,
  PAYMENT_STATUS,
} from '../constants/payment.constants';
import {
  calculateRoundStep,
  calculateTargetDate,
} from '../utils/paymentCalculator';

@Injectable()
export class PaymentsManagementService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly activityService: ActivityService,
    private readonly groupsCoreService: GroupsCoreService,
    private readonly notificationsService: NotificationsService,
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

    let round = await this.paymentsRepository.findRoundByGroupCycleAndNumber(
      groupId,
      currentCycleNum,
      targetMember.position,
    );

    if (!round) {
      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const totalMembers = group.memberships?.length || 1;
      const step = calculateRoundStep(
        currentCycleNum,
        targetMember.position,
        totalMembers,
      );
      const targetDate = calculateTargetDate(
        group.startDate,
        step,
        intervalDays,
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
          status: PAYMENT_STATUS.VERIFIED,
          verifiedAt: new Date(),
          referenceNumber: referenceNumber || existingPayment.referenceNumber,
          proofUrl: proofUrl || existingPayment.proofUrl,
          baseAmount: group.contributionAmount,
          penaltyAmount: 0,
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
        status: PAYMENT_STATUS.VERIFIED,
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
      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const totalMembers = group.memberships?.length || 1;
      const step = calculateRoundStep(
        currentCycleNum,
        targetMember.position,
        totalMembers,
      );
      const targetDate = calculateTargetDate(
        group.startDate,
        step,
        intervalDays,
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
          status: PAYMENT_STATUS.REJECTED,
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
        status: PAYMENT_STATUS.REJECTED,
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
}
