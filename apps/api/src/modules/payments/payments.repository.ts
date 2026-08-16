import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { PaymentStatus, PaymentMethodType } from '@/generated/prisma/client';

export interface CreatePaymentRecordData {
  groupId: string;
  roundId: string;
  userId: string;
  paymentMethod: PaymentMethodType;
  baseAmount: number;
  penaltyAmount: number;
  totalAmount: number;
  referenceNumber?: string;
  proofUrl?: string;
  status: PaymentStatus;
  rejectionReason?: string;
  rejectionProofUrl?: string;
}

@Injectable()
export class PaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(data: CreatePaymentRecordData) {
    return this.prisma.payment.create({
      data,
    });
  }

  async findPaymentById(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        group: true,
        user: true,
        round: true,
      },
    });
  }

  async updatePaymentStatusVerified(id: string) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.VERIFIED,
        verifiedAt: new Date(),
      },
    });
  }

  async updatePaymentStatusRejected(
    id: string,
    rejectionReason: string,
    rejectionProofUrl?: string,
  ) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.REJECTED,
        rejectionReason,
        rejectionProofUrl,
      },
    });
  }

  async findPendingPaymentsByGroupId(groupId: string) {
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

  async findGroupPayments(groupId: string) {
    return this.prisma.payment.findMany({
      where: { groupId },
    });
  }

  async findGroupMemberships(groupId: string) {
    return this.prisma.membership.findMany({
      where: { groupId },
    });
  }

  async findMembership(userId: string, groupId: string) {
    return this.prisma.membership.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
      include: { user: true },
    });
  }

  async findGroupByGroupId(groupId: string) {
    return this.prisma.group.findUnique({
      where: { id: groupId },
    });
  }

  async findRoundByRoundId(roundId: string) {
    return this.prisma.round.findUnique({
      where: { id: roundId },
    });
  }

  async findUserActiveGroupsWithMemberships(userId: string) {
    return this.prisma.group.findMany({
      where: {
        startDate: { not: null },
        memberships: {
          some: { userId },
        },
      },
      include: {
        memberships: {
          include: { user: true },
        },
        rounds: {
          include: {
            payments: true,
          },
        },
        payments: true,
      },
    });
  }

  async findNextPendingRoundForRecipient(userId: string) {
    return this.prisma.round.findFirst({
      where: {
        recipientId: userId,
        status: 'PENDING',
      },
      orderBy: { targetDate: 'asc' },
      include: {
        group: true,
      },
    });
  }

  async findRoundByGroupCycleAndNumber(
    groupId: string,
    cycleNumber: number,
    roundNumber: number,
  ) {
    return this.prisma.round.findUnique({
      where: {
        groupId_cycleNumber_roundNumber: {
          groupId,
          cycleNumber,
          roundNumber,
        },
      },
    });
  }

  async createRound(data: {
    groupId: string;
    cycleNumber: number;
    roundNumber: number;
    recipientId: string;
    targetDate: Date;
  }) {
    return this.prisma.round.create({
      data,
    });
  }

  async findPaymentByGroupRoundAndUser(
    groupId: string,
    roundId: string,
    userId: string,
  ) {
    return this.prisma.payment.findFirst({
      where: {
        groupId,
        roundId,
        userId,
      },
    });
  }

  async updatePaymentRecord(
    id: string,
    data: {
      status?: PaymentStatus;
      verifiedAt?: Date | null;
      rejectionReason?: string | null;
      rejectionProofUrl?: string | null;
      referenceNumber?: string | null;
      proofUrl?: string | null;
      baseAmount?: number;
      penaltyAmount?: number;
      totalAmount?: number;
      paymentMethod?: PaymentMethodType;
    },
  ) {
    return this.prisma.payment.update({
      where: { id },
      data,
    });
  }

  async findVerifiedPaymentsByGroupId(groupId: string) {
    return this.prisma.payment.findMany({
      where: {
        groupId,
        status: PaymentStatus.VERIFIED,
      },
      include: {
        round: true,
      },
    });
  }
}
