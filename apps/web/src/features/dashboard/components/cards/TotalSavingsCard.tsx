import React from "react";
import Link from "next/link";
import { HandCoins, ArrowUpRight, ArrowRight } from "lucide-react";

interface TotalSavingsCardProps {
  totalPayoutPool: number;
  totalMonthlyContributions?: number;
  perTurnContribution?: number;
  primaryBillingCycle?: string;
  activeGroupsCount?: number;
}

export default function TotalSavingsCard({
  totalPayoutPool,
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
    <div className="p-6 border border-neutral-border rounded-2xl w-full bg-background shadow-sm hover:border-brand-accent/30 transition-all duration-300 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
            Total Payout Pool
          </span>
          <p className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
            ₱{totalPayoutPool.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 mt-2 bg-brand-accent/10 text-brand-accent px-2.5 py-1 rounded-2xl text-[11px] font-semibold border border-brand-accent/20">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>
              ₱{perTurnContribution.toLocaleString(undefined, { minimumFractionDigits: 2 })} {cycleLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-brand-accent/10 rounded-full shrink-0">
          <HandCoins className="w-6 h-6 text-brand-accent" />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/50 flex items-center justify-between">
        <Link
          href="/group"
          className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-accent hover:text-brand-accent-hover transition-colors cursor-pointer group"
        >
          <span>All Savings Groups</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
