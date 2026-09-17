import { Receipt } from "lucide-react";
import type { TurnDetailHistoryBarProps } from "@/features/groups/types/showcase.types";

export default function TurnDetailHistoryBar({
  paymentCount,
  onOpenHistory,
}: TurnDetailHistoryBarProps) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-neutral-border bg-card shadow-xs">
      <div className="flex items-center gap-2">
        <Receipt className="w-4 h-4 text-brand-accent" />
        <span className="text-xs font-bold text-foreground">
          Payment History
        </span>
      </div>
      <button
        type="button"
        onClick={onOpenHistory}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-accent/25 bg-brand-accent/10 hover:bg-brand-accent/20 text-xs font-bold text-brand-accent transition-all cursor-pointer active:scale-95 shadow-2xs"
      >
        <span>View Records ({paymentCount})</span>
      </button>
    </div>
  );
}
