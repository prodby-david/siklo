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
import JoinGroupModal from "@/features/groups/components/modals/JoinGroupModal";
import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";

export default function SavingsFlowCard({ stats }: SavingsFlowCardProps) {
  const { data: user } = useGetCurrentName();
  const isAccountSetup = hasUsablePaymentAccount(user?.paymentAccounts);

  const netBalance = stats.totalSavingsCollected - stats.totalContributionsPaid;
  const isPositive = netBalance >= 0;

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-background shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl border bg-brand-accent/15 text-brand-accent border-brand-accent/25">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground leading-tight">
              Paluwagan Cashflow
            </h3>
            <span className="text-[10px] text-neutral-subtext">
              Personal contribution & payout summary
            </span>
          </div>
        </div>

        {isAccountSetup ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success-bg px-2.5 py-1 text-[10px] font-bold text-success">
            <CheckCircle2 className="w-3 h-3" /> Payout Ready
          </span>
        ) : (
          <Link
            href="/settings"
            className="inline-flex items-center gap-1 rounded-full border border-warning/25 bg-warning-bg px-2.5 py-1 text-[10px] font-bold text-warning transition-colors hover:opacity-80"
          >
            <AlertCircle className="w-3 h-3" /> Setup Payout
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
            <ArrowDownLeft className="h-3.5 w-3.5 text-success" /> Payouts
            Received
          </span>
          <p className="text-base font-black text-success">
            ₱{stats.totalSavingsCollected.toLocaleString()}
          </p>
        </div>

        <div className="p-3 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/40 space-y-1">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-accent" /> Total
            Contributed
          </span>
          <p className="text-base font-black text-foreground">
            ₱{stats.totalContributionsPaid.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="p-3 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe/20 flex items-center justify-between text-xs">
        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider">
            Net Standing
          </span>
          <span
            className={`text-xs font-black ${
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
        <div className="text-right flex flex-col">
          <span className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider">
            Finished Cycles
          </span>
          <span className="text-xs font-extrabold text-foreground">
            {stats.completedCyclesCount === 1
              ? "1 Cycle"
              : `${stats.completedCyclesCount} Cycles`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <JoinGroupModal />
        <CreateGroupButton />
      </div>
    </div>
  );
}
