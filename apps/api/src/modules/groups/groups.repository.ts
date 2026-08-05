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

  async getUserGroup(userId: string) {
    return this.prisma.group.findMany({
      where: {
        OR: [
          { organizerId: userId },
          {
            memberships: {
              some: { userId },
            },
          },
        ],
      },
      include: {
        _count: {
          select: { memberships: true },
        },
        memberships: {
          select: {
            id: true,
            userId: true,
            position: true,
            user: { select: { id: true, name: true } },
          },
        },
        activities: {
          where: { activity: 'PAYMENT_VERIFIED' },
        },
      },
    });
  }

  async getGroupById(groupId: string, userId: string) {
    return this.prisma.group.findFirst({
      where: {
        id: groupId,
        OR: [
          { organizerId: userId },
          {
            memberships: {
              some: { userId },
            },
          },
        ],
      },
      include: {
        _count: {
          select: { memberships: true },
        },
        organizer: {
          select: {
            id: true,
            name: true,
            contactNumber: true,
          },
        },
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                contactNumber: true,
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

  async findMembershipsByGroupId(
    tx: Prisma.TransactionClient,
    groupId: string,
  ) {
    return tx.membership.findMany({
      where: { groupId },
      select: { position: true },
    });
  }

  async countUserMemberships(tx: Prisma.TransactionClient, userId: string) {
    return tx.membership.count({
      where: { userId },
    });
  }

  async findMembershipByPosition(
    tx: Prisma.TransactionClient,
    groupId: string,
    position: number,
  ) {
    return tx.membership.findFirst({
      where: {
        groupId,
        position,
      },
    });
  }

  async getGroupPreviewByInviteCode(inviteCode: string) {
    return this.prisma.group.findUnique({
      where: { inviteCode },
      select: {
        id: true,
        name: true,
        maxMembers: true,
        payoutSequence: true,
        startDate: true,
        memberships: {
          select: {
            position: true,
          },
        },
      },
    });
  }

  async updateGroupDescription(groupId: string, description?: string) {
    return this.prisma.group.update({
      where: { id: groupId },
      data: { description },
    });
  }
}
