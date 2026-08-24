import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { PrismaService } from '@/database/prisma.service';
import { ActivityService } from '../activity/activity.service';
import { NotificationsService } from '../notifications/notifications.service';
import { GroupsCoreService } from './services/groups-core.service';
import { GroupsMembersService } from './services/groups-members.service';
import { GroupsTurnsService } from './services/groups-turns.service';

jest.mock('@/commons/utils/generateInviteCode', () => ({
  __esModule: true,
  default: jest.fn(() => 'ABC123'),
}));

describe('GroupsService', () => {
  let service: GroupsService;
  let groupsRepository: {
    findGroupByName: jest.Mock;
    createGroup: jest.Mock;
    getUserGroup: jest.Mock;
    getGroupById: jest.Mock;
    findGroupByInviteCode: jest.Mock;
    updateGroupStartDate: jest.Mock;
    createMembership: jest.Mock;
    findMembership: jest.Mock;
    countMembers: jest.Mock;
    countUserMemberships: jest.Mock;
    findMembershipByPosition: jest.Mock;
    findMembershipsByGroupId: jest.Mock;
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
      updateGroupStartDate: jest.fn(),
      createMembership: jest.fn(),
      findMembership: jest.fn(),
      countMembers: jest.fn(),
      countUserMemberships: jest.fn().mockResolvedValue(0),
      findMembershipByPosition: jest.fn(),
      findMembershipsByGroupId: jest.fn().mockResolvedValue([]),
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
        GroupsService,
        GroupsCoreService,
        GroupsMembersService,
        GroupsTurnsService,
        { provide: GroupsRepository, useValue: groupsRepository },
        { provide: ActivityService, useValue: activityService },
        { provide: NotificationsService, useValue: notificationService },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGroup', () => {
    it('should create a group successfully', async () => {
      const dto = {
        name: 'Test Group',
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

    it('should throw ConflictException if group name already exists', async () => {
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

  describe('joinGroup', () => {
    it('should join group successfully', async () => {
      const dto = { inviteCode: 'ABC123' };
      const userId = 'user-2';
      const mockGroup = {
        id: 'group-1',
        maxMembers: 5,
        payoutSequence: 'RANDOM',
        startDate: null,
      };

      prisma.$transaction.mockImplementation(async (cb) => {
        groupsRepository.findGroupByInviteCode.mockResolvedValue(mockGroup);
        groupsRepository.findMembershipsByGroupId.mockResolvedValue([
          { position: 1 },
        ]);
        groupsRepository.findMembership.mockResolvedValue(null);
        groupsRepository.createMembership.mockResolvedValue({});
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcash: '09123456789' },
            }),
          },
          group: {
            findUnique: jest.fn().mockResolvedValue(mockGroup),
          },
        });
      });

      const result = await service.joinGroup(dto, userId);

      expect(result.message).toBe('Group joined successfully');
      expect(result.groupId).toBe('group-1');
    });

    it('should throw NotFoundException if group does not exist', async () => {
      const dto = { inviteCode: 'INVALID' };
      const userId = 'user-2';

      prisma.$transaction.mockImplementation(async (cb) => {
        groupsRepository.findGroupByInviteCode.mockResolvedValue(null);
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcash: '09123456789' },
            }),
          },
        });
      });

      await expect(service.joinGroup(dto, userId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if group is full', async () => {
      const dto = { inviteCode: 'ABC123' };
      const userId = 'user-6';
      const mockGroup = {
        id: 'group-1',
        maxMembers: 2,
        payoutSequence: 'RANDOM',
        startDate: null,
      };

      prisma.$transaction.mockImplementation(async (cb) => {
        groupsRepository.findGroupByInviteCode.mockResolvedValue(mockGroup);
        groupsRepository.findMembershipsByGroupId.mockResolvedValue([
          { position: 1 },
          { position: 2 },
        ]);
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcash: '09123456789' },
            }),
          },
        });
      });

      await expect(service.joinGroup(dto, userId)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('startGroupCycle', () => {
    it('should start the group cycle successfully', async () => {
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

    it('should throw ForbiddenException if user is not organizer', async () => {
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
