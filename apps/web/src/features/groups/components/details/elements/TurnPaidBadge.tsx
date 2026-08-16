import { CheckCircle2, ShieldCheck } from "lucide-react";
import { TurnPaidBadgeProps } from "@/features/groups/types/showcase.types";

export default function TurnPaidBadge({
  currentCycle,
  isOrganizer = false,
}: TurnPaidBadgeProps) {
  return (
    <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-emerald-600 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
      {isOrganizer ? (
        <ShieldCheck className="w-4 h-4" />
      ) : (
        <CheckCircle2 className="w-4 h-4" />
      )}
      <span>
        {isOrganizer
          ? `Marked as Paid for Cycle #${currentCycle}`
          : `Your Contribution is Paid (Cycle #${currentCycle})`}
      </span>
    </div>
  );
}
