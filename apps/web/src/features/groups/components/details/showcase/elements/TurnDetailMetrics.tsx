import formatDate from "@/shared/utils/formatDate";
import type { TurnDetailMetricsProps } from "@/features/groups/types/showcase.types";

export default function TurnDetailMetrics({
  selectedTurn,
  maxMembers,
  poolTotal,
  calculatedPayoutDate,
  latePenaltyRate = 0,
  gracePeriodDays = 0,
  accruedPenalty = 0,
  paidPenalty = 0,
  daysOverdue = 0,
}: TurnDetailMetricsProps) {
  return (
    <div className="divide-y divide-neutral-border/60 text-xs sm:text-sm pt-1">
      <div className="flex items-center justify-between py-2.5">
        <span className="text-neutral-subtext font-medium">
          Payout Queue Position
        </span>
        <span className="font-extrabold text-foreground">
          Turn #{selectedTurn} of {maxMembers}
        </span>
      </div>

      <div className="flex items-center justify-between py-2.5">
        <span className="text-neutral-subtext font-medium">
          Total Lump Sum Payout
        </span>
        <span className="font-black text-brand-accent text-base sm:text-lg">
          ₱{poolTotal.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between py-2.5">
        <span className="text-neutral-subtext font-medium">
          Target Payout Date
        </span>
        <span className="font-bold text-foreground">
          {calculatedPayoutDate ? formatDate(calculatedPayoutDate) : "Not started"}
        </span>
      </div>

      {latePenaltyRate > 0 && accruedPenalty > 0 && (
        <div className="flex items-center justify-between py-2.5">
          <span className="text-warning font-medium">
            Overdue Late Penalty
          </span>
          <span className="font-bold text-warning">
            +₱{accruedPenalty.toLocaleString()} ({daysOverdue}d overdue)
          </span>
        </div>
      )}

      {latePenaltyRate > 0 && paidPenalty > 0 && (
        <div className="flex items-center justify-between py-2.5">
          <span className="text-neutral-subtext font-medium">
            Late Penalty Included
          </span>
          <span className="font-bold text-foreground">
            ₱{paidPenalty.toLocaleString()}
          </span>
        </div>
      )}

      {latePenaltyRate > 0 && accruedPenalty === 0 && paidPenalty === 0 && (
        <div className="flex items-center justify-between py-2.5">
          <span className="text-neutral-subtext font-medium">
            Daily Late Penalty
          </span>
          <span className="font-semibold text-neutral-subtext">
            {latePenaltyRate}% / day
            {gracePeriodDays > 0 ? ` (${gracePeriodDays}d grace)` : ""}
          </span>
        </div>
      )}
    </div>
  );
}
