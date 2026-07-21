import { BILLING_CYCLE_DAYS } from "../constants/billing-cycle.constants";

export function getPayoutDate(
  startDate: string | Date | null | undefined,
  position: number,
  billingCycle: string,
): Date | null {
  if (!startDate) return null;
  const start = new Date(startDate);
  const daysPerCycle =
    BILLING_CYCLE_DAYS[billingCycle as keyof typeof BILLING_CYCLE_DAYS] || 1;
  const addedDays = (position - 1) * daysPerCycle;
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
    BILLING_CYCLE_DAYS[billingCycle as keyof typeof BILLING_CYCLE_DAYS] || 1;
  const totalDays = totalRounds * daysPerCycle;

  return {
    totalPayout,
    totalRounds,
    totalDays,
  };
}
