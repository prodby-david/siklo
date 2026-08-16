import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { SubmitPaymentDTO, RejectPaymentDTO } from '@siklo/shared-schemas';
import { ActivityService } from '../../activity/activity.service';
import { GroupsCoreService } from './groups-core.service';

const PaymentStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;

@Injectable()
export class GroupsPaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityService: ActivityService,
    private readonly groupsCoreService: GroupsCoreService,
  ) {}

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

    const totalAmount = group.contributionAmount + penaltyAmount;

    const payment = await this.prisma.payment.create({
      data: {
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

  async markMemberPaid(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
    cycleNumber?: number,
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
}
