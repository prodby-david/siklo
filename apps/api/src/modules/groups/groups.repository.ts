import { PrismaService } from '@/database/prisma.service';
import type { CreateGroupDTO } from './schema/create-group.schema';
import type { JoinGroupDTO } from './schema/join-group.schema';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/extension';

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(tx: Prisma.TransactionClient, dto: CreateGroupDTO) {
    return tx.group.create({
      data: {
        name: dto.name,
        description: dto.description,
        contributionAmount: dto.contributionAmount,
        startDate: dto.startDate,
      },
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
    return this.prisma.membership.findMany({
      where: {
        userId: userId,
      },
      include: {
        group: true,
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
}
