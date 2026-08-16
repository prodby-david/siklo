import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { GroupsTurnsService } from './groups-turns.service';
import { GroupsCoreService } from './groups-core.service';
import { GroupsRepository } from '../groups.repository';
import { PrismaService } from '@/database/prisma.service';
import { ActivityService } from '../../activity/activity.service';

describe('GroupsTurnsService', () => {
  let service: GroupsTurnsService;
  let groupsCoreService: { getExistingGroup: jest.Mock };
  let groupsRepository: { findMembershipByPosition: jest.Mock };
  let activityService: { createActivity: jest.Mock };
  let prisma: { $transaction: jest.Mock };

  beforeEach(async () => {
    groupsCoreService = {
      getExistingGroup: jest.fn(),
    };

    groupsRepository = {
      findMembershipByPosition: jest.fn(),
    };

    activityService = {
      createActivity: jest.fn().mockResolvedValue({}),
    };

    prisma = {
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsTurnsService,
        { provide: GroupsCoreService, useValue: groupsCoreService },
        { provide: GroupsRepository, useValue: groupsRepository },
        { provide: ActivityService, useValue: activityService },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GroupsTurnsService>(GroupsTurnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendAnnouncement', () => {
    it('should post announcement successfully', async () => {
      const groupId = 'group-1';
      const organizerUserId = 'organizer-1';
      const message = 'Hello group members!';

      groupsCoreService.getExistingGroup.mockResolvedValue({
        id: groupId,
        organizerId: organizerUserId,
      });

      const result = await service.sendAnnouncement(
        groupId,
        message,
        organizerUserId,
      );

      expect(result.message).toBe('Announcement posted successfully');
    });

    it('should throw ForbiddenException if user is not organizer', async () => {
      const groupId = 'group-1';

      groupsCoreService.getExistingGroup.mockResolvedValue({
        id: groupId,
        organizerId: 'organizer-1',
      });

      await expect(
        service.sendAnnouncement(groupId, 'Hello', 'not-organizer'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
