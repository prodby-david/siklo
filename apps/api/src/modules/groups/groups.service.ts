import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateGroupData } from './schema/create-group.schema';
import { JoinGroupDTO } from './schema/join-group.schema';
import { GroupRepository } from './groups.repository';
import { Prisma } from '@prisma/client/extension';
import generateInviteCode from '@/commons/utils/generateInviteCode';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupRepository: GroupRepository,
  ) {}

  private async validateMembership(
    tx: Prisma.TransactionClient,
    dto: JoinGroupDTO,
  ) {
    const existingMembership = await this.groupRepository.validateMembership(
      tx,
      dto,
    );

    if (existingMembership) {
      throw new ConflictException('You are already a member of this group');
    }
  }

  async createGroup(dto: CreateGroupData, userId: string) {
    const checkGroup = await this.groupRepository.checkGroupExist(
      dto.name,
      dto.startDate,
    );

    if (checkGroup) {
      throw new ConflictException('Group name already exist');
    }

    return await this.prisma.$transaction(async (tx) => {
      const inviteCode = generateInviteCode();
      const group = await this.groupRepository.createGroup(tx, {
        ...dto,
        inviteCode,
        organizerId: userId,
      });
      await this.groupRepository.createMembership(tx, {
        groupId: group.id,
        userId,
      });

      return {
        message: 'Group created successfully',
        group,
      };
    });
  }

  async joinGroup(dto: JoinGroupDTO) {
    return this.prisma.$transaction(async (tx) => {
      await this.validateMembership(tx, dto);
      await this.groupRepository.createMembership(tx, dto);
      return {
        message: 'Group joined successfully',
      };
    });
  }

  async getUserGroup(userId: string) {
    return this.groupRepository.getUserGroup(userId);
  }

  async getAllGroups() {
    return this.groupRepository.getAllGroups();
  }
}
