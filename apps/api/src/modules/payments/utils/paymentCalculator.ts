export function calculatePenaltyAmount(
  now: Date,
  targetDate: Date,
  gracePeriodDays: number,
  contributionAmount: number,
  latePenaltyAmountRate: number,
): number {
  const dueDateWithGrace = new Date(targetDate);
  dueDateWithGrace.setDate(dueDateWithGrace.getDate() + gracePeriodDays);

  if (now > dueDateWithGrace) {
    const daysOverdue = Math.ceil(
      (now.getTime() - dueDateWithGrace.getTime()) / (1000 * 3600 * 24),
    );
    return (
      Math.max(0, daysOverdue) *
      (contributionAmount * (latePenaltyAmountRate / 100))
    );
  }

  return 0;
}

export function calculateTargetDate(
  startDate: string | Date | null | undefined,
  step: number,
  intervalDays: number,
): Date {
  const startMs = startDate ? new Date(startDate).getTime() : Date.now();
  return new Date(startMs + step * intervalDays * 24 * 60 * 60 * 1000);
}
