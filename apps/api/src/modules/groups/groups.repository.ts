import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/extension';
import { PrismaService } from '@/database/prisma.service';
import type { CreateGroupDTO } from './schema/create-group.schema';
import type { JoinGroupDTO } from './schema/join-group.schema';

@Injectable()
export class GroupsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findGroupByName(tx: Prisma.TransactionClient, name: string) {
    return tx.group.findFirst({
      where: { name },
    });
  }

  async createGroup(tx: Prisma.TransactionClient, dto: CreateGroupDTO) {
    return tx.group.create({
      data: dto,
    });
  }

  async getAllGroups() {
    return this.prisma.group.findMany({
      include: {
        _count: {
          select: { memberships: true },
        },
      },
    });
  }

  async getUserGroup(userId: string) {
    return this.prisma.group.findMany({
      where: {
        memberships: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: { memberships: true },
        },
      },
    });
  }

  async getGroupById(groupId: string, userId: string) {
    return this.prisma.group.findFirst({
      where: {
        id: groupId,
        memberships: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: { memberships: true },
        },
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findGroupByInviteCode(
    tx: Prisma.TransactionClient,
    inviteCode: string,
  ) {
    return tx.group.findUnique({
      where: { inviteCode },
    });
  }

  async updateGroupStartDate(groupId: string, startDate: Date) {
    return this.prisma.group.update({
      where: { id: groupId },
      data: { startDate },
    });
  }

  async createMembership(
    tx: Prisma.TransactionClient,
    dto: JoinGroupDTO,
    position: number,
  ) {
    return tx.membership.create({
      data: {
        userId: dto.userId,
        groupId: dto.groupId,
        position,
      },
    });
  }

  async findMembership(tx: Prisma.TransactionClient, dto: JoinGroupDTO) {
    return tx.membership.findUnique({
      where: {
        userId_groupId: {
          userId: dto.userId,
          groupId: dto.groupId,
        },
      },
    });
  }

  async countMembers(tx: Prisma.TransactionClient, groupId: string) {
    return tx.membership.count({
      where: {
        groupId,
      },
    });
  }
}
