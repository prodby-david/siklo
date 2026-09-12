import { Calendar, CheckCircle2, HandCoins, Award } from "lucide-react";
import type { TurnDetailHeaderProps } from "@/features/groups/types/showcase.types";

export default function TurnDetailHeader({
  selectedTurn,
  hasStarted,
  isSelectedTurnReceived,
  isSelectedTurnDisbursed,
  isCurrentBeneficiary,
  currentCycle,
}: TurnDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-black uppercase tracking-wider text-brand-accent bg-brand-accent/15 px-3 py-1 rounded-xl border border-brand-accent/25">
          Turn Details #{selectedTurn}
        </span>
        {hasStarted && isSelectedTurnReceived && (
          <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-success">
            <CheckCircle2 className="h-3 w-3 text-success" /> Received
          </span>
        )}
        {hasStarted && isSelectedTurnDisbursed && !isSelectedTurnReceived && (
          <span className="flex items-center gap-1 rounded-full border border-winner-payout/30 bg-winner-payout-bg px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-winner-payout">
            <HandCoins className="h-3 w-3 text-winner-payout" /> Disbursed
          </span>
        )}
        {hasStarted && isCurrentBeneficiary && (
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-accent bg-brand-accent/15 border border-brand-accent/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3 text-brand-accent" /> Receiving Now
          </span>
        )}
      </div>
      <span className="text-xs text-neutral-subtext font-bold flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-neutral-subtext" /> Cycle{" "}
        {currentCycle} Payout
      </span>
    </div>
  );
}
