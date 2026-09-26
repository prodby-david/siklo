import { HandCoins, Users } from "lucide-react";
import type { GroupRoundsProgressBarsProps } from "@/features/groups/types/showcase.types";

export default function GroupRoundsProgressBars({
  currentTurn,
  verifiedPaymentsCount,
  maxMembers,
  progressPercent,
  organizerFeeAmount,
  paidOrganizerFeeCount,
  nonOrganizerCount,
  feeProgressPercent,
}: GroupRoundsProgressBarsProps) {
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-2xl border border-brand-accent/25 bg-brand-accent/5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-accent" /> Active Turn
            #{currentTurn} Contribution Progress
          </span>
          <span className="font-black text-brand-accent">
            {verifiedPaymentsCount} / {maxMembers} Paid
          </span>
        </div>
        <progress
          className="siklo-progress h-2 block"
          value={progressPercent}
          max={100}
          aria-label={`${verifiedPaymentsCount} of ${maxMembers} contributions completed`}
        />
      </div>

      {organizerFeeAmount > 0 && (
        <div className="space-y-2 rounded-2xl border border-warning/25 bg-warning-bg p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <HandCoins className="h-3.5 w-3.5 text-warning" /> One-Time
              Organizer Fee Progress (₱{organizerFeeAmount.toLocaleString()} /
              member)
            </span>
            <span className="font-black text-warning">
              {paidOrganizerFeeCount} / {nonOrganizerCount} Paid
            </span>
          </div>
          <progress
            className="siklo-progress siklo-progress-warning h-2 block"
            value={feeProgressPercent}
            max={100}
            aria-label={`${paidOrganizerFeeCount} of ${nonOrganizerCount} organizer fees paid`}
          />
        </div>
      )}
    </div>
  );
}
