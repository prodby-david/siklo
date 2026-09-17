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
  const isGoodStanding = !stats.hasHistory || score >= 90;

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-card shadow-xs hover:border-neutral-border/90 transition-all flex flex-col justify-between gap-4 w-full">
      <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3.5 gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-foreground leading-tight truncate">
              Saver Discipline
            </h3>
            <span className="text-[10px] text-neutral-subtext block truncate">
              On-time payment record
            </span>
          </div>
        </div>

        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider shrink-0 ${
            isGoodStanding
              ? "border-success/30 bg-success-bg text-success"
              : "border-warning/30 bg-warning-bg text-warning"
          }`}
        >
          {isGoodStanding ? "Good Standing" : "Needs Attention"}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
            On-Time Reliability
          </span>
          <span className="text-2xl sm:text-3xl font-black text-foreground tabular-nums">
            {score}%
          </span>
        </div>

        <div className="w-full bg-neutral-table-stripe rounded-full h-2 border border-neutral-border/60 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isGoodStanding ? "bg-brand-accent" : "bg-warning"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5 truncate">
            <Target className="h-3.5 w-3.5 text-brand-accent shrink-0" />
            <span className="truncate">Active</span>
          </span>
          <p className="text-sm sm:text-base font-black text-foreground tabular-nums truncate">
            {stats.activeCyclesCount} {stats.activeCyclesCount === 1 ? "Cycle" : "Cycles"}
          </p>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5 truncate">
            <Award className="h-3.5 w-3.5 text-winner-payout shrink-0" />
            <span className="truncate">Completed</span>
          </span>
          <p className="text-sm sm:text-base font-black text-foreground tabular-nums truncate">
            {stats.completedCyclesCount} {stats.completedCyclesCount === 1 ? "Cycle" : "Cycles"}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/50 flex items-center justify-between text-xs text-neutral-subtext">
        <span className="flex items-center gap-1.5 font-medium truncate">
          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
          <span>Verified across circles</span>
        </span>
      </div>
    </div>
  );
}
