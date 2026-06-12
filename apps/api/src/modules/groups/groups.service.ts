import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateGroupDTO } from './dto/create-group.dto';
import { JoinGroupDTO } from './dto/join-group.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserGroup(createGroupDto: CreateGroupDTO) {
    return this.prisma.$transaction(async (txs) => {
      const group = await txs.group.create({
        data: {
          name: createGroupDto.name,
          description: createGroupDto.description,
          contributionAmount: createGroupDto.contributionAmount,
          startDate: createGroupDto.startDate,
        },
      });

      const membership = await txs.membership.create({
        data: {
          userId: createGroupDto.userId,
          groupId: group.id,
          position: 1,
        },
      });

      return {
        group,
        membership,
      };
    });
  }

  async joinGroup(dto: JoinGroupDTO) {
    return this.prisma.$transaction(async (txs) => {
      const existingMembership = await txs.membership.findUnique({
        where: {
          userId_groupId: {
            userId: dto.userId,
            groupId: dto.groupId,
          },
        },
      });

      if (existingMembership) {
        throw new Error('You are already a member of this group');
      }

      const currentMemberCount = await txs.membership.count({
        where: {
          groupId: dto.groupId,
        },
      });

      const nextPosition = currentMemberCount + 1;

      return await txs.membership.create({
        data: {
          userId: dto.userId,
          groupId: dto.groupId,
          position: nextPosition,
        },
        include: {
          group: true,
        },
      });
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
