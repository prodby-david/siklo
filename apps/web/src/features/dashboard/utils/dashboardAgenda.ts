import { calculateGroupTurnState } from "@/features/groups/utils/groupTurnCalculator";
import { getPayoutDate } from "@/features/groups/utils/groupCalculations";
import { Group } from "@/features/groups/types/group.types";
import {
  ActionAlertItem,
  RotationAgendaItem,
  SaverHealthStats,
  DashboardActivityItem,
} from "../types/dashboard.types";

export function deriveDashboardInsights(
  groups: Group[],
  currentUserId: string,
  pendingPaymentsCount = 0,
): {
  alerts: ActionAlertItem[];
  agenda: RotationAgendaItem[];
  healthStats: SaverHealthStats;
  activities: DashboardActivityItem[];
} {
  const alerts: ActionAlertItem[] = [];
  const agenda: RotationAgendaItem[] = [];
  const activities: DashboardActivityItem[] = [];

  let totalSavingsCollected = 0;
  let totalContributionsPaid = 0;
  let activeCyclesCount = 0;
  let completedCyclesCount = 0;
  let totalDueRounds = 0;
  let onTimePaidRounds = 0;

  if (pendingPaymentsCount > 0) {
    alerts.push({
      id: "organizer-verify-alert",
      type: "ORGANIZER_VERIFY",
      title: "Incoming Member Payments Pending Verification",
      subtitle: `You have ${pendingPaymentsCount} incoming payment proof(s) waiting for organizer review.`,
      groupId: "",
      groupName: "Organizer Verification",
      actionUrl: "/group",
      actionLabel: "Review Payments",
    });
  }

  for (const group of groups) {
    const hasStarted = Boolean(group.startDate);
    const memberships = group.memberships || [];
    const rounds = group.rounds || [];
    const payments = group.payments || [];
    const groupActivities = group.activities || [];

    const userMembership = memberships.find((m) => m.userId === currentUserId);
    const userPosition = userMembership?.position;

    const state = calculateGroupTurnState(
      memberships,
      rounds,
      payments,
      [],
      group.cycleDuration || 1,
      hasStarted,
    );

    if (state.isCycleDone) {
      completedCyclesCount += 1;
    } else if (hasStarted) {
      activeCyclesCount += 1;
    }

    if (rounds.length > 0 && userPosition) {
      for (const round of rounds) {
        if (
          round.roundNumber === userPosition &&
          (round.status === "DISBURSED" || round.status === "RECEIVED")
        ) {
          totalSavingsCollected += group.contributionAmount * group.maxMembers;
        }
      }
    }

    if (payments.length > 0) {
      const userPayments = payments.filter((p) => p.userId === currentUserId);
      for (const p of userPayments) {
        if (p.status === "VERIFIED") {
          totalContributionsPaid +=
            Number(p.totalAmount || p.baseAmount) || group.contributionAmount;
        }
      }
    }

    if (hasStarted && userMembership) {
      const currentTurn = state.currentTurn;
      const currentCycle = state.currentCycle;

      for (let turn = 1; turn <= currentTurn; turn++) {
        const turnKey = `${currentCycle}-${turn}`;
        const hasVerifiedPayment = Boolean(
          state.paidUserIdsByTurn[turnKey]?.has(currentUserId),
        );

        totalDueRounds += 1;
        if (hasVerifiedPayment) {
          onTimePaidRounds += 1;
        }
      }
    }

    for (const act of groupActivities) {
      activities.push({
        id: act.id,
        groupId: group.id,
        groupName: group.name,
        text: act.activity.replace(/_/g, " "),
        date: new Date(act.createdAt),
        type: act.activity.includes("PAYMENT") ? "PAYMENT" : "CYCLE",
      });
    }

    if (hasStarted && !state.isCycleDone && userMembership && userPosition) {
      const activeTurn = state.currentTurn;
      const activeCycle = state.currentCycle;
      const turnKey = `${activeCycle}-${activeTurn}`;

      const isUserPayoutTurn = userPosition === activeTurn;
      const isPaidForCurrentTurn = Boolean(
        state.paidUserIdsByTurn[turnKey]?.has(currentUserId),
      );
      const isPendingForCurrentTurn = Boolean(
        state.pendingUserIdsByTurn[turnKey]?.has(currentUserId),
      );

      const targetDate = getPayoutDate(
        group.startDate,
        activeTurn,
        group.billingCycle,
        [],
      );

      if (isUserPayoutTurn) {
        const poolAmount = group.contributionAmount * group.maxMembers;
        agenda.push({
          id: `${group.id}-${turnKey}-payout`,
          groupId: group.id,
          groupName: group.name,
          type: "PAYOUT_SCHEDULED",
          amount: poolAmount,
          targetDate,
          turnNumber: activeTurn,
          maxMembers: group.maxMembers,
          status: isPaidForCurrentTurn ? "VERIFIED" : "PENDING",
          billingCycle: group.billingCycle,
          isCurrentUserTurn: true,
        });

        const activeRound = rounds.find(
          (r) => r.cycleNumber === activeCycle && r.roundNumber === activeTurn,
        );
        if (activeRound?.status === "DISBURSED") {
          alerts.push({
            id: `payout-disbursed-${group.id}`,
            type: "CONFIRM_PAYOUT",
            title: `Lump-Sum Payout Released for ${group.name}`,
            subtitle: `₱${poolAmount.toLocaleString()} has been sent to your preferred payment account for Turn #${activeTurn}. Please confirm receipt.`,
            amount: poolAmount,
            groupId: group.id,
            groupName: group.name,
            actionUrl: `/group/${group.id}`,
            actionLabel: "Confirm Payout",
          });
        }
      } else {
        agenda.push({
          id: `${group.id}-${turnKey}-contrib`,
          groupId: group.id,
          groupName: group.name,
          type: "CONTRIBUTION_DUE",
          amount: group.contributionAmount,
          targetDate,
          turnNumber: activeTurn,
          maxMembers: group.maxMembers,
          status: isPaidForCurrentTurn
            ? "PAID"
            : isPendingForCurrentTurn
              ? "PENDING"
              : "PENDING",
          billingCycle: group.billingCycle,
          isCurrentUserTurn: false,
        });

        if (!isPaidForCurrentTurn && !isPendingForCurrentTurn) {
          alerts.push({
            id: `payment-due-${group.id}`,
            type: "PAYMENT_DUE",
            title: `Contribution Due for ${group.name}`,
            subtitle: `Turn #${activeTurn} contribution of ₱${group.contributionAmount.toLocaleString()} is open.`,
            amount: group.contributionAmount,
            dueDate: targetDate,
            groupId: group.id,
            groupName: group.name,
            actionUrl: `/group/${group.id}`,
            actionLabel: "Pay Contribution",
          });
        }
      }
    }
  }

  activities.sort((a, b) => b.date.getTime() - a.date.getTime());

  const hasHistory = totalDueRounds > 0;
  const onTimeReliabilityPercent = hasHistory
    ? Math.round((onTimePaidRounds / totalDueRounds) * 100)
    : 0;

  return {
    alerts,
    agenda,
    healthStats: {
      totalSavingsCollected,
      totalContributionsPaid,
      activeCyclesCount,
      completedCyclesCount,
      onTimeReliabilityPercent,
      hasHistory,
    },
    activities: activities.slice(0, 8),
  };
}
