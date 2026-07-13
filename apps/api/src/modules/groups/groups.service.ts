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

      const MAX_GROUPS_PER_USER = 3;
      const membershipCount =
        await this.groupsRepository.countUserMemberships(tx, userId);
      if (membershipCount >= MAX_GROUPS_PER_USER) {
        throw new ConflictException(
          `You can only be part of up to ${MAX_GROUPS_PER_USER} groups`,
        );
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

      let position: number;
      if (group.payoutSequence === 'FREECHOOSING') {
        if (dto.position === undefined || dto.position === null) {
          throw new ConflictException(
            'Choosing a slot position is required for this group',
          );
        }
        if (dto.position < 1 || dto.position > group.maxMembers) {
          throw new ConflictException(
            `Invalid position. Must be between 1 and ${group.maxMembers}`,
          );
        }
        const occupied = await this.groupsRepository.findMembershipByPosition(
          tx,
          group.id,
          dto.position,
        );
        if (occupied) {
          throw new ConflictException(
            'This slot has already been chosen by another member',
          );
        }
        position = dto.position;
      } else {
        position = nextPosition;
      }

      await this.ensureNotMemeber(tx, {
        groupId: group.id,
        userId,
      });

      const MAX_GROUPS_PER_USER = 3;
      const membershipCount =
        await this.groupsRepository.countUserMemberships(tx, userId);
      if (membershipCount >= MAX_GROUPS_PER_USER) {
        throw new ConflictException(
          `You can only be part of up to ${MAX_GROUPS_PER_USER} groups`,
        );
      }
      await this.groupsRepository.createMembership(
        tx,
        {
          groupId: group.id,
          userId,
        },
        position,
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

    return this.prisma.$transaction(async (tx) => {
      if (group.payoutSequence === 'RANDOM') {
        const memberships = await tx.membership.findMany({
          where: { groupId },
        });

        const shuffle = (array: number[]) => {
          let currentIndex = array.length;
          let randomIndex: number;
          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
              array[randomIndex],
              array[currentIndex],
            ];
          }
          return array;
        };

        for (let i = 0; i < memberships.length; i++) {
          await tx.membership.update({
            where: { id: memberships[i].id },
            data: { position: -(i + 1) },
          });
        }

        const positions = Array.from({ length: memberships.length }, (_, i) => i + 1);
        const shuffled = shuffle(positions);

        for (let i = 0; i < memberships.length; i++) {
          await tx.membership.update({
            where: { id: memberships[i].id },
            data: { position: shuffled[i] },
          });
        }
      }

      return tx.group.update({
        where: { id: groupId },
        data: { startDate: new Date() },
      });
    });
  }

  async getGroupByInviteCodePreview(inviteCode: string) {
    const group = await this.groupsRepository.getGroupPreviewByInviteCode(inviteCode);
    if (!group) {
      throw new NotFoundException(
        "Group doesn't exist. Please check the invite code and try again.",
      );
    }
    return group;
  }

  async deleteGroup(groupId: string, userId: string) {
    const group = await this.getExistingGroup(groupId, userId);
    if (group.organizerId !== userId) {
      throw new ForbiddenException('Only the organizer can delete the group');
    }
    if (group.startDate) {
      throw new ConflictException(
        'Cannot delete a group whose cycle has already started',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.membership.deleteMany({
        where: { groupId },
      });
      await tx.group.delete({
        where: { id: groupId },
      });
      return {
        message: 'Group deleted successfully',
      };
    });
  }
}
