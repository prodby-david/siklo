import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repository';
import { ActivityService } from '../activity/activity.service';
import { GroupsCoreService } from '../groups/services/groups-core.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let paymentsRepository: {
    findPaymentById: jest.Mock;
    updatePaymentStatusVerified: jest.Mock;
    findGroupByGroupId: jest.Mock;
    findRoundByRoundId: jest.Mock;
    findMembership: jest.Mock;
    createPayment: jest.Mock;
    findUserActiveGroupsWithMemberships: jest.Mock;
  };
  let activityService: { createActivity: jest.Mock };
  let groupsCoreService: { getExistingGroup: jest.Mock };

  beforeEach(async () => {
    paymentsRepository = {
      findPaymentById: jest.fn(),
      updatePaymentStatusVerified: jest.fn(),
      findGroupByGroupId: jest.fn(),
      findRoundByRoundId: jest.fn(),
      findMembership: jest.fn(),
      createPayment: jest.fn(),
      findUserActiveGroupsWithMemberships: jest.fn().mockResolvedValue([]),
    };

    activityService = {
      createActivity: jest.fn().mockResolvedValue({}),
    };

    groupsCoreService = {
      getExistingGroup: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PaymentsRepository, useValue: paymentsRepository },
        { provide: ActivityService, useValue: activityService },
        { provide: GroupsCoreService, useValue: groupsCoreService },
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
        group: { organizerId: 'organizer-1' },
      });

      await expect(
        service.verifyPayment(paymentId, 'not-organizer'),
      ).rejects.toThrow(ForbiddenException);
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
          memberships: [],
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
