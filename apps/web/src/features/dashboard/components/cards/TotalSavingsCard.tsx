import Link from "next/link";
import { HandCoins, ArrowUpRight, ArrowRight } from "lucide-react";
import { TotalSavingsCardProps } from "../../types/dashboard.types";

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
    <div className="h-full p-5 sm:p-6 border border-neutral-border rounded-3xl w-full bg-card shadow-xs hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 items-start min-w-0 flex-1">
          <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
            Total Payout Pool
          </span>
          <p className="text-3xl font-black tracking-tight text-foreground mt-1 tabular-nums">
            ₱{totalPayoutPool.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 mt-2 bg-neutral-table-stripe text-neutral-subtext px-2.5 py-1 rounded-2xl text-[11px] font-semibold border border-neutral-border/60 max-w-full">
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            <span className="truncate">
              ₱{perTurnContribution.toLocaleString(undefined, { minimumFractionDigits: 2 })} {cycleLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-12 h-12 bg-neutral-table-stripe text-brand-accent border border-neutral-border/60 rounded-2xl shrink-0">
          <HandCoins className="w-6 h-6" />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/50 min-h-[48px] flex items-center justify-between">
        <Link
          href="/group"
          className="h-9 inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-accent hover:text-brand-accent-hover transition-colors cursor-pointer group"
        >
          <span>All Savings Groups</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
