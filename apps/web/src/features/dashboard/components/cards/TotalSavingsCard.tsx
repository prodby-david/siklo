import React from "react";
import Link from "next/link";
import { HandCoins, ArrowUpRight, ArrowRight, TrendingUp } from "lucide-react";
import { TotalSavingsCardProps } from "../../types/dashboard.types";

export default function TotalSavingsCard({
  totalPayoutPool,
  totalMonthlyContributions = 0,
  perTurnContribution = 0,
  primaryBillingCycle = "",
  activeGroupsCount = 1,
}: TotalSavingsCardProps) {
  const cycleLabel = primaryBillingCycle
    ? `${primaryBillingCycle.toLowerCase()} contribution`
    : activeGroupsCount > 1
    ? `/ turn across ${activeGroupsCount} groups`
    : "/ turn";

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl w-full bg-card shadow-xs hover:border-neutral-border/90 transition-all flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3.5 gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <HandCoins className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-foreground leading-tight truncate">
              Total Payout Pool
            </h3>
            <span className="text-[10px] text-neutral-subtext block truncate">
              Accumulated pool value
            </span>
          </div>
        </div>

        <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-[10px] font-black uppercase tracking-wider shrink-0">
          {activeGroupsCount} {activeGroupsCount === 1 ? "Circle" : "Circles"}
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider block">
          Projected Pool Value
        </span>
        <p className="text-2xl sm:text-3xl font-black tracking-tight text-foreground tabular-nums break-words">
          ₱{totalPayoutPool.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5 truncate">
            <TrendingUp className="h-3.5 w-3.5 text-brand-accent shrink-0" />
            <span className="truncate">Monthly Pace</span>
          </span>
          <p className="text-sm sm:text-base font-black text-foreground tabular-nums truncate">
            ₱{totalMonthlyContributions.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5 truncate">
            <ArrowUpRight className="h-3.5 w-3.5 text-brand-accent shrink-0" />
            <span className="truncate">Per Turn</span>
          </span>
          <p className="text-sm sm:text-base font-black text-foreground tabular-nums truncate">
            ₱{perTurnContribution.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/50 flex items-center justify-between text-xs">
        <span className="text-[11px] text-neutral-subtext font-medium truncate">
          {cycleLabel}
        </span>
        <Link
          href="/group"
          className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-accent hover:text-brand-accent-hover transition-colors cursor-pointer group shrink-0"
        >
          <span>All Savings Groups</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
