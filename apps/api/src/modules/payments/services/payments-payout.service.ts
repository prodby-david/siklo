import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { RoundStatus } from '@/generated/prisma/client';
import {
  RequestAdvancePayoutDTO,
  DisbursePayoutDTO,
  ConfirmPayoutReceiptDTO,
} from '@siklo/shared-schemas';
import { ActivityService } from '../../activity/activity.service';
import { GroupsCoreService } from '../../groups/services/groups-core.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { PaymentsRepository } from '../payments.repository';
import { BILLING_CYCLE_DAYS } from '@/commons/constants/billing-cycle.constants';
import {
  calculateRoundStep,
  calculateTargetDate,
} from '../utils/paymentCalculator';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class PaymentsPayoutService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly activityService: ActivityService,
    private readonly groupsCoreService: GroupsCoreService,
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  async requestAdvancePayout(dto: RequestAdvancePayoutDTO, userId: string) {
    const group = await this.groupsCoreService.getExistingGroup(
      dto.groupId,
      userId,
    );

    if (!group.startDate) {
      throw new ConflictException('Group cycle has not started yet');
    }

    const memberships = group.memberships || [];
    const userMembership = memberships.find((m) => m.userId === userId);
    if (!userMembership) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const currentCycle = dto.cycleNumber || 1;
    const targetTurn = dto.turnNumber || userMembership.position;

    if (userMembership.position !== targetTurn) {
      throw new ForbiddenException(
        'You can only request payout for your assigned turn position',
      );
    }

    let round = dto.roundId
      ? await this.paymentsRepository.findRoundByRoundId(dto.roundId)
      : null;

    if (round && round.groupId !== dto.groupId) {
      throw new ForbiddenException('Invalid round for this group');
    }

    if (!round) {
      round = await this.paymentsRepository.findRoundByGroupCycleAndNumber(
        dto.groupId,
        currentCycle,
        targetTurn,
      );
    }

    const groupPayments =
      await this.paymentsRepository.findVerifiedPaymentsByGroupId(dto.groupId);

    const verifiedRoundPayments = groupPayments.filter((p) => {
      if (round && p.roundId === round.id) return true;
      return (
        p.round?.cycleNumber === currentCycle &&
        p.round?.roundNumber === targetTurn
      );
    });

    const totalMembers = memberships.length || group.maxMembers;
    if (verifiedRoundPayments.length < totalMembers) {
      throw new BadRequestException(
        `Advance payout is only available after all ${totalMembers} members have completed verified contributions for this round`,
      );
    }

    const poolTotal = (group.contributionAmount || 0) * totalMembers;
    const notesInfo = dto.notes ? ` (Note: ${dto.notes})` : '';
    const description = `${userMembership.user.name} requested an advance payout of ₱${poolTotal.toLocaleString()} for Turn #${targetTurn} (Cycle ${currentCycle}) [Payout Details: ${dto.accountDetails}]${notesInfo}.`;

    await this.activityService.createActivity({
      userId,
      groupId: dto.groupId,
      activityType: 'PAYMENT',
      description,
    });

    if (group.organizerId && group.organizerId !== userId) {
      await this.notificationsService.createNotification({
        userId: group.organizerId,
        groupId: dto.groupId,
        notificationType: 'PAYOUT',
        description: `${userMembership.user.name} has requested an advance payout of ₱${poolTotal.toLocaleString()} for Turn #${targetTurn} (Cycle ${currentCycle}).`,
      });
    }

    return {
      success: true,
      message: 'Advance payout request submitted to group organizer',
      poolTotal,
      targetTurn,
      cycleNumber: currentCycle,
    };
  }

  async disbursePayout(dto: DisbursePayoutDTO, organizerUserId: string) {
    const group = await this.groupsCoreService.getExistingGroup(
      dto.groupId,
      organizerUserId,
    );

    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException(
        'Only the group organizer can disburse round payouts',
      );
    }

    const memberships = group.memberships || [];
    const currentCycle = dto.cycleNumber || 1;
    const targetTurn = dto.turnNumber || 1;

    let round = dto.roundId
      ? await this.paymentsRepository.findRoundByRoundId(dto.roundId)
      : null;

    if (round && round.groupId !== dto.groupId) {
      throw new ForbiddenException('Invalid round for this group');
    }

    if (!round && currentCycle > group.cycleDuration) {
      throw new BadRequestException(
        `Cycle ${currentCycle} does not exist for this group`,
      );
    }

    if (!round) {
      round = await this.paymentsRepository.findRoundByGroupCycleAndNumber(
        dto.groupId,
        currentCycle,
        targetTurn,
      );
    }

    const recipientMembership = memberships.find(
      (m) =>
        (round && m.userId === round.recipientId) || m.position === targetTurn,
    );

    if (!recipientMembership) {
      throw new NotFoundException('Recipient member not found for this turn');
    }

    const newRoundData = !round
      ? {
          groupId: dto.groupId,
          cycleNumber: currentCycle,
          roundNumber: recipientMembership.position,
          recipientId: recipientMembership.userId,
          targetDate: calculateTargetDate(
            group.startDate || new Date(),
            calculateRoundStep(
              currentCycle,
              recipientMembership.position,
              memberships.length || 1,
            ),
            BILLING_CYCLE_DAYS[group.billingCycle] || 30,
          ),
        }
      : undefined;

    const recipientName =
      recipientMembership.user?.name || 'Scheduled Beneficiary';
    const recipientUserId = recipientMembership.userId;
    const totalMembers = memberships.length || group.maxMembers;
    const poolTotal = (group.contributionAmount || 0) * totalMembers;

    const gatewayInfo = recipientMembership.preferredPaymentMethod
      ? `${recipientMembership.preferredPaymentMethod}${
          recipientMembership.paymentAccountDetails
            ? `: ${recipientMembership.paymentAccountDetails}`
            : ''
        }`
      : 'Preferred Gateway';

    const refInfo = dto.referenceNumber ? ` [Ref: ${dto.referenceNumber}]` : '';
    const description = `Organizer disbursed the lump-sum payout of ₱${poolTotal.toLocaleString()} to ${recipientName} for Turn #${targetTurn} (Cycle ${currentCycle}) via ${gatewayInfo}${refInfo}.`;

    await this.prisma.$transaction(async (tx) => {
      if (newRoundData) {
        round = await this.paymentsRepository.findOrCreateRound(
          newRoundData,
          tx,
        );
      }

      await this.activityService.createActivity(
        {
          userId: organizerUserId,
          groupId: dto.groupId,
          activityType: 'PAYOUT_DISBURSED',
          description,
        },
        tx,
      );
    });

    if (recipientUserId && recipientUserId !== organizerUserId) {
      await this.notificationsService.createNotification({
        userId: recipientUserId,
        groupId: dto.groupId,
        notificationType: 'PAYOUT',
        description: `Organizer has disbursed your payout of ₱${poolTotal.toLocaleString()} for Turn #${targetTurn}. Please confirm receipt on your dashboard.`,
      });
    }

    return {
      success: true,
      message: 'Payout marked as disbursed and notification sent to member',
      round,
      poolTotal,
      recipientName,
    };
  }

  async confirmPayoutReceipt(
    dto: ConfirmPayoutReceiptDTO,
    recipientUserId: string,
  ) {
    const group = await this.groupsCoreService.getExistingGroup(
      dto.groupId,
      recipientUserId,
    );

    if (!group.startDate) {
      throw new ConflictException('Group cycle has not started yet');
    }

    const memberships = group.memberships || [];
    const userMembership = memberships.find(
      (m) => m.userId === recipientUserId,
    );
    if (!userMembership) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const currentCycle = dto.cycleNumber || 1;
    const targetTurn = dto.turnNumber || userMembership.position;

    if (userMembership.position !== targetTurn) {
      throw new ForbiddenException(
        'You can only confirm payout receipt for your assigned turn position',
      );
    }

    let round = dto.roundId
      ? await this.paymentsRepository.findRoundByRoundId(dto.roundId)
      : null;

    if (round && round.groupId !== dto.groupId) {
      throw new ForbiddenException('Invalid round for this group');
    }

    if (!round && currentCycle > group.cycleDuration) {
      throw new BadRequestException(
        `Cycle ${currentCycle} does not exist for this group`,
      );
    }

    if (!round) {
      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const totalMembers = memberships.length || 1;
      const step = calculateRoundStep(
        currentCycle,
        userMembership.position,
        totalMembers,
      );
      const targetDate = calculateTargetDate(
        group.startDate,
        step,
        intervalDays,
      );

      round = await this.paymentsRepository.findOrCreateRound({
        groupId: dto.groupId,
        cycleNumber: currentCycle,
        roundNumber: userMembership.position,
        recipientId: recipientUserId,
        targetDate,
      });
    }

    if (round.status === RoundStatus.PAID) {
      throw new ConflictException(
        'Payout receipt for this round has already been confirmed',
      );
    }

    const totalMembers = memberships.length || group.maxMembers;
    const poolTotal = (group.contributionAmount || 0) * totalMembers;
    const notesInfo = dto.notes ? ` (Note: ${dto.notes})` : '';
    const description = `${userMembership.user.name} confirmed receipt of ₱${poolTotal.toLocaleString()} payout for Turn #${targetTurn} (Cycle ${currentCycle})${notesInfo}.`;

    const updatedRound = await this.prisma.$transaction(async (tx) => {
      const paidRound = await this.paymentsRepository.updateRoundStatus(
        round.id,
        RoundStatus.PAID,
        tx,
      );

      await this.activityService.createActivity(
        {
          userId: recipientUserId,
          groupId: dto.groupId,
          activityType: 'PAYOUT_DISBURSED',
          description,
        },
        tx,
      );

      return paidRound;
    });

    if (group.organizerId && group.organizerId !== recipientUserId) {
      await this.notificationsService.createNotification({
        userId: group.organizerId,
        groupId: dto.groupId,
        notificationType: 'PAYOUT',
        description: `${userMembership.user.name} confirmed receiving their ₱${poolTotal.toLocaleString()} payout for Turn #${targetTurn} (Cycle ${currentCycle}).`,
      });
    }

    return {
      success: true,
      message: 'Payout receipt confirmed successfully',
      round: updatedRound,
      poolTotal,
    };
  }
}
