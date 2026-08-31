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

  private calculatePoolTotal(
    contributionAmount: number,
    totalMembers: number,
  ): number {
    return (contributionAmount || 0) * totalMembers;
  }

  async requestAdvancePayout(dto: RequestAdvancePayoutDTO, userId: string) {
    const round = await this.paymentsRepository.findRoundByRoundId(dto.roundId);
    if (!round) {
      throw new NotFoundException('Payout round not found');
    }

    const group = await this.groupsCoreService.getExistingGroup(
      round.groupId,
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

    if (round.recipientId !== userId) {
      throw new ForbiddenException(
        'Only the assigned recipient can request this payout',
      );
    }

    const currentRound =
      await this.paymentsRepository.findCurrentRoundByGroupId(group.id);
    if (!currentRound || currentRound.id !== round.id) {
      throw new ConflictException(
        'Only the current payout round can be requested',
      );
    }

    const groupPayments =
      await this.paymentsRepository.findVerifiedPaymentsByGroupId(group.id);
    const verifiedUserIds = new Set(
      groupPayments
        .filter((payment) => payment.roundId === round.id)
        .map((payment) => payment.userId),
    );

    const totalMembers = memberships.length || group.maxMembers;
    if (
      verifiedUserIds.size !== memberships.length ||
      memberships.some((membership) => !verifiedUserIds.has(membership.userId))
    ) {
      throw new BadRequestException(
        `Advance payout is only available after all ${totalMembers} members have completed verified contributions for this round`,
      );
    }

    const poolTotal = this.calculatePoolTotal(
      group.contributionAmount,
      totalMembers,
    );
    const notesInfo = dto.notes ? ` (Note: ${dto.notes})` : '';
    const description = `${userMembership.user.name} requested an advance payout of ₱${poolTotal.toLocaleString()} for Turn #${round.roundNumber} (Cycle ${round.cycleNumber}) [Payout Details: ${dto.accountDetails}]${notesInfo}.`;

    await this.activityService.createActivity({
      userId,
      groupId: group.id,
      activityType: 'PAYMENT',
      description,
    });

    if (group.organizerId && group.organizerId !== userId) {
      await this.notificationsService.createNotification({
        userId: group.organizerId,
        groupId: group.id,
        notificationType: 'PAYOUT',
        description: `${userMembership.user.name} has requested an advance payout of ₱${poolTotal.toLocaleString()} for Turn #${round.roundNumber} (Cycle ${round.cycleNumber}).`,
      });
    }

    return {
      success: true,
      message: 'Advance payout request submitted to group organizer',
      poolTotal,
      targetTurn: round.roundNumber,
      cycleNumber: round.cycleNumber,
    };
  }

  async disbursePayout(dto: DisbursePayoutDTO, organizerUserId: string) {
    const round = await this.paymentsRepository.findRoundByRoundId(dto.roundId);
    if (!round) {
      throw new NotFoundException('Payout round not found');
    }

    const group = await this.groupsCoreService.getExistingGroup(
      round.groupId,
      organizerUserId,
    );

    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException(
        'Only the group organizer can disburse round payouts',
      );
    }

    if (!group.startDate) {
      throw new ConflictException('Group cycle has not started yet');
    }

    if (round.status !== RoundStatus.PENDING) {
      throw new ConflictException(
        'This payout round is not awaiting disbursement',
      );
    }

    const currentRound =
      await this.paymentsRepository.findCurrentRoundByGroupId(group.id);
    if (!currentRound || currentRound.id !== round.id) {
      throw new ConflictException(
        'Only the current payout round can be disbursed',
      );
    }

    const memberships = group.memberships || [];
    const recipientMembership = memberships.find(
      (membership) => membership.userId === round.recipientId,
    );

    if (!recipientMembership) {
      throw new NotFoundException('Recipient member not found for this turn');
    }

    const totalMembers = memberships.length || group.maxMembers;
    const groupPayments =
      await this.paymentsRepository.findVerifiedPaymentsByGroupId(group.id);
    const verifiedUserIds = new Set(
      groupPayments
        .filter((payment) => payment.roundId === round.id)
        .map((payment) => payment.userId),
    );

    if (
      verifiedUserIds.size !== memberships.length ||
      memberships.some((membership) => !verifiedUserIds.has(membership.userId))
    ) {
      throw new BadRequestException(
        `All ${totalMembers} members must complete verified contributions before releasing payout`,
      );
    }

    const recipientName =
      recipientMembership.user?.name || 'Scheduled Beneficiary';
    const recipientUserId = recipientMembership.userId;
    const poolTotal = this.calculatePoolTotal(
      group.contributionAmount,
      totalMembers,
    );

    const gatewayInfo = recipientMembership.preferredPaymentMethod
      ? `${recipientMembership.preferredPaymentMethod}${
          recipientMembership.paymentAccountDetails
            ? `: ${recipientMembership.paymentAccountDetails}`
            : ''
        }`
      : 'Preferred Gateway';

    const refInfo = dto.referenceNumber ? ` [Ref: ${dto.referenceNumber}]` : '';
    const description = `Organizer disbursed the lump-sum payout of ₱${poolTotal.toLocaleString()} to ${recipientName} for Turn #${round.roundNumber} (Cycle ${round.cycleNumber}) via ${gatewayInfo}${refInfo}.`;

    const updatedRound = await this.prisma.$transaction(async (tx) => {
      const activeRound = await this.paymentsRepository.transitionRoundStatus(
        round.id,
        RoundStatus.PENDING,
        RoundStatus.DISBURSED,
        {
          disbursedAt: new Date(),
          disbursementReferenceNumber: dto.referenceNumber || null,
          disbursementProofUrl: dto.proofUrl || null,
        },
        tx,
      );
      if (!activeRound) {
        throw new ConflictException('This payout round has already changed');
      }

      await this.activityService.createActivity(
        {
          userId: organizerUserId,
          groupId: group.id,
          activityType: 'PAYOUT_DISBURSED',
          description,
        },
        tx,
      );

      return activeRound;
    });

    if (recipientUserId && recipientUserId !== organizerUserId) {
      await this.notificationsService.createNotification({
        userId: recipientUserId,
        groupId: group.id,
        notificationType: 'PAYOUT',
        description: `Organizer has disbursed your payout of ₱${poolTotal.toLocaleString()} for Turn #${round.roundNumber} (Cycle ${round.cycleNumber}).`,
      });
    }

    return {
      success: true,
      message: 'Payout marked as disbursed and awaiting recipient confirmation',
      round: updatedRound,
      poolTotal,
      recipientName,
    };
  }

  async confirmPayoutReceipt(
    dto: ConfirmPayoutReceiptDTO,
    recipientUserId: string,
  ) {
    const round = await this.paymentsRepository.findRoundByRoundId(dto.roundId);
    if (!round) {
      throw new NotFoundException('Payout round not found');
    }

    const group = await this.groupsCoreService.getExistingGroup(
      round.groupId,
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

    if (round.recipientId !== recipientUserId) {
      throw new ForbiddenException(
        'Only the assigned recipient can confirm this payout receipt',
      );
    }

    const totalMembers = memberships.length || group.maxMembers;
    if (round.status !== RoundStatus.DISBURSED) {
      throw new ConflictException(
        round.status === RoundStatus.RECEIVED
          ? 'Payout receipt for this round has already been confirmed'
          : 'The organizer has not disbursed this payout yet',
      );
    }

    const poolTotal = this.calculatePoolTotal(
      group.contributionAmount,
      totalMembers,
    );
    const notesInfo = dto.notes ? ` (Note: ${dto.notes})` : '';
    const description = `${userMembership.user.name} confirmed receipt of ₱${poolTotal.toLocaleString()} payout for Turn #${round.roundNumber} (Cycle ${round.cycleNumber})${notesInfo}.`;

    const updatedRound = await this.prisma.$transaction(async (tx) => {
      const receivedRound = await this.paymentsRepository.transitionRoundStatus(
        round.id,
        RoundStatus.DISBURSED,
        RoundStatus.RECEIVED,
        { receivedAt: new Date(), receiptNotes: dto.notes || null },
        tx,
      );
      if (!receivedRound) {
        throw new ConflictException('This payout round has already changed');
      }

      await this.activityService.createActivity(
        {
          userId: recipientUserId,
          groupId: group.id,
          activityType: 'PAYOUT_RECEIVED',
          description,
        },
        tx,
      );

      return receivedRound;
    });

    if (group.organizerId && group.organizerId !== recipientUserId) {
      await this.notificationsService.createNotification({
        userId: group.organizerId,
        groupId: group.id,
        notificationType: 'PAYOUT',
        description: `${userMembership.user.name} confirmed receiving their ₱${poolTotal.toLocaleString()} payout for Turn #${round.roundNumber} (Cycle ${round.cycleNumber}).`,
      });
    }

    const nextRound = await this.paymentsRepository.findNextUnpaidRoundAfter(
      group.id,
      round.cycleNumber,
      round.roundNumber,
    );

    if (nextRound) {
      for (const member of memberships) {
        if (member.userId === recipientUserId) continue;
        await this.notificationsService.createNotification({
          userId: member.userId,
          groupId: group.id,
          notificationType: 'PAYOUT',
          description: `Turn #${nextRound.roundNumber} (Cycle ${nextRound.cycleNumber}) contributions are now open.`,
        });
      }
    }

    return {
      success: true,
      message: 'Payout receipt confirmed successfully',
      round: updatedRound,
      poolTotal,
    };
  }
}
