"use client";

import Link from "next/link";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SavingsFlowCardProps } from "../../types/dashboard.types";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { hasUsablePaymentAccount } from "@/shared/utils/hasUsablePaymentAccount";

export default function SavingsFlowCard({ stats }: SavingsFlowCardProps) {
  const { data: user } = useGetCurrentName();
  const isAccountSetup = hasUsablePaymentAccount(user?.paymentAccounts);

  const netBalance = stats.totalSavingsCollected - stats.totalContributionsPaid;
  const isPositive = netBalance >= 0;

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-card shadow-xs space-y-4 w-full flex flex-col justify-between">
      <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between border-b border-neutral-border/60 pb-3.5 gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl border bg-brand-accent/15 text-brand-accent border-brand-accent/25 shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-foreground leading-tight truncate">
              Paluwagan Cashflow
            </h3>
            <span className="text-[10px] text-neutral-subtext block truncate">
              Personal contribution & payout summary
            </span>
          </div>
        </div>

        {isAccountSetup ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success-bg px-2.5 py-1 text-[10px] font-bold text-success shrink-0">
            <CheckCircle2 className="w-3 h-3" /> Payout Ready
          </span>
        ) : (
          <Link
            href="/settings"
            className="inline-flex items-center gap-1 rounded-full border border-warning/25 bg-warning-bg px-2.5 py-1 text-[10px] font-bold text-warning transition-colors hover:opacity-80 shrink-0"
          >
            <AlertCircle className="w-3 h-3" /> Setup Payout
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5 truncate">
            <ArrowDownLeft className="h-3.5 w-3.5 text-success shrink-0" />
            <span>Payouts Received</span>
          </span>
          <p className="text-base sm:text-lg font-black text-success tabular-nums break-words">
            ₱{stats.totalSavingsCollected.toLocaleString()}
          </p>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5 truncate">
            <ArrowUpRight className="h-3.5 w-3.5 text-brand-accent shrink-0" />
            <span>Total Contributed</span>
          </span>
          <p className="text-base sm:text-lg font-black text-foreground tabular-nums break-words">
            ₱{stats.totalContributionsPaid.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="p-3 sm:p-3.5 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe/20 flex items-center justify-between text-xs gap-3">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider truncate">
            Net Standing
          </span>
          <span
            className={`text-xs font-black tabular-nums truncate ${
              isPositive
                ? "text-success"
                : "text-neutral-subtext"
            }`}
          >
            {isPositive
              ? `+₱${netBalance.toLocaleString()}`
              : `-₱${Math.abs(netBalance).toLocaleString()}`}
          </span>
        </div>
        <div className="text-right flex flex-col min-w-0">
          <span className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider truncate">
            Finished Cycles
          </span>
          <span className="text-xs font-extrabold text-foreground tabular-nums truncate">
            {stats.completedCyclesCount === 1
              ? "1 Cycle"
              : `${stats.completedCyclesCount} Cycles`}
          </span>
        </div>
      </div>
    </div>
  );
}
