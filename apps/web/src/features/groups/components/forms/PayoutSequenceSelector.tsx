import React from "react";
import { Shuffle, ListOrdered, Touchpad } from "lucide-react";
import { PayoutSequenceSelectorProps } from "../../types/create-group-field.types";

export default function PayoutSequenceSelector({
  selectedSequence,
  isPending,
  onSelectSequence,
}: PayoutSequenceSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
        Payout Sequence Method
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          disabled={isPending}
          onClick={() => onSelectSequence("RANDOM")}
          className={`p-3 text-left rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedSequence === "RANDOM"
              ? "bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xs"
              : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40"
          }`}
        >
          <div className="flex items-center gap-2">
            <Shuffle className="w-4 h-4 text-brand-accent shrink-0" />
            <span className="text-xs font-extrabold text-foreground">
              Random
            </span>
          </div>
          <span className="text-[10px] text-neutral-subtext leading-tight block">
            Positions are randomly shuffled when cycle starts.
          </span>
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => onSelectSequence("MANUAL")}
          className={`p-3 text-left rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedSequence === "MANUAL"
              ? "bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xs"
              : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40"
          }`}
        >
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-brand-accent shrink-0" />
            <span className="text-xs font-extrabold text-foreground">
              First Come
            </span>
          </div>
          <span className="text-[10px] text-neutral-subtext leading-tight block">
            First-come, first-served based on order of joining.
          </span>
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => onSelectSequence("FREECHOOSING")}
          className={`p-3 text-left rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedSequence === "FREECHOOSING"
              ? "bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xs"
              : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40"
          }`}
        >
          <div className="flex items-center gap-2">
            <Touchpad className="w-4 h-4 text-brand-accent shrink-0" />
            <span className="text-xs font-extrabold text-foreground">
              Free Choice
            </span>
          </div>
          <span className="text-[10px] text-neutral-subtext leading-tight block">
            Members choose their vacant turn slot when joining.
          </span>
        </button>
      </div>
    </div>
  );
}
