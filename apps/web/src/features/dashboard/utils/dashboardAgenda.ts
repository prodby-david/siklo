import { calculateGroupTurnState } from "@/features/groups/utils/groupTurnCalculator";
import { getPayoutDate } from "@/features/groups/utils/groupCalculations";
import { Group } from "@/features/groups/types/group.types";
import {
  ActionAlertItem,
  RotationAgendaItem,
  SaverHealthStats,
  DashboardActivityItem,
  ContributionDueStatus,
  OrganizerTaskItem,
  PayoutMilestoneItem,
  PayoutMilestoneStatus,
} from "../types/dashboard.types";

export function deriveDashboardInsights(
  groups: Group[],
  currentUserId: string,
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

        if (hasVerifiedPayment) {
          totalDueRounds += 1;
          onTimePaidRounds += 1;
        } else if (turn < currentTurn) {
          totalDueRounds += 1;
        } else {
          const turnDueDate = getPayoutDate(
            group.startDate || new Date(),
            turn,
            group.billingCycle || "MONTHLY",
            [],
          );
          const graceDays = group.gracePeriodDays ?? 0;
          const dueTime = turnDueDate ? turnDueDate.getTime() : 0;
          const deadline = dueTime + graceDays * 24 * 60 * 60 * 1000;
          if (dueTime > 0 && Date.now() > deadline) {
            totalDueRounds += 1;
          }
        }
      }
    }

    for (const act of groupActivities) {
      const actUpper = act.activity.toUpperCase();
      const type: "PAYMENT" | "ANNOUNCEMENT" | "CYCLE" | "JOIN" = actUpper.includes(
        "PAYMENT",
      )
        ? "PAYMENT"
        : actUpper.includes("ANNOUNCEMENT")
          ? "ANNOUNCEMENT"
          : actUpper.includes("JOIN") || actUpper.includes("MEMBER")
            ? "JOIN"
            : "CYCLE";

      activities.push({
        id: act.id,
        groupId: group.id,
        groupName: group.name,
        text: act.activity.replace(/_/g, " "),
        date: new Date(act.createdAt),
        type,
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

        const graceDays = group.gracePeriodDays ?? 0;
        const dueTime = targetDate ? targetDate.getTime() : 0;
        const deadline = dueTime + graceDays * 24 * 60 * 60 * 1000;
        const isPastDeadline = dueTime > 0 && Date.now() > deadline;

        if (!isPaidForCurrentTurn && !isPendingForCurrentTurn && isPastDeadline) {
          alerts.push({
            id: `payment-due-${group.id}`,
            type: "PAYMENT_DUE",
            title: `Contribution Overdue for ${group.name}`,
            subtitle: `Turn #${activeTurn} contribution of ₱${group.contributionAmount.toLocaleString()} is past due. Please settle immediately.`,
            amount: group.contributionAmount,
            dueDate: targetDate,
            groupId: group.id,
            groupName: group.name,
            actionUrl: `/group/${group.id}`,
            actionLabel: "Pay Overdue",
          });
        }
      }
    }
  }

  activities.sort((a, b) => b.date.getTime() - a.date.getTime());

  const hasHistory = totalDueRounds > 0;
  const onTimeReliabilityPercent = hasHistory
    ? Math.round((onTimePaidRounds / totalDueRounds) * 100)
    : 100;

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

export function deriveContributionDueStatus(
  dueGroup: Group | undefined,
  nearestDueDate: string | null,
  userId: string | undefined,
  nextContributionAmount: number,
): {
  paymentStatus: ContributionDueStatus;
  daysOverdue: number;
} {
  if (nextContributionAmount <= 0) {
    return { paymentStatus: "PAID", daysOverdue: 0 };
  }
  if (!dueGroup) {
    return { paymentStatus: "UPCOMING", daysOverdue: 0 };
  }
  const hasPendingPayment = dueGroup.payments?.some(
    (p) => p.userId === userId && p.status === "PENDING",
  );
  if (hasPendingPayment) {
    return { paymentStatus: "PENDING", daysOverdue: 0 };
  }
  const dueTime = nearestDueDate ? new Date(nearestDueDate).getTime() : 0;
  const graceDays = dueGroup.gracePeriodDays ?? 0;
  const deadlineTime = dueTime + graceDays * 24 * 60 * 60 * 1000;
  const now = Date.now();
  if (dueTime > 0 && now > deadlineTime) {
    const days = Math.max(
      1,
      Math.ceil((now - deadlineTime) / (1000 * 60 * 60 * 24)),
    );
    return { paymentStatus: "DELAYED", daysOverdue: days };
  }
  return { paymentStatus: "UPCOMING", daysOverdue: 0 };
}

export function deriveOrganizerTasks(
  groups: Group[],
  currentUserId: string,
): OrganizerTaskItem[] {
  const tasks: OrganizerTaskItem[] = [];

  for (const group of groups) {
    if (group.organizerId !== currentUserId) continue;

    const hasStarted = Boolean(group.startDate);
    const memberships = group.memberships || [];
    const rounds = group.rounds || [];
    const payments = group.payments || [];

    const pendingPayments = payments.filter((p) => p.status === "PENDING");
    if (pendingPayments.length > 0) {
      const totalPendingAmount = pendingPayments.reduce(
        (sum, p) => sum + (Number(p.totalAmount) || Number(p.baseAmount) || 0),
        0,
      );
      tasks.push({
        id: `organizer-verify-${group.id}`,
        type: "VERIFY_PAYMENTS",
        groupId: group.id,
        groupName: group.name,
        count: pendingPayments.length,
        amount: totalPendingAmount,
        actionUrl: `/group/${group.id}`,
        actionLabel: "Review Proofs",
      });
    }

    if (hasStarted) {
      const state = calculateGroupTurnState(
        memberships,
        rounds,
        payments,
        [],
        group.cycleDuration || 1,
        hasStarted,
      );

      const turnKey = `${state.currentCycle}-${state.currentTurn}`;
      const paidUserCount = state.paidUserIdsByTurn[turnKey]?.size || 0;
      const isRoundAllPaid = paidUserCount >= group.maxMembers;
      const isRoundDisbursed = state.disbursedTurns.has(turnKey);

      if (!state.isCycleDone && isRoundAllPaid && !isRoundDisbursed) {
        const currentRound = rounds.find(
          (r) =>
            r.cycleNumber === state.currentCycle &&
            r.roundNumber === state.currentTurn,
        );
        const recipientMembership = memberships.find(
          (m) => m.userId === currentRound?.recipientId,
        );
        const recipientName =
          recipientMembership?.user?.name || group.nextPayoutee?.name || "Beneficiary";
        const poolAmount = group.contributionAmount * group.maxMembers;

        tasks.push({
          id: `organizer-disburse-${group.id}`,
          type: "DISBURSE_PAYOUT",
          groupId: group.id,
          groupName: group.name,
          amount: poolAmount,
          turnNumber: state.currentTurn,
          recipientName,
          actionUrl: `/group/${group.id}`,
          actionLabel: "Disburse Payout",
        });
      }
    } else {
      if (memberships.length >= group.maxMembers && group.maxMembers > 0) {
        tasks.push({
          id: `organizer-start-${group.id}`,
          type: "START_CYCLE",
          groupId: group.id,
          groupName: group.name,
          count: memberships.length,
          actionUrl: `/group/${group.id}`,
          actionLabel: "Start Cycle",
        });
      }
    }
  }

  return tasks;
}

export function derivePayoutTimeline(
  groups: Group[],
  currentUserId: string,
): PayoutMilestoneItem[] {
  const milestones: PayoutMilestoneItem[] = [];

  for (const group of groups) {
    const memberships = group.memberships || [];
    const userMembership = memberships.find((m) => m.userId === currentUserId);
    if (!userMembership || !userMembership.position) continue;

    const hasStarted = Boolean(group.startDate);
    const rounds = group.rounds || [];
    const payments = group.payments || [];
    const userPosition = userMembership.position;
    const poolAmount = group.contributionAmount * group.maxMembers;

    const state = calculateGroupTurnState(
      memberships,
      rounds,
      payments,
      [],
      group.cycleDuration || 1,
      hasStarted,
    );

    const userRound = rounds.find((r) => r.roundNumber === userPosition);
    let targetDate: Date | null = null;

    if (userRound?.targetDate) {
      targetDate = new Date(userRound.targetDate);
    } else {
      targetDate = getPayoutDate(
        group.startDate || new Date(),
        userPosition,
        group.billingCycle || "MONTHLY",
      );
    }

    if (!targetDate || isNaN(targetDate.getTime())) {
      targetDate = new Date();
    }

    let status: PayoutMilestoneStatus = "UPCOMING";
    if (userRound?.status === "RECEIVED") {
      status = "RECEIVED";
    } else if (userRound?.status === "DISBURSED") {
      status = "DISBURSED";
    } else if (hasStarted && !state.isCycleDone && state.currentTurn === userPosition) {
      status = "CURRENT";
    }

    milestones.push({
      id: `milestone-${group.id}-${userPosition}`,
      groupId: group.id,
      groupName: group.name,
      turnNumber: userPosition,
      totalTurns: group.maxMembers,
      payoutAmount: poolAmount,
      targetDate,
      status,
      billingCycle: group.billingCycle || "MONTHLY",
    });
  }

  return milestones.sort(
    (a, b) => a.targetDate.getTime() - b.targetDate.getTime(),
  );
}
