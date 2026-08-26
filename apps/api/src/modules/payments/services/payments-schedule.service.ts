import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../payments.repository';
import { GroupWithMembershipsAndRounds } from '../payments.types';
import { PAYMENT_STATUS } from '../constants/payment.constants';
import { computeGroupCompletion } from '@/commons/utils/computeGroupCompletion';

function sortByCycleAndRound<
  T extends { cycleNumber: number; roundNumber: number },
>(rounds: T[]): T[] {
  return [...rounds].sort((a, b) =>
    a.cycleNumber !== b.cycleNumber
      ? a.cycleNumber - b.cycleNumber
      : a.roundNumber - b.roundNumber,
  );
}

@Injectable()
export class PaymentsScheduleService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async getNearestUnpaidContribution(userId: string) {
    const activeGroups =
      await this.paymentsRepository.findUserActiveGroupsWithMemberships(userId);

    const nonCompletedGroups = activeGroups.filter(
      (group) => !this.isGroupComplete(group),
    );

    const due = this.computeNextUnpaidContribution(nonCompletedGroups, userId);
    const payout = this.computeNextUpcomingPayout(nonCompletedGroups, userId);

    return {
      nextContributionAmount: due.amount,
      nearestDueDate: due.dueDate,
      dueGroupName: due.groupName,
      dueGroupId: due.groupId,
      nearestGroupName: due.groupName,
      nearestGroupId: due.groupId,
      activeGroupsCount: nonCompletedGroups.length,
      nextPayoutDate: payout.date,
      nextPayoutAmount: payout.amount,
      nextPayoutGroupName: payout.groupName,
      nextPayoutGroupId: payout.groupId,
    };
  }

  isGroupComplete(group: GroupWithMembershipsAndRounds): boolean {
    return computeGroupCompletion(group).isComplete;
  }

  computeNextUnpaidContribution(
    groups: GroupWithMembershipsAndRounds[],
    userId: string,
  ) {
    let earliestDue: {
      amount: number;
      dueDate: string | null;
      groupName: string;
      groupId: string;
    } | null = null;

    for (const group of groups) {
      if (!group.startDate) continue;

      const membership = group.memberships.find((m) => m.userId === userId);
      if (!membership) continue;

      const paidRoundIds = new Set(
        (group.payments || [])
          .filter(
            (p) => p.status === PAYMENT_STATUS.VERIFIED && p.userId === userId,
          )
          .map((p) => p.roundId),
      );

      const nextUnpaid = sortByCycleAndRound(group.rounds ?? []).find(
        (round) => !paidRoundIds.has(round.id),
      );
      if (!nextUnpaid) continue;

      const dueIso = nextUnpaid.targetDate
        ? new Date(nextUnpaid.targetDate).toISOString()
        : null;

      if (!earliestDue || (dueIso && dueIso < (earliestDue.dueDate || ''))) {
        earliestDue = {
          amount: group.contributionAmount,
          dueDate: dueIso,
          groupName: group.name,
          groupId: group.id,
        };
      }
    }

    return (
      earliestDue || {
        amount: 0,
        dueDate: null,
        groupName: '',
        groupId: '',
      }
    );
  }

  computeNextUpcomingPayout(
    groups: GroupWithMembershipsAndRounds[],
    userId: string,
  ) {
    let earliestPayout: {
      date: string | null;
      amount: number;
      groupName: string;
      groupId: string;
    } | null = null;

    for (const group of groups) {
      if (!group.startDate) continue;

      const membership = group.memberships.find((m) => m.userId === userId);
      if (!membership) continue;

      const payoutAmount = group.contributionAmount * group.maxMembers;

      const nextOwnRound = sortByCycleAndRound(group.rounds ?? []).find(
        (round) =>
          round.recipientId === userId && round.status !== ('PAID' as const),
      );
      if (!nextOwnRound) continue;

      const payoutIso = nextOwnRound.targetDate
        ? new Date(nextOwnRound.targetDate).toISOString()
        : null;

      if (
        !earliestPayout ||
        (payoutIso && payoutIso < (earliestPayout.date || ''))
      ) {
        earliestPayout = {
          date: payoutIso,
          amount: payoutAmount,
          groupName: group.name,
          groupId: group.id,
        };
      }
    }

    return (
      earliestPayout || {
        date: null,
        amount: 0,
        groupName: '',
        groupId: '',
      }
    );
  }
}
