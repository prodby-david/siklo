import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
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
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
      };
      const userId = 'user-1';

      groupsRepository.findGroupByName.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcashNumber: '09123456789' },
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

    it('should throw ForbiddenException when payment accounts have no usable number', async () => {
      const dto = {
        name: 'No Setup Group',
        description: 'Test',
        contributionAmount: 1000,
        billingCycle: 'WEEKLY' as const,
        payoutSequence: 'RANDOM' as const,
        cycleDuration: 4,
        maxMembers: 5,
        allowedPaymentMethods: ['E_WALLET' as const],
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
      };
      const userId = 'user-1';

      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcashName: 'Juan' },
            }),
          },
        });
      });

      await expect(service.createGroup(dto, userId)).rejects.toThrow(
        ForbiddenException,
      );
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
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
      };
      const userId = 'user-1';

      prisma.$transaction.mockImplementation(async (cb) => {
        groupsRepository.findGroupByName.mockResolvedValue({ id: 'existing' });
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcashNumber: '09123456789' },
            }),
          },
        });
      });

      await expect(service.createGroup(dto, userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should force organizerFeeAmount to 0 when isOrganizerParticipating is true', async () => {
      const dto = {
        name: 'Participating Group',
        description: 'Test',
        contributionAmount: 1000,
        billingCycle: 'WEEKLY' as const,
        payoutSequence: 'RANDOM' as const,
        cycleDuration: 4,
        maxMembers: 5,
        allowedPaymentMethods: ['E_WALLET' as const],
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
        isOrganizerParticipating: true,
        organizerFeeAmount: 100,
      };
      const userId = 'user-1';
      const mockCreate = jest.fn().mockImplementation(({ data }) => ({
        id: 'group-1',
        ...data,
      }));

      groupsRepository.findGroupByName.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcashNumber: '09123456789' },
            }),
          },
          group: {
            create: mockCreate,
          },
        });
      });

      const result = await service.createGroup(dto, userId);

      expect(result.message).toBe('Group created successfully');
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            isOrganizerParticipating: true,
            organizerFeeAmount: 0,
          }),
        }),
      );
      expect(groupsRepository.createMembership).toHaveBeenCalledWith(
        expect.anything(),
        { groupId: 'group-1', userId },
        1,
      );
    });

    it('should throw BadRequestException when isOrganizerParticipating is false and fee is 0', async () => {
      const dto = {
        name: 'Manager Group No Fee',
        description: 'Test',
        contributionAmount: 1000,
        billingCycle: 'WEEKLY' as const,
        payoutSequence: 'RANDOM' as const,
        cycleDuration: 4,
        maxMembers: 5,
        allowedPaymentMethods: ['E_WALLET' as const],
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
        isOrganizerParticipating: false,
        organizerFeeAmount: 0,
      };
      const userId = 'user-1';

      groupsRepository.findGroupByName.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcashNumber: '09123456789' },
            }),
          },
        });
      });

      await expect(service.createGroup(dto, userId)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should allow manager-only group when fee is greater than 0 without slot #1 membership', async () => {
      const dto = {
        name: 'Manager Group With Fee',
        description: 'Test',
        contributionAmount: 1000,
        billingCycle: 'WEEKLY' as const,
        payoutSequence: 'RANDOM' as const,
        cycleDuration: 4,
        maxMembers: 5,
        allowedPaymentMethods: ['E_WALLET' as const],
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
        isOrganizerParticipating: false,
        organizerFeeAmount: 150,
      };
      const userId = 'user-1';
      const mockCreate = jest.fn().mockImplementation(({ data }) => ({
        id: 'group-2',
        ...data,
      }));

      groupsRepository.createMembership.mockClear();
      groupsRepository.findGroupByName.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          user: {
            findUnique: jest.fn().mockResolvedValue({
              id: userId,
              paymentAccounts: { gcashNumber: '09123456789' },
            }),
          },
          group: {
            create: mockCreate,
          },
        });
      });

      const result = await service.createGroup(dto, userId);

      expect(result.message).toBe('Group created successfully');
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            isOrganizerParticipating: false,
            organizerFeeAmount: 150,
          }),
        }),
      );
      expect(groupsRepository.createMembership).not.toHaveBeenCalled();
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

  describe('getUsersGroup', () => {
    const mockGroups = [
      {
        id: 'group-pending',
        name: 'Pending Group',
        startDate: null,
        cycleDuration: 1,
        maxMembers: 3,
        rounds: [],
        payments: [],
        memberships: [{ userId: 'user-1' }],
      },
      {
        id: 'group-active',
        name: 'Active Group',
        startDate: new Date(),
        cycleDuration: 1,
        maxMembers: 3,
        rounds: [
          { id: 'r1', cycleNumber: 1, roundNumber: 1, status: 'PENDING' },
        ],
        payments: [],
        memberships: [{ userId: 'user-1' }],
      },
      {
        id: 'group-completed',
        name: 'Completed Group',
        startDate: new Date(),
        cycleDuration: 1,
        maxMembers: 1,
        rounds: [
          { id: 'r1', cycleNumber: 1, roundNumber: 1, status: 'RECEIVED' },
        ],
        payments: [{ status: 'VERIFIED' }],
        memberships: [{ userId: 'user-1' }],
      },
    ];

    it('should return all groups when no status filter is provided', async () => {
      groupsRepository.getUserGroup.mockResolvedValue(mockGroups);
      const result = await service.getUsersGroup('user-1');
      expect(result).toHaveLength(3);
    });

    it('should filter active groups correctly', async () => {
      groupsRepository.getUserGroup.mockResolvedValue(mockGroups);
      const result = await service.getUsersGroup('user-1', 'ACTIVE');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('group-active');
      expect(result[0].status).toBe('ACTIVE');
    });

    it('should filter pending groups correctly', async () => {
      groupsRepository.getUserGroup.mockResolvedValue(mockGroups);
      const result = await service.getUsersGroup('user-1', 'PENDING');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('group-pending');
      expect(result[0].status).toBe('PENDING');
    });

    it('should filter completed groups correctly', async () => {
      groupsRepository.getUserGroup.mockResolvedValue(mockGroups);
      const result = await service.getUsersGroup('user-1', 'COMPLETED');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('group-completed');
      expect(result[0].status).toBe('COMPLETED');
    });
  });
});
