import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { PrismaService } from '@/database/prisma.service';

jest.mock('@/commons/utils/generateInviteCode', () => ({
  __esModule: true,
  default: jest.fn(() => 'ABC123'),
}));

describe('GroupsService', () => {
  let service: GroupsService;
  let groupsRepository: {
    findGroupByName: jest.Mock;
    createGroup: jest.Mock;
    getAllGroups: jest.Mock;
    getUserGroup: jest.Mock;
    getGroupById: jest.Mock;
    findGroupByInviteCode: jest.Mock;
    updateGroupStartDate: jest.Mock;
    createMembership: jest.Mock;
    findMembership: jest.Mock;
    countMembers: jest.Mock;
  };
  let prisma: { $transaction: jest.Mock };

  beforeEach(async () => {
    groupsRepository = {
      findGroupByName: jest.fn(),
      createGroup: jest.fn(),
      getAllGroups: jest.fn(),
      getUserGroup: jest.fn(),
      getGroupById: jest.fn(),
      findGroupByInviteCode: jest.fn(),
      updateGroupStartDate: jest.fn(),
      createMembership: jest.fn(),
      findMembership: jest.fn(),
      countMembers: jest.fn(),
    };

    prisma = {
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: GroupsRepository, useValue: groupsRepository },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGroup', () => {
    const createGroupDto = {
      name: 'Test Group',
      contributionAmount: 500,
      cycleDuration: 12,
      billingCycle: 'MONTHLY' as const,
      payoutSequence: 'RANDOM' as const,
      startDate: new Date('2026-01-01'),
      maxMembers: 5,
    };
    const userId = 'user-123';

    it('should throw ConflictException if group name already exists', async () => {
      prisma.$transaction.mockImplementation(async (cb: Function) => {
        const tx = {};
        return cb(tx);
      });
      groupsRepository.findGroupByName.mockResolvedValue({
        id: 'existing-group',
      });

      await expect(service.createGroup(createGroupDto, userId)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.createGroup(createGroupDto, userId)).rejects.toThrow(
        'Group name already exist',
      );
    });

    it('should create a group and membership inside a transaction', async () => {
      const mockGroup = { id: 'group-123', ...createGroupDto };
      groupsRepository.findGroupByName.mockResolvedValue(null);

      // Mock $transaction to execute the callback with a mock tx
      prisma.$transaction.mockImplementation(async (cb: Function) => {
        const tx = {};
        return cb(tx);
      });

      groupsRepository.createGroup.mockResolvedValue(mockGroup);
      groupsRepository.countMembers.mockResolvedValue(0);
      groupsRepository.createMembership.mockResolvedValue(undefined);

      const result = await service.createGroup(createGroupDto, userId);

      expect(result).toEqual({
        message: 'Group created successfully',
        group: mockGroup,
      });
      expect(groupsRepository.findGroupByName).toHaveBeenCalledWith(
        expect.anything(),
        createGroupDto.name,
      );
      expect(groupsRepository.createGroup).toHaveBeenCalledWith(
        expect.anything(),
        {
          ...createGroupDto,
          inviteCode: 'ABC123',
          organizerId: userId,
        },
      );
      expect(groupsRepository.createMembership).toHaveBeenCalledWith(
        expect.anything(),
        {
          groupId: mockGroup.id,
          userId,
        },
        1, // position (count + 1)
      );
    });
  });

  describe('joinGroup', () => {
    const joinGroupBodyDto = {
      inviteCode: 'ABC123',
    };
    const userId = 'user-456';

    it('should throw NotFoundException if group invite code is invalid', async () => {
      prisma.$transaction.mockImplementation(async (cb: Function) => {
        const tx = {};
        return cb(tx);
      });
      groupsRepository.findGroupByInviteCode.mockResolvedValue(null);

      await expect(service.joinGroup(joinGroupBodyDto, userId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if group cycle already started', async () => {
      prisma.$transaction.mockImplementation(async (cb: Function) => {
        const tx = {};
        return cb(tx);
      });
      groupsRepository.findGroupByInviteCode.mockResolvedValue({
        id: 'group-123',
        startDate: new Date(),
      });

      await expect(service.joinGroup(joinGroupBodyDto, userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if group is full', async () => {
      prisma.$transaction.mockImplementation(async (cb: Function) => {
        const tx = {};
        return cb(tx);
      });
      groupsRepository.findGroupByInviteCode.mockResolvedValue({
        id: 'group-123',
        maxMembers: 5,
        startDate: null,
      });
      groupsRepository.countMembers.mockResolvedValue(5);

      await expect(service.joinGroup(joinGroupBodyDto, userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if user is already a member', async () => {
      prisma.$transaction.mockImplementation(async (cb: Function) => {
        const tx = {};
        return cb(tx);
      });
      groupsRepository.findGroupByInviteCode.mockResolvedValue({
        id: 'group-123',
        maxMembers: 5,
        startDate: null,
      });
      groupsRepository.countMembers.mockResolvedValue(2);
      groupsRepository.findMembership.mockResolvedValue({
        id: 'existing-membership',
      });

      await expect(service.joinGroup(joinGroupBodyDto, userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should join a group successfully', async () => {
      prisma.$transaction.mockImplementation(async (cb: Function) => {
        const tx = {};
        return cb(tx);
      });
      groupsRepository.findGroupByInviteCode.mockResolvedValue({
        id: 'group-123',
        maxMembers: 5,
        startDate: null,
      });
      groupsRepository.countMembers.mockResolvedValue(2);
      groupsRepository.findMembership.mockResolvedValue(null);
      groupsRepository.createMembership.mockResolvedValue(undefined);

      const result = await service.joinGroup(joinGroupBodyDto, userId);

      expect(result).toEqual({ message: 'Group joined successfully' });
      expect(groupsRepository.findGroupByInviteCode).toHaveBeenCalledWith(
        expect.anything(),
        joinGroupBodyDto.inviteCode,
      );
      expect(groupsRepository.createMembership).toHaveBeenCalledWith(
        expect.anything(),
        {
          groupId: 'group-123',
          userId,
        },
        3, // next position (count + 1)
      );
    });
  });

  describe('getUsersGroup', () => {
    it('should return groups for a user', async () => {
      const mockGroups = [
        { id: 'group-1', name: 'Group 1', _count: { memberships: 3 } },
      ];
      groupsRepository.getUserGroup.mockResolvedValue(mockGroups);

      const result = await service.getUsersGroup('user-123');

      expect(result).toEqual(mockGroups);
      expect(groupsRepository.getUserGroup).toHaveBeenCalledWith('user-123');
    });
  });

  describe('getAllGroups', () => {
    it('should return all groups', async () => {
      const mockGroups = [
        { id: 'group-1', name: 'Group 1', _count: { memberships: 3 } },
      ];
      groupsRepository.getAllGroups.mockResolvedValue(mockGroups);

      const result = await service.getAllGroups();

      expect(result).toEqual(mockGroups);
      expect(groupsRepository.getAllGroups).toHaveBeenCalled();
    });
  });

  describe('getGroupById', () => {
    it('should throw NotFoundException if group is not found', async () => {
      groupsRepository.getGroupById.mockResolvedValue(null);

      await expect(
        service.getGroupById('group-123', 'user-123'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return the group if found', async () => {
      const mockGroup = { id: 'group-123', name: 'Group 1' };
      groupsRepository.getGroupById.mockResolvedValue(mockGroup);

      const result = await service.getGroupById('group-123', 'user-123');

      expect(result).toEqual(mockGroup);
      expect(groupsRepository.getGroupById).toHaveBeenCalledWith(
        'group-123',
        'user-123',
      );
    });
  });

  describe('startGroupCycle', () => {
    const groupId = 'group-123';
    const userId = 'organizer-123';

    it('should throw ForbiddenException if user is not the organizer', async () => {
      groupsRepository.getGroupById.mockResolvedValue({
        id: groupId,
        organizerId: 'different-user',
      });

      await expect(service.startGroupCycle(groupId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ConflictException if group cycle already started', async () => {
      groupsRepository.getGroupById.mockResolvedValue({
        id: groupId,
        organizerId: userId,
        startDate: new Date(),
      });

      await expect(service.startGroupCycle(groupId, userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if group has fewer than 3 members', async () => {
      groupsRepository.getGroupById.mockResolvedValue({
        id: groupId,
        organizerId: userId,
        startDate: null,
        _count: { memberships: 2 },
      });

      await expect(service.startGroupCycle(groupId, userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should start the group cycle successfully', async () => {
      groupsRepository.getGroupById.mockResolvedValue({
        id: groupId,
        organizerId: userId,
        startDate: null,
        _count: { memberships: 3 },
      });
      groupsRepository.updateGroupStartDate.mockResolvedValue({
        id: groupId,
        startDate: new Date(),
      });

      const result = await service.startGroupCycle(groupId, userId);

      expect(result).toBeDefined();
      expect(groupsRepository.updateGroupStartDate).toHaveBeenCalledWith(
        groupId,
        expect.any(Date),
      );
    });
  });
});
