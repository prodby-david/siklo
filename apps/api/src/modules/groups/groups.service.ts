import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateGroupDTO } from './schema/create-group.schema';
import { JoinGroupDTO } from './schema/join-group.schema';
import { GroupRepository } from './groups.repository';
import { Prisma } from '@prisma/client/extension';

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

  async createGroup(dto: CreateGroupDTO) {
    return this.prisma.$transaction(async (tx) => {
      const group = await this.groupRepository.createGroup(tx, dto);
      await this.groupRepository.createMembership(tx, {
        userId: dto.userId,
        groupId: group.id,
      });
      return {
        message: 'Group created successfully',
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
