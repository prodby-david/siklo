"use client";

import { ShieldCheck, Award, HandCoins, CheckCircle2 } from "lucide-react";
import { SaverHealthTrackerCardProps } from "../../types/dashboard.types";

export default function SaverHealthTrackerCard({
  stats,
}: SaverHealthTrackerCardProps) {
  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-background shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground leading-tight">
              Saver Reliability & Growth
            </h3>
            <span className="text-[10px] text-neutral-subtext">
              Paluwagan savings health score
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3 h-3" /> {stats.onTimeReliabilityPercent}% On-Time
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3 h-3 text-emerald-500" /> Payouts Collected
          </span>
          <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
            ₱{stats.totalSavingsCollected.toLocaleString()}
          </p>
        </div>

        <div className="p-3 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
            <HandCoins className="w-3 h-3 text-brand-accent" /> Contributed
          </span>
          <p className="text-base font-black text-foreground">
            ₱{stats.totalContributionsPaid.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="p-3 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe/20 flex items-center justify-between text-xs">
        <span className="text-neutral-subtext font-semibold">
          Completed Paluwagan Rotations
        </span>
        <span className="font-extrabold text-foreground">
          {stats.completedCyclesCount} Cycles Finished
        </span>
      </div>
    </div>
  );
}
