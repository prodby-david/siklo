import React from "react";
import { ShieldCheck, Target, Award, CheckCircle2 } from "lucide-react";
import type { SaverReliabilityCardProps } from "../types/analytics.types";

export default function SaverReliabilityCard({
  stats,
}: SaverReliabilityCardProps) {
  const score =
    stats.hasHistory && stats.onTimeReliabilityPercent !== undefined
      ? stats.onTimeReliabilityPercent
      : 100;
  const isExcellent = score >= 90;

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-card shadow-xs space-y-4 hover:border-neutral-border/90 transition-all flex flex-col justify-between w-full">
      <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between border-b border-neutral-border/60 pb-3.5 gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-foreground leading-tight truncate">
              Saver Discipline & Standing
            </h3>
            <span className="text-[10px] text-neutral-subtext block truncate">
              Track record of on-time contributions
            </span>
          </div>
        </div>

        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider shrink-0 ${
            isExcellent
              ? "border-success/30 bg-success-bg text-success"
              : "border-warning/30 bg-warning-bg text-warning"
          }`}
        >
          {isExcellent ? "Excellent Standing" : "Needs Attention"}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-bold text-neutral-subtext">
            On-Time Payment Reliability
          </span>
          <span className="text-2xl font-black text-foreground tabular-nums">
            {stats.hasHistory && stats.onTimeReliabilityPercent !== undefined ? `${score}%` : "100%"}
          </span>
        </div>

        <div className="w-full bg-neutral-table-stripe rounded-full h-2.5 border border-neutral-border/60 overflow-hidden">
          <div
            className="bg-brand-accent h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/30 flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-card border border-neutral-border/60 shrink-0">
            <Target className="w-4 h-4 text-brand-accent" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-neutral-subtext block uppercase tracking-wider truncate">
              Active Cycles
            </span>
            <span className="text-sm font-black text-foreground tabular-nums block">
              {stats.activeCyclesCount}
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/30 flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-card border border-neutral-border/60 shrink-0">
            <Award className="w-4 h-4 text-winner-payout" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-neutral-subtext block uppercase tracking-wider truncate">
              Completed
            </span>
            <span className="text-sm font-black text-foreground tabular-nums block truncate">
              {stats.completedCyclesCount} {stats.completedCyclesCount === 1 ? "Cycle" : "Cycles"}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/40 flex items-center justify-between text-xs text-neutral-subtext">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
          Verified across all joined circles
        </span>
      </div>
    </div>
  );
}
