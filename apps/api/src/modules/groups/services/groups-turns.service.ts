import {
  Injectable,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { GroupsRepository } from '../groups.repository';
import { ActivityService } from '../../activity/activity.service';
import { GroupsCoreService } from './groups-core.service';

@Injectable()
export class GroupsTurnsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupsRepository: GroupsRepository,
    private readonly activityService: ActivityService,
    private readonly groupsCoreService: GroupsCoreService,
  ) {}

  async selectSlot(groupId: string, position: number, userId: string) {
    const group = await this.groupsCoreService.getExistingGroup(
      groupId,
      userId,
    );
    if (group.startDate) {
      throw new ConflictException(
        'Cannot select slot after group cycle has started',
      );
    }
    if (group.payoutSequence !== 'FREECHOOSING') {
      throw new ConflictException(
        'Slot selection is only available for Free Choice groups',
      );
    }
    if (position < 1 || position > group.maxMembers) {
      throw new ConflictException(
        `Invalid position. Must be between 1 and ${group.maxMembers}`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const occupied = await this.groupsRepository.findMembershipByPosition(
        tx,
        groupId,
        position,
      );
      if (occupied && occupied.userId !== userId) {
        throw new ConflictException(
          'This slot has already been claimed by another member',
        );
      }

      await tx.membership.update({
        where: {
          userId_groupId: {
            userId,
            groupId,
          },
        },
        data: { position },
      });

      await this.activityService.createActivity(
        {
          userId,
          groupId,
          activityType: 'ROTATED',
          description: `Selected Slot #${position}`,
        },
        tx,
      );

      return {
        message: 'Slot selected successfully',
        position,
      };
    });
  }

  async sendAnnouncement(
    groupId: string,
    message: string,
    organizerUserId: string,
  ) {
    const group = await this.groupsCoreService.getExistingGroup(
      groupId,
      organizerUserId,
    );
    if (group.organizerId !== organizerUserId) {
      throw new ForbiddenException('Only the organizer can post announcements');
    }

    const activity = await this.activityService.createActivity({
      userId: organizerUserId,
      groupId,
      activityType: 'ANNOUNCEMENT',
      description: message,
    });

    return {
      message: 'Announcement posted successfully',
      activity,
    };
  }
}
