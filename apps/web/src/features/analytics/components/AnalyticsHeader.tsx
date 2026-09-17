import React from "react";
import { TrendingUp, ShieldCheck, PieChart } from "lucide-react";
import type { AnalyticsHeaderProps } from "../types/analytics.types";

export default function AnalyticsHeader({ stats }: AnalyticsHeaderProps) {
  const isPositive = stats.netBalance >= 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-border/50">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Financial Analytics & Roadmap
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-neutral-subtext">
          Track your paluwagan savings velocity, annual payout roadmap, and net cashflow standing.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-border/70 bg-neutral-table-stripe text-neutral-subtext text-[11px] font-bold">
          <PieChart className="w-3.5 h-3.5 text-brand-accent" />
          <span>{stats.activeGroupsCount} Active {stats.activeGroupsCount === 1 ? "Circle" : "Circles"}</span>
        </div>

        {stats.hasHistory && stats.onTimeReliabilityPercent !== undefined && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-success/30 bg-success-bg text-success text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{stats.onTimeReliabilityPercent}% Reliability</span>
          </div>
        )}

        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold ${
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
