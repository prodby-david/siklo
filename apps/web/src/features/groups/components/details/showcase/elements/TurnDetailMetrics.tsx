import formatDate from "@/shared/utils/formatDate";
import type { TurnDetailMetricsProps } from "@/features/groups/types/showcase.types";

export default function TurnDetailMetrics({
  selectedTurn,
  maxMembers,
  poolTotal,
  calculatedPayoutDate,
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
    </div>
  );
}
