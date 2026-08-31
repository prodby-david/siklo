import { BILLING_CYCLE_DAYS } from "../constants/billing-cycle.constants";

export function getPayoutDate(
  startDate: string | Date | null | undefined,
  position: number,
  billingCycle: string,
  completedDisbursements?: Record<number, Date | string>,
): Date | null {
  if (!startDate) return null;

  if (completedDisbursements && completedDisbursements[position]) {
    return new Date(completedDisbursements[position]);
  }

  const daysPerCycle =
    BILLING_CYCLE_DAYS[billingCycle as keyof typeof BILLING_CYCLE_DAYS] || 7;

  if (completedDisbursements) {
    let latestCompletedTurn = 0;
    for (let p = position - 1; p >= 1; p--) {
      if (completedDisbursements[p]) {
        latestCompletedTurn = p;
        break;
      }
    }

    if (latestCompletedTurn > 0) {
      const baseDate = new Date(completedDisbursements[latestCompletedTurn]);
      const turnsDiff = position - latestCompletedTurn;
      const addedDays = turnsDiff * daysPerCycle;
      return new Date(baseDate.getTime() + addedDays * 24 * 60 * 60 * 1000);
    }
  }

  const start = new Date(startDate);
  const addedDays = 7 + (position - 1) * daysPerCycle;
  return new Date(start.getTime() + addedDays * 24 * 60 * 60 * 1000);
}

export function calculateCycleDetails(
  contributionAmount: number | string,
  maxMembers: number | string,
  cycleDuration: number | string,
  billingCycle: string,
) {
  const contribution = Number(contributionAmount || 0);
  const members = Number(maxMembers || 0);
  const duration = Number(cycleDuration || 0);

  const totalPayout = contribution * members;
  const totalRounds = members * duration;
  const daysPerCycle =
    BILLING_CYCLE_DAYS[billingCycle as keyof typeof BILLING_CYCLE_DAYS] || 7;
  const totalDays = 7 + totalRounds * daysPerCycle;

  return {
    totalPayout,
    totalRounds,
    totalDays,
  };
}

export interface GroupTimelineInput {
  contributionAmount: number;
  maxMembers: number;
  cycleDuration: number;
  billingCycle: string;
  startDate?: string | Date | null;
}

export function calculateGroupTimeline({
  contributionAmount,
  maxMembers,
  cycleDuration,
  billingCycle,
  startDate,
}: GroupTimelineInput) {
  const details = calculateCycleDetails(
    contributionAmount,
    maxMembers,
    cycleDuration,
    billingCycle,
  );

  const start = startDate ? new Date(startDate) : null;
  const end = start
    ? new Date(start.getTime() + details.totalDays * 24 * 60 * 60 * 1000)
    : null;

  return {
    ...details,
    endDate: end,
  };
}
