import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { GroupsCoreService } from './groups-core.service';
import { GroupsRepository } from '../groups.repository';
import { PrismaService } from '@/database/prisma.service';
import { ActivityService } from '../../activity/activity.service';
import { NotificationsService } from '../../notifications/notifications.service';

jest.mock('@/commons/utils/generateInviteCode', () => ({
  __esModule: true,
  default: jest.fn(() => 'ABC123'),
}));

describe('GroupsCoreService', () => {
  let service: GroupsCoreService;
  let groupsRepository: {
    findGroupByName: jest.Mock;
    createGroup: jest.Mock;
    getUserGroup: jest.Mock;
    getGroupById: jest.Mock;
    findGroupByInviteCode: jest.Mock;
    getGroupPreviewByInviteCode: jest.Mock;
    createMembership: jest.Mock;
    countUserMemberships: jest.Mock;
    updateGroup: jest.Mock;
  };
  let activityService: { createActivity: jest.Mock };
  let notificationService: { createNotification: jest.Mock };
  let prisma: { $transaction: jest.Mock };

  beforeEach(async () => {
    groupsRepository = {
      findGroupByName: jest.fn(),
      createGroup: jest.fn(),
      getUserGroup: jest.fn(),
      getGroupById: jest.fn(),
      findGroupByInviteCode: jest.fn(),
      getGroupPreviewByInviteCode: jest.fn(),
      createMembership: jest.fn(),
      countUserMemberships: jest.fn().mockResolvedValue(0),
      updateGroup: jest.fn(),
    };

    activityService = {
      createActivity: jest.fn().mockResolvedValue({}),
    };

    notificationService = {
      createNotification: jest.fn().mockResolvedValue({}),
    };

    prisma = {
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsCoreService,
        { provide: GroupsRepository, useValue: groupsRepository },
        { provide: ActivityService, useValue: activityService },
        { provide: NotificationsService, useValue: notificationService },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GroupsCoreService>(GroupsCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGroup', () => {
    it('should create a group successfully', async () => {
      const dto = {
        name: 'Core Test Group',
        description: 'Test Description',
        contributionAmount: 1000,
        billingCycle: 'WEEKLY' as const,
        payoutSequence: 'RANDOM' as const,
        cycleDuration: 4,
        maxMembers: 5,
        allowedPaymentMethods: ['E_WALLET' as const],
      };
      const userId = 'user-1';

      groupsRepository.findGroupByName.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcash: '09123456789' },
            }),
          },
          group: {
            create: jest.fn().mockResolvedValue({ id: 'group-1', ...dto }),
          },
        });
      });

      const result = await service.createGroup(dto, userId);

      expect(result.message).toBe('Group created successfully');
      expect(result.group.id).toBe('group-1');
    });

    it('should throw ConflictException if group name exists', async () => {
      const dto = {
        name: 'Existing Group',
        description: 'Test',
        contributionAmount: 1000,
        billingCycle: 'WEEKLY' as const,
        payoutSequence: 'RANDOM' as const,
        cycleDuration: 4,
        maxMembers: 5,
        allowedPaymentMethods: ['E_WALLET' as const],
      };
      const userId = 'user-1';

      prisma.$transaction.mockImplementation(async (cb) => {
        groupsRepository.findGroupByName.mockResolvedValue({ id: 'existing' });
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcash: '09123456789' },
            }),
          },
        });
      });


      await expect(service.createGroup(dto, userId)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('startGroupCycle', () => {
    it('should start cycle successfully', async () => {
      const groupId = 'group-1';
      const userId = 'organizer-1';
      const mockGroup = {
        id: groupId,
        organizerId: userId,
        startDate: null,
        payoutSequence: 'RANDOM',
        name: 'Test Group',
        _count: { memberships: 3 },
      };

      groupsRepository.getGroupById.mockResolvedValue(mockGroup);
      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          membership: {
            findMany: jest.fn().mockResolvedValue([
              { id: 'm1', userId: 'u1' },
              { id: 'm2', userId: 'u2' },
              { id: 'm3', userId: 'u3' },
            ]),
            update: jest.fn().mockResolvedValue({}),
          },
          group: {
            update: jest.fn().mockResolvedValue({
              ...mockGroup,
              startDate: new Date(),
            }),
          },
        });
      });

      const result = await service.startGroupCycle(groupId, userId);

      expect(result.startDate).toBeDefined();
    });

    it('should throw ForbiddenException if not organizer', async () => {
      const groupId = 'group-1';
      const userId = 'member-1';
      const mockGroup = {
        id: groupId,
        organizerId: 'organizer-1',
        startDate: null,
        _count: { memberships: 3 },
      };

      groupsRepository.getGroupById.mockResolvedValue(mockGroup);

      await expect(service.startGroupCycle(groupId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
