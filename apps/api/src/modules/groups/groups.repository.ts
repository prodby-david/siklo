import { PrismaService } from '@/database/prisma.service';
import type { CreateGroupDTO } from './schema/create-group.schema';
import type { JoinGroupDTO } from './schema/join-group.schema';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/extension';

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkGroupExist(name: string, startDate: Date) {
    return this.prisma.group.findFirst({
      where: {
        name,
        startDate,
      },
    });
  }

  async createGroup(tx: Prisma.TransactionClient, dto: CreateGroupDTO) {
    return tx.group.create({
      data: dto,
    });
  }

  async createMembership(tx: Prisma.TransactionClient, dto: JoinGroupDTO) {
    const count = await tx.membership.count({
      where: {
        groupId: dto.groupId,
      },
    });

    const nextPosition = count + 1;

    return tx.membership.create({
      data: {
        userId: dto.userId,
        groupId: dto.groupId,
        position: nextPosition,
      },
    });
  }

  async validateMembership(tx: Prisma.TransactionClient, dto: JoinGroupDTO) {
    return tx.membership.findUnique({
      where: {
        userId_groupId: {
          userId: dto.userId,
          groupId: dto.groupId,
        },
      },
    });
  }

  async getUserGroup(userId: string) {
    return this.prisma.group.findMany({
      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },
      include: {
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });
  }

  async getAllGroups() {
    return this.prisma.group.findMany({
      include: {
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });
  }

  async isUserAMember(userId: string, groupId: string) {
    return this.prisma.membership.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  }

  async getPaidRoundsCount(groupId: string) {
    return this.prisma.round.count({
      where: {
        groupId,
        status: 'PAID',
      },
    });
  }
}
