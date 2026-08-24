import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repository';
import { PaymentsSubmissionService } from './services/payments-submission.service';
import { PaymentsManagementService } from './services/payments-management.service';
import { PaymentsScheduleService } from './services/payments-schedule.service';
import { PaymentsPayoutService } from './services/payments-payout.service';
import { ActivityService } from '../activity/activity.service';
import { NotificationsService } from '../notifications/notifications.service';
import { GroupsCoreService } from '../groups/services/groups-core.service';
import { PrismaService } from '@/database/prisma.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let paymentsRepository: {
    findPaymentById: jest.Mock;
    updatePaymentStatusVerified: jest.Mock;
    updatePaymentStatusRejected: jest.Mock;
    findGroupByGroupId: jest.Mock;
    findRoundByRoundId: jest.Mock;
    findMembership: jest.Mock;
    createPayment: jest.Mock;
    countUnpaidRoundsBeforeCycle: jest.Mock;
    findUserActiveGroupsWithMemberships: jest.Mock;
  };
  let activityService: { createActivity: jest.Mock };
  let notificationsService: { createNotification: jest.Mock };
  let groupsCoreService: { getExistingGroup: jest.Mock };

  beforeEach(async () => {
    paymentsRepository = {
      findPaymentById: jest.fn(),
      updatePaymentStatusVerified: jest.fn(),
      updatePaymentStatusRejected: jest.fn(),
      findGroupByGroupId: jest.fn(),
      findRoundByRoundId: jest.fn(),
      findMembership: jest.fn(),
      createPayment: jest.fn(),
      countUnpaidRoundsBeforeCycle: jest.fn().mockResolvedValue(0),
      findUserActiveGroupsWithMemberships: jest.fn().mockResolvedValue([]),
    };

    activityService = {
      createActivity: jest.fn().mockResolvedValue({}),
    };

    notificationsService = {
      createNotification: jest.fn().mockResolvedValue({}),
    };

    groupsCoreService = {
      getExistingGroup: jest.fn(),
    };

    const prismaService = {
      $transaction: jest.fn(async (cb: (tx: unknown) => Promise<unknown>) =>
        cb(undefined),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        PaymentsSubmissionService,
        PaymentsManagementService,
        PaymentsScheduleService,
        PaymentsPayoutService,
        { provide: PaymentsRepository, useValue: paymentsRepository },
        { provide: ActivityService, useValue: activityService },
        { provide: NotificationsService, useValue: notificationsService },
        { provide: GroupsCoreService, useValue: groupsCoreService },
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyPayment', () => {
    it('should verify payment successfully', async () => {
      const paymentId = 'pay-1';
      const organizerUserId = 'organizer-1';

      paymentsRepository.findPaymentById.mockResolvedValue({
        id: paymentId,
        userId: 'member-1',
        groupId: 'group-1',
        totalAmount: 1000,
        status: 'PENDING',
        group: { organizerId: organizerUserId },
        user: { name: 'Member 1' },
        round: { roundNumber: 1 },
      });

      paymentsRepository.updatePaymentStatusVerified.mockResolvedValue({
        id: paymentId,
        status: 'VERIFIED',
      });

      const result = await service.verifyPayment(paymentId, organizerUserId);

      expect(result.message).toBe('Payment verified successfully');
      expect(result.payment.status).toBe('VERIFIED');
    });

    it('should throw ForbiddenException if user is not organizer', async () => {
      const paymentId = 'pay-1';

      paymentsRepository.findPaymentById.mockResolvedValue({
        id: paymentId,
        status: 'PENDING',
        group: { organizerId: 'organizer-1' },
      });

      await expect(
        service.verifyPayment(paymentId, 'not-organizer'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ConflictException when verifying an already processed payment', async () => {
      paymentsRepository.findPaymentById.mockResolvedValue({
        id: 'pay-1',
        status: 'VERIFIED',
        group: { organizerId: 'organizer-1' },
      });

      await expect(
        service.verifyPayment('pay-1', 'organizer-1'),
      ).rejects.toThrow(ConflictException);
      expect(
        paymentsRepository.updatePaymentStatusVerified,
      ).not.toHaveBeenCalled();
    });

    it('should throw ConflictException when rejecting a verified payment', async () => {
      paymentsRepository.findPaymentById.mockResolvedValue({
        id: 'pay-1',
        status: 'VERIFIED',
        group: { organizerId: 'organizer-1' },
      });

      await expect(
        service.rejectPayment(
          'pay-1',
          { rejectionReason: 'Invalid proof' },
          'organizer-1',
        ),
      ).rejects.toThrow(ConflictException);
      expect(
        paymentsRepository.updatePaymentStatusRejected,
      ).not.toHaveBeenCalled();
    });
  });

  describe('submitPayment', () => {
    it('should throw BadRequestException for a cycle beyond group duration', async () => {
      paymentsRepository.findGroupByGroupId.mockResolvedValue({
        id: 'group-1',
        cycleDuration: 3,
        memberships: [{ userId: 'user-1', position: 1 }],
      });
      paymentsRepository.findMembership.mockResolvedValue({
        userId: 'user-1',
        position: 1,
        user: { name: 'User One' },
      });

      await expect(
        service.submitPayment(
          { groupId: 'group-1', cycleNumber: 5, paymentMethod: 'CASH' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
      expect(paymentsRepository.createPayment).not.toHaveBeenCalled();
    });
  });

  describe('getNearestUnpaidContribution', () => {
    it('should return default values if user has no active groups', async () => {
      paymentsRepository.findUserActiveGroupsWithMemberships.mockResolvedValue(
        [],
      );

      const result = await service.getNearestUnpaidContribution('user-1');

      expect(result.nextContributionAmount).toBe(0);
      expect(result.activeGroupsCount).toBe(0);
    });

    it('should return nearest group stats when user has active groups', async () => {
      const mockActiveGroups = [
        {
          id: 'group-1',
          name: 'Savings Group A',
          contributionAmount: 1000,
          startDate: '2026-08-01T00:00:00.000Z',
          cycleDuration: 1,
          billingCycle: 'MONTHLY',
          memberships: [{ userId: 'user-1', position: 1 }],
          payments: [],
          rounds: [],
        },
      ];

      paymentsRepository.findUserActiveGroupsWithMemberships.mockResolvedValue(
        mockActiveGroups,
      );

      const result = await service.getNearestUnpaidContribution('user-1');

      expect(result.nextContributionAmount).toBe(1000);
      expect(result.nearestGroupName).toBe('Savings Group A');
      expect(result.activeGroupsCount).toBe(1);
    });
  });
});
