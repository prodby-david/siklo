import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { InviteStatus } from '@siklo/shared-schemas';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class InvitesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvite(
    organizerId: string,
    data: { groupId: string; inviteeId: string },
  ) {
    return this.prisma.invite.create({
      data: {
        organizerId,
        groupId: data.groupId,
        inviteeId: data.inviteeId,
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
            contributionAmount: true,
            billingCycle: true,
          },
        },
        organizer: {
          select: {
            id: true,
            name: true,
          },
        },
        invitee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findInviteById(id: string) {
    return this.prisma.invite.findUnique({
      where: {
        id,
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
            contributionAmount: true,
            billingCycle: true,
          },
        },
        organizer: {
          select: {
            id: true,
            name: true,
          },
        },
        invitee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findUserPendingInvites(inviteeId: string, status?: InviteStatus) {
    return this.prisma.invite.findMany({
      where: {
        inviteeId,
        status,
      },
      select: {
        id: true,
        groupId: true,
        status: true,
        createdAt: true,
        group: {
          select: {
            id: true,
            name: true,
            contributionAmount: true,
            billingCycle: true,
          },
        },
        organizer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findInviteByGroupAndInvitee(groupId: string, inviteeId: string) {
    return this.prisma.invite.findUnique({
      where: {
        groupId_inviteeId: {
          groupId,
          inviteeId,
        },
      },
      select: {
        id: true,
        status: true,
      },
    });
  }

  async updateInviteStatus(
    id: string,
    status: InviteStatus,
    tx?: Prisma.TransactionClient,
  ) {
    const prisma = tx ?? this.prisma;
    return prisma.invite.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
