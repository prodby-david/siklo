export function calculateEffectiveDeadline(
  targetDueDate: Date | string | null | undefined,
  gracePeriodDays = 0,
): Date | null {
  if (!targetDueDate) return null;
  const dueTime = new Date(targetDueDate).getTime();
  return new Date(dueTime + gracePeriodDays * 24 * 60 * 60 * 1000);
}

export function calculateDaysOverdue(
  effectiveDeadline: Date | null,
  currentTimestamp: number = Date.now(),
): number {
  if (!effectiveDeadline) return 0;
  if (currentTimestamp <= effectiveDeadline.getTime()) return 0;
  return Math.ceil(
    (currentTimestamp - effectiveDeadline.getTime()) / (1000 * 3600 * 24),
  );
}

export function calculateLatePenalty(
  baseAmount: number,
  latePenaltyRate: number,
  daysOverdue: number,
): number {
  if (daysOverdue <= 0 || latePenaltyRate <= 0 || baseAmount <= 0) return 0;
  return daysOverdue * (baseAmount * (latePenaltyRate / 100));
}
