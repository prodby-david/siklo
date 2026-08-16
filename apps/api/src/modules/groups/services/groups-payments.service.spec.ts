import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { GroupsPaymentsService } from './groups-payments.service';
import { GroupsCoreService } from './groups-core.service';
import { PrismaService } from '@/database/prisma.service';
import { ActivityService } from '../../activity/activity.service';

describe('GroupsPaymentsService', () => {
  let service: GroupsPaymentsService;
  let groupsCoreService: { getExistingGroup: jest.Mock };
  let activityService: { createActivity: jest.Mock };
  let prisma: {
    group: { findUnique: jest.Mock };
    round: { findUnique: jest.Mock };
    membership: { findUnique: jest.Mock; findMany: jest.Mock };
    payment: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    groupsCoreService = {
      getExistingGroup: jest.fn(),
    };

    activityService = {
      createActivity: jest.fn().mockResolvedValue({}),
    };

    prisma = {
      group: { findUnique: jest.fn() },
      round: { findUnique: jest.fn() },
      membership: { findUnique: jest.fn(), findMany: jest.fn() },
      payment: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsPaymentsService,
        { provide: GroupsCoreService, useValue: groupsCoreService },
        { provide: ActivityService, useValue: activityService },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GroupsPaymentsService>(GroupsPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyPayment', () => {
    it('should verify payment successfully', async () => {
      const paymentId = 'pay-1';
      const organizerUserId = 'organizer-1';

      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId,
        userId: 'member-1',
        groupId: 'group-1',
        group: { organizerId: organizerUserId },
        user: { name: 'Member 1' },
        round: { roundNumber: 1 },
      });

      prisma.payment.update.mockResolvedValue({
        id: paymentId,
        status: 'VERIFIED',
      });

      const result = await service.verifyPayment(paymentId, organizerUserId);

      expect(result.message).toBe('Payment verified successfully');
      expect(result.payment.status).toBe('VERIFIED');
    });

    it('should throw ForbiddenException if user is not organizer', async () => {
      const paymentId = 'pay-1';

      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId,
        group: { organizerId: 'organizer-1' },
      });

      await expect(
        service.verifyPayment(paymentId, 'not-organizer'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
