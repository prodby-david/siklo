import React from "react";
import { TrendingUp, ShieldCheck, PieChart } from "lucide-react";
import type { AnalyticsHeaderProps } from "../types/analytics.types";

export default function AnalyticsHeader({ stats }: AnalyticsHeaderProps) {
  const isPositive = stats.netBalance >= 0;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-neutral-border/60">
      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground">
            Financial Analytics & Roadmap
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed">
          Track your paluwagan savings velocity, annual payout roadmap, and net cashflow standing.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <div className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-neutral-border/70 bg-neutral-table-stripe text-neutral-subtext text-xs font-bold">
          <PieChart className="w-3.5 h-3.5 text-brand-accent shrink-0" />
          <span>{stats.activeGroupsCount} Active {stats.activeGroupsCount === 1 ? "Circle" : "Circles"}</span>
        </div>

        {stats.hasHistory && stats.onTimeReliabilityPercent !== undefined && (
          <div className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-success/30 bg-success-bg text-success text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{stats.onTimeReliabilityPercent}% Reliability</span>
          </div>
        )}

        <div className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border text-xs font-bold ${
          isPositive
            ? "border-success/30 bg-success-bg text-success"
            : "border-neutral-border bg-neutral-table-stripe text-neutral-subtext"
        }`}>
          <span>Net: {isPositive ? `+₱${stats.netBalance.toLocaleString()}` : `-₱${Math.abs(stats.netBalance).toLocaleString()}`}</span>
        </div>
      </div>
    </div>
  );
}
