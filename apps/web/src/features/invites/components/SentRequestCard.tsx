import React from "react";
import { Clock } from "lucide-react";
import { SentRequestCardProps } from "../types/invites.types";

export default function SentRequestCard({
  item,
  onCancel,
}: SentRequestCardProps) {
  return (
    <div className="p-6 bg-background border border-neutral-border rounded-2xl shadow-sm flex items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-500/15 text-amber-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending Approval
          </span>
        </div>
        <p className="font-extrabold text-base text-foreground">
          {item.name}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onCancel(item.id)}
        className="text-xs font-bold text-neutral-subtext hover:text-danger bg-neutral-table-stripe hover:bg-danger/10 py-2 px-3 rounded-2xl transition-all active:scale-95 cursor-pointer border border-neutral-border/50 shrink-0"
      >
        Cancel Request
      </button>
    </div>
  );
}
