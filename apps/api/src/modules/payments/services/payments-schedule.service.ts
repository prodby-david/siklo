import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../payments.repository';
import { GroupWithMembershipsAndRounds } from '../payments.types';
import {
  BILLING_CYCLE_DAYS,
  PAYMENT_STATUS,
} from '../constants/payment.constants';
import { computeGroupCompletion } from '@/commons/utils/computeGroupCompletion';

@Injectable()
export class PaymentsScheduleService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async getNearestUnpaidContribution(userId: string) {
    const activeGroups =
      await this.paymentsRepository.findUserActiveGroupsWithMemberships(userId);

    const nonCompletedGroups: GroupWithMembershipsAndRounds[] = [];
    for (const group of activeGroups) {
      if (!(await this.isGroupComplete(group))) {
        nonCompletedGroups.push(group);
      }
    }

    const due = await this.computeNextUnpaidContribution(
      nonCompletedGroups,
      userId,
    );
    const payout = await this.computeNextUpcomingPayout(
      nonCompletedGroups,
      userId,
    );

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

  async isGroupComplete(
    group: GroupWithMembershipsAndRounds,
  ): Promise<boolean> {
    return computeGroupCompletion(group).isComplete;
  }

  async computeNextUnpaidContribution(
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

      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const startMs = new Date(group.startDate).getTime();
      const memberCount = group.memberships.length;
      const verifiedPayments = group.payments || [];

      for (let c = 1; c <= group.cycleDuration; c++) {
        for (let turn = 1; turn <= memberCount; turn++) {
          const matchingRound = group.rounds?.find(
            (r) => r.cycleNumber === c && r.roundNumber === turn,
          );

          const hasPaid = verifiedPayments.some((p) => {
            if (p.status !== PAYMENT_STATUS.VERIFIED || p.userId !== userId) {
              return false;
            }
            return matchingRound ? p.roundId === matchingRound.id : true;
          });

          if (!hasPaid) {
            const step = (c - 1) * memberCount + (turn - 1);
            const dueMs = startMs + step * intervalDays * 24 * 60 * 60 * 1000;
            const dueIso = new Date(dueMs).toISOString();

            if (!earliestDue || dueIso < (earliestDue.dueDate || '')) {
              earliestDue = {
                amount: group.contributionAmount,
                dueDate: dueIso,
                groupName: group.name,
                groupId: group.id,
              };
            }
            break;
          }
        }
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

  async computeNextUpcomingPayout(
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

      const intervalDays = BILLING_CYCLE_DAYS[group.billingCycle] || 30;
      const startMs = new Date(group.startDate).getTime();
      const memberCount = group.memberships.length;
      const payoutAmount = group.contributionAmount * group.maxMembers;

      for (let c = 1; c <= group.cycleDuration; c++) {
        const round = group.rounds?.find(
          (r) => r.cycleNumber === c && r.roundNumber === membership.position,
        );

        if (round && round.status === 'PAID') {
          continue;
        }

        const step = (c - 1) * memberCount + membership.position;
        const payoutMs = startMs + step * intervalDays * 24 * 60 * 60 * 1000;
        const payoutIso = new Date(payoutMs).toISOString();

        if (!earliestPayout || payoutIso < (earliestPayout.date || '')) {
          earliestPayout = {
            date: payoutIso,
            amount: payoutAmount,
            groupName: group.name,
            groupId: group.id,
          };
        }
        break;
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
