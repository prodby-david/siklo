import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { GroupsMembersService } from './groups-members.service';
import { GroupsCoreService } from './groups-core.service';
import { GroupsRepository } from '../groups.repository';
import { PrismaService } from '@/database/prisma.service';
import { ActivityService } from '../../activity/activity.service';

describe('GroupsMembersService', () => {
  let service: GroupsMembersService;
  let groupsRepository: {
    findGroupByInviteCode: jest.Mock;
    findMembershipsByGroupId: jest.Mock;
    findMembership: jest.Mock;
    countUserMemberships: jest.Mock;
    createMembership: jest.Mock;
  };
  let groupsCoreService: { getExistingGroup: jest.Mock };
  let activityService: { createActivity: jest.Mock };
  let prisma: {
    $transaction: jest.Mock;
    membership: { findUnique: jest.Mock; update: jest.Mock };
  };

  beforeEach(async () => {
    groupsRepository = {
      findGroupByInviteCode: jest.fn(),
      findMembershipsByGroupId: jest.fn(),
      findMembership: jest.fn(),
      countUserMemberships: jest.fn().mockResolvedValue(0),
      createMembership: jest.fn(),
    };

    groupsCoreService = {
      getExistingGroup: jest.fn(),
    };

    activityService = {
      createActivity: jest.fn().mockResolvedValue({}),
    };

    prisma = {
      $transaction: jest.fn(),
      membership: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsMembersService,
        { provide: GroupsCoreService, useValue: groupsCoreService },
        { provide: GroupsRepository, useValue: groupsRepository },
        { provide: ActivityService, useValue: activityService },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GroupsMembersService>(GroupsMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    it('should throw NotFoundException if invite code is invalid', async () => {
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
  });

  describe('removeMember', () => {
    it('should remove a member successfully', async () => {
      const groupId = 'group-1';
      const memberUserId = 'member-2';
      const organizerUserId = 'organizer-1';

      groupsCoreService.getExistingGroup.mockResolvedValue({
        id: groupId,
        organizerId: organizerUserId,
        startDate: null,
        memberships: [
          { userId: organizerUserId, user: { name: 'Organizer' } },
          { userId: memberUserId, user: { name: 'Member' } },
        ],
      });

      prisma.$transaction.mockImplementation(async (cb) => {
        return cb({
          membership: {
            delete: jest.fn().mockResolvedValue({}),
          },
        });
      });

      const result = await service.removeMember(
        groupId,
        memberUserId,
        organizerUserId,
      );

      expect(result.message).toBe('Member removed successfully');
    });

    it('should throw ForbiddenException if not organizer', async () => {
      const groupId = 'group-1';
      const memberUserId = 'member-2';

      groupsCoreService.getExistingGroup.mockResolvedValue({
        id: groupId,
        organizerId: 'organizer-1',
        startDate: null,
      });

      await expect(
        service.removeMember(groupId, memberUserId, 'not-organizer'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
