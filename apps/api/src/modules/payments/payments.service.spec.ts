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
    findRoundByGroupCycleAndNumber: jest.Mock;
    findCurrentRoundByGroupId: jest.Mock;
    findMembership: jest.Mock;
    createPayment: jest.Mock;
    findPaymentByGroupRoundAndUser: jest.Mock;
    updatePaymentRecord: jest.Mock;
    countUnpaidRoundsBeforeCycle: jest.Mock;
    findOrCreateRound: jest.Mock;
    updateRoundStatus: jest.Mock;
    findNextUnpaidRoundAfter: jest.Mock;
    findUserActiveGroupsWithMemberships: jest.Mock;
    findVerifiedPaymentsByGroupId: jest.Mock;
    transitionRoundStatus: jest.Mock;
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
      findRoundByGroupCycleAndNumber: jest.fn(),
      findCurrentRoundByGroupId: jest.fn(),
      findMembership: jest.fn(),
      createPayment: jest.fn(),
      findPaymentByGroupRoundAndUser: jest.fn(),
      updatePaymentRecord: jest.fn(),
      countUnpaidRoundsBeforeCycle: jest.fn().mockResolvedValue(0),
      findOrCreateRound: jest.fn(),
      updateRoundStatus: jest.fn(),
      findNextUnpaidRoundAfter: jest.fn(),
      findUserActiveGroupsWithMemberships: jest.fn().mockResolvedValue([]),
      findVerifiedPaymentsByGroupId: jest.fn().mockResolvedValue([]),
      transitionRoundStatus: jest.fn(),
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
    it('should reject a round that is not currently open', async () => {
      paymentsRepository.findRoundByRoundId.mockResolvedValue({
        id: 'round-future',
        groupId: 'group-1',
        status: 'PENDING',
      });
      paymentsRepository.findGroupByGroupId.mockResolvedValue({
        id: 'group-1',
        startDate: new Date(),
        cycleDuration: 3,
        allowedPaymentMethods: ['CASH'],
        memberships: [{ userId: 'user-1', position: 1 }],
      });
      paymentsRepository.findCurrentRoundByGroupId.mockResolvedValue({
        id: 'round-current',
      });

      await expect(
        service.submitPayment(
          { roundId: 'round-future', paymentMethod: 'CASH' },
          'user-1',
        ),
      ).rejects.toThrow(ConflictException);
      expect(paymentsRepository.createPayment).not.toHaveBeenCalled();
    });
  });

  describe('cycle gating', () => {
    it('should block contributions into a cycle with unfinished prior payouts', async () => {
      paymentsRepository.findRoundByRoundId.mockResolvedValue({
        id: 'round-2',
        groupId: 'group-1',
        status: 'PENDING',
      });
      paymentsRepository.findGroupByGroupId.mockResolvedValue({
        id: 'group-1',
        startDate: new Date(),
        cycleDuration: 3,
        allowedPaymentMethods: ['CASH'],
        memberships: [{ userId: 'user-1', position: 1 }],
      });
      paymentsRepository.findCurrentRoundByGroupId.mockResolvedValue({
        id: 'round-1',
      });

      await expect(
        service.submitPayment(
          { roundId: 'round-2', paymentMethod: 'CASH' },
          'user-1',
        ),
      ).rejects.toThrow(ConflictException);
      expect(paymentsRepository.createPayment).not.toHaveBeenCalled();
    });

    it('should block resubmission while a payment is awaiting verification', async () => {
      paymentsRepository.findGroupByGroupId.mockResolvedValue({
        id: 'group-1',
        startDate: new Date(),
        cycleDuration: 3,
        contributionAmount: 1000,
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
        allowedPaymentMethods: ['CASH'],
        memberships: [{ userId: 'user-1', position: 1 }],
      });
      paymentsRepository.findMembership.mockResolvedValue({
        userId: 'user-1',
        position: 1,
        user: { name: 'User One' },
      });
      paymentsRepository.findRoundByRoundId.mockResolvedValue({
        id: 'round-1',
        groupId: 'group-1',
        status: 'PENDING',
        targetDate: new Date('2026-08-01'),
      });
      paymentsRepository.findCurrentRoundByGroupId.mockResolvedValue({
        id: 'round-1',
      });
      paymentsRepository.findPaymentByGroupRoundAndUser.mockResolvedValue({
        id: 'payment-1',
        status: 'PENDING',
      });

      await expect(
        service.submitPayment(
          { roundId: 'round-1', paymentMethod: 'CASH' },
          'user-1',
        ),
      ).rejects.toThrow(ConflictException);
      expect(paymentsRepository.updatePaymentRecord).not.toHaveBeenCalled();
      expect(paymentsRepository.createPayment).not.toHaveBeenCalled();
    });

    it('should allow resubmission after rejection by replacing the proof', async () => {
      paymentsRepository.findGroupByGroupId.mockResolvedValue({
        id: 'group-1',
        startDate: new Date(),
        cycleDuration: 3,
        contributionAmount: 1000,
        gracePeriodDays: 0,
        latePenaltyAmount: 0,
        allowedPaymentMethods: ['CASH'],
        memberships: [{ userId: 'user-1', position: 1 }],
      });
      paymentsRepository.findMembership.mockResolvedValue({
        userId: 'user-1',
        position: 1,
        user: { name: 'User One' },
      });
      paymentsRepository.findRoundByRoundId.mockResolvedValue({
        id: 'round-1',
        groupId: 'group-1',
        status: 'PENDING',
        targetDate: new Date('2026-08-01'),
      });
      paymentsRepository.findCurrentRoundByGroupId.mockResolvedValue({
        id: 'round-1',
      });
      paymentsRepository.findPaymentByGroupRoundAndUser.mockResolvedValue({
        id: 'payment-1',
        status: 'REJECTED',
      });
      paymentsRepository.updatePaymentRecord.mockResolvedValue({
        id: 'payment-1',
        status: 'PENDING',
      });
      activityService.createActivity.mockResolvedValue({});
      notificationsService.createNotification.mockResolvedValue({});

      const result = await service.submitPayment(
        { roundId: 'round-1', paymentMethod: 'CASH', proofUrl: 'proof.png' },
        'user-1',
      );

      expect(result.payment.status).toBe('PENDING');
      expect(paymentsRepository.updatePaymentRecord).toHaveBeenCalledWith(
        'payment-1',
        expect.objectContaining({ status: 'PENDING' }),
        undefined,
      );
    });
  });

  describe('disbursePayout', () => {
    it('should throw BadRequestException if not all members have completed verified contributions', async () => {
      groupsCoreService.getExistingGroup.mockResolvedValue({
        id: 'group-1',
        startDate: new Date(),
        organizerId: 'organizer-1',
        contributionAmount: 1000,
        maxMembers: 2,
        cycleDuration: 2,
        memberships: [
          { userId: 'user-1', position: 1, user: { name: 'Member 1' } },
          { userId: 'user-2', position: 2, user: { name: 'Member 2' } },
        ],
      });
      paymentsRepository.findRoundByRoundId.mockResolvedValue({
        id: 'r-1',
        groupId: 'group-1',
        status: 'PENDING',
        recipientId: 'user-1',
        cycleNumber: 1,
        roundNumber: 1,
      });
      paymentsRepository.findCurrentRoundByGroupId.mockResolvedValue({
        id: 'r-1',
      });
      paymentsRepository.findVerifiedPaymentsByGroupId.mockResolvedValue([
        { roundId: 'r-1', userId: 'user-1' },
      ]);

      await expect(
        service.disbursePayout(
          {
            roundId: 'r-1',
            referenceNumber: 'REF-12345',
            proofUrl: 'proof.png',
          },
          'organizer-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should disburse payout and complete round when all members are paid', async () => {
      groupsCoreService.getExistingGroup.mockResolvedValue({
        id: 'group-1',
        startDate: new Date(),
        organizerId: 'organizer-1',
        contributionAmount: 1000,
        maxMembers: 2,
        cycleDuration: 2,
        billingCycle: 'MONTHLY',
        memberships: [
          { userId: 'user-1', position: 1, user: { name: 'Member 1' } },
          { userId: 'user-2', position: 2, user: { name: 'Member 2' } },
        ],
      });
      paymentsRepository.findRoundByRoundId.mockResolvedValue({
        id: 'r-1',
        groupId: 'group-1',
        status: 'PENDING',
        cycleNumber: 1,
        roundNumber: 1,
        recipientId: 'user-1',
      });
      paymentsRepository.findCurrentRoundByGroupId.mockResolvedValue({
        id: 'r-1',
      });
      paymentsRepository.findVerifiedPaymentsByGroupId.mockResolvedValue([
        { roundId: 'r-1', userId: 'user-1' },
        { roundId: 'r-1', userId: 'user-2' },
      ]);
      paymentsRepository.transitionRoundStatus.mockResolvedValue({
        id: 'r-1',
        status: 'DISBURSED',
      });
      paymentsRepository.findNextUnpaidRoundAfter.mockResolvedValue({
        id: 'r-2',
        cycleNumber: 1,
        roundNumber: 2,
      });

      const result = await service.disbursePayout(
        { roundId: 'r-1', referenceNumber: 'REF-12345', proofUrl: 'proof.png' },
        'organizer-1',
      );

      expect(result.success).toBe(true);
      expect(result.round.status).toBe('DISBURSED');
    });
  });

  describe('confirmPayoutReceipt', () => {
    it('should notify members that next turn contributions are open', async () => {
      groupsCoreService.getExistingGroup.mockResolvedValue({
        id: 'group-1',
        startDate: new Date(),
        organizerId: 'organizer-1',
        contributionAmount: 1000,
        maxMembers: 2,
        cycleDuration: 2,
        memberships: [
          {
            userId: 'user-1',
            position: 1,
            user: { id: 'user-1', name: 'Recipient' },
          },
          {
            userId: 'member-2',
            position: 2,
            user: { id: 'member-2', name: 'Member Two' },
          },
        ],
      });
      paymentsRepository.findRoundByRoundId.mockResolvedValue({
        id: 'round-1',
        groupId: 'group-1',
        recipientId: 'user-1',
        cycleNumber: 1,
        status: 'DISBURSED',
        roundNumber: 1,
      });
      paymentsRepository.transitionRoundStatus.mockResolvedValue({
        id: 'round-1',
        status: 'RECEIVED',
      });
      paymentsRepository.findNextUnpaidRoundAfter.mockResolvedValue({
        id: 'round-2',
        cycleNumber: 1,
        roundNumber: 2,
      });

      const result = await service.confirmPayoutReceipt(
        { roundId: 'round-1' },
        'user-1',
      );

      expect(result.success).toBe(true);
      expect(notificationsService.createNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          description: expect.stringContaining('contributions are now open'),
        }),
      );
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
          rounds: [
            {
              id: 'round-1',
              cycleNumber: 1,
              roundNumber: 1,
              status: 'PENDING',
              recipientId: 'user-1',
              targetDate: '2026-08-01T00:00:00.000Z',
            },
          ],
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
