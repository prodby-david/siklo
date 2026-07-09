import { BILLING_CYCLE_DAYS } from "../constants/billing-cycle.constants";

interface GroupTimelineInput {
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
  const totalPayout = contributionAmount * maxMembers;
  const totalRounds = maxMembers * cycleDuration;
  const totalDays = totalRounds * (BILLING_CYCLE_DAYS[billingCycle as keyof typeof BILLING_CYCLE_DAYS] || 1);

  const start = startDate ? new Date(startDate) : null;
  const end = start ? new Date(start.getTime() + totalDays * 24 * 60 * 60 * 1000) : null;

  return {
    totalPayout,
    totalRounds,
    totalDays,
    endDate: end,
  };
}
