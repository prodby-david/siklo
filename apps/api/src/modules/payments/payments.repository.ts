import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import {
  PaymentStatus,
  PaymentMethodType,
  RoundStatus,
  Prisma,
} from '@/generated/prisma/client';

export interface CreatePaymentRecordData {
  groupId: string;
  roundId: string;
  userId: string;
  paymentMethod: PaymentMethodType;
  baseAmount: number;
  penaltyAmount: number;
  organizerFeeAmount?: number;
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

  async createPayment(
    data: CreatePaymentRecordData,
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.payment.create({
      data,
    });
  }

  async findPaymentById(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        group: { select: { id: true, organizerId: true } },
        user: { select: { id: true, name: true } },
        round: { select: { id: true, cycleNumber: true, roundNumber: true } },
      },
    });
  }

  async updatePaymentStatusVerified(id: string, tx?: Prisma.TransactionClient) {
    const db = tx ?? this.prisma;
    return db.payment.update({
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
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.payment.update({
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
        user: { select: { id: true, name: true, email: true } },
        round: { select: { id: true, cycleNumber: true, roundNumber: true } },
        group: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findPendingPaymentsByOrganizerId(organizerUserId: string) {
    return this.prisma.payment.findMany({
      where: {
        group: { organizerId: organizerUserId },
        status: PaymentStatus.PENDING,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        round: { select: { id: true, cycleNumber: true, roundNumber: true } },
        group: { select: { id: true, name: true } },
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
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async findGroupByGroupId(groupId: string) {
    return this.prisma.group.findUnique({
      where: { id: groupId },
      include: {
        memberships: {
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });
  }

  async findRoundByRoundId(roundId: string) {
    return this.prisma.round.findUnique({
      where: { id: roundId },
    });
  }

  async findCurrentRoundByGroupId(groupId: string) {
    return this.prisma.round.findFirst({
      where: {
        groupId,
        status: RoundStatus.PENDING,
      },
      orderBy: [{ cycleNumber: 'asc' }, { roundNumber: 'asc' }],
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
          include: { user: { select: { id: true, name: true } } },
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
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.round.findUnique({
      where: {
        groupId_cycleNumber_roundNumber: {
          groupId,
          cycleNumber,
          roundNumber,
        },
      },
    });
  }

  async createRound(
    data: {
      groupId: string;
      cycleNumber: number;
      roundNumber: number;
      recipientId: string;
      targetDate: Date;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.round.create({
      data,
    });
  }

  async findOrCreateRound(
    data: {
      groupId: string;
      cycleNumber: number;
      roundNumber: number;
      recipientId: string;
      targetDate: Date;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const existing = await this.findRoundByGroupCycleAndNumber(
      data.groupId,
      data.cycleNumber,
      data.roundNumber,
      tx,
    );
    if (existing) return existing;

    try {
      return await this.createRound(data, tx);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const raced = await this.findRoundByGroupCycleAndNumber(
          data.groupId,
          data.cycleNumber,
          data.roundNumber,
          tx,
        );
        if (!raced) throw error;
        return raced;
      }
      throw error;
    }
  }

  async findPaymentByGroupRoundAndUser(
    groupId: string,
    roundId: string,
    userId: string,
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.payment.findFirst({
      where: {
        groupId,
        roundId,
        userId,
      },
    });
  }

  async findPriorVerifiedPayment(
    groupId: string,
    userId: string,
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.payment.findFirst({
      where: {
        groupId,
        userId,
        status: PaymentStatus.VERIFIED,
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
      organizerFeeAmount?: number;
      totalAmount?: number;
      paymentMethod?: PaymentMethodType;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.payment.update({
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

  async countUnpaidRoundsBeforeCycle(groupId: string, cycleNumber: number) {
    return this.prisma.round.count({
      where: {
        groupId,
        cycleNumber: { lt: cycleNumber },
        status: RoundStatus.PENDING,
      },
    });
  }

  async findNextUnpaidRoundAfter(
    groupId: string,
    cycleNumber: number,
    roundNumber: number,
  ) {
    return this.prisma.round.findFirst({
      where: {
        groupId,
        status: RoundStatus.PENDING,
        OR: [
          { cycleNumber: { gt: cycleNumber } },
          { cycleNumber, roundNumber: { gt: roundNumber } },
        ],
      },
      orderBy: [{ cycleNumber: 'asc' }, { roundNumber: 'asc' }],
    });
  }

  async updateRoundStatus(
    roundId: string,
    status: RoundStatus,
    tx?: Prisma.TransactionClient,
  ) {
    const db = tx ?? this.prisma;
    return db.round.update({
      where: { id: roundId },
      data: { status },
    });
  }

  async transitionRoundStatus(
    roundId: string,
    currentStatus: RoundStatus,
    nextStatus: RoundStatus,
    data: {
      disbursedAt?: Date;
      receivedAt?: Date;
      disbursementReferenceNumber?: string | null;
      disbursementProofUrl?: string | null;
      receiptNotes?: string | null;
    },
    tx: Prisma.TransactionClient,
  ) {
    const result = await tx.round.updateMany({
      where: { id: roundId, status: currentStatus },
      data: { status: nextStatus, ...data },
    });

    if (result.count !== 1) return null;
    return tx.round.findUnique({ where: { id: roundId } });
  }
}
