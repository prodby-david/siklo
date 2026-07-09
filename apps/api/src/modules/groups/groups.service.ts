import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client/extension';
import { PrismaService } from '@/database/prisma.service';
import generateInviteCode from '@/commons/utils/generateInviteCode';
import { GroupsRepository } from './groups.repository';
import { CreateGroupData } from './schema/create-group.schema';
import { JoinGroupBodyDTO, JoinGroupDTO } from '@siklo/shared-schemas';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupsRepository: GroupsRepository,
  ) {}

  private async getExistingGroup(groupId: string, userId: string) {
    const group = await this.groupsRepository.getGroupById(groupId, userId);

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  private async ensureNotMemeber(
    tx: Prisma.TransactionClient,
    dto: JoinGroupDTO,
  ) {
    const existingMembership = await this.groupsRepository.findMembership(
      tx,
      dto,
    );

    if (existingMembership) {
      throw new ConflictException('You are already a member of this group');
    }
  }

  async createGroup(dto: CreateGroupData, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const existingGroup = await this.groupsRepository.findGroupByName(
        tx,
        dto.name,
      );

      if (existingGroup) {
        throw new ConflictException('Group name already exist');
      }
      const inviteCode = generateInviteCode();
      const group = await this.groupsRepository.createGroup(tx, {
        ...dto,
        inviteCode,
        organizerId: userId,
      });

      const count = await this.groupsRepository.countMembers(tx, group.id);
      const position = count + 1;
      await this.groupsRepository.createMembership(
        tx,
        {
          groupId: group.id,
          userId,
        },
        position,
      );

      return {
        message: 'Group created successfully',
        group,
      };
    });
  }

  async joinGroup(dto: JoinGroupBodyDTO, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const group = await this.groupsRepository.findGroupByInviteCode(
        tx,
        dto.inviteCode,
      );
      if (!group) {
        throw new NotFoundException(
          "Group doesn't exist. Please check the invite code and try again.",
        );
      }

      if (group.startDate) {
        throw new ConflictException(
          'Cannot join a group whose cycle has already started',
        );
      }

      const count = await this.groupsRepository.countMembers(tx, group.id);

      if (count >= group.maxMembers) {
        throw new ConflictException('Group is already full');
      }
      const nextPosition = count + 1;

      await this.ensureNotMemeber(tx, {
        groupId: group.id,
        userId,
      });
      await this.groupsRepository.createMembership(
        tx,
        {
          groupId: group.id,
          userId,
        },
        nextPosition,
      );
      return {
        message: 'Group joined successfully',
      };
    });
  }

  async getAllGroups() {
    return this.groupsRepository.getAllGroups();
  }

  async getUsersGroup(userId: string) {
    return this.groupsRepository.getUserGroup(userId);
  }

  async getGroupById(groupId: string, userId: string) {
    return this.getExistingGroup(groupId, userId);
  }

  async startGroupCycle(groupId: string, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    if (group.organizerId !== userId) {
      throw new ForbiddenException('Only the organizer can start the cycle');
    }
    if (group.startDate) {
      throw new ConflictException('Group cycle has already started');
    }

    if (group._count.memberships < 3) {
      throw new ConflictException(
        'At least 3 members are required to start a cycle',
      );
    }

    return this.groupsRepository.updateGroupStartDate(groupId, new Date());
  }
}
