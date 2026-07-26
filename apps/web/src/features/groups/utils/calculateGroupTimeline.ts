import { calculateCycleDetails } from "./group.calculations";

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
