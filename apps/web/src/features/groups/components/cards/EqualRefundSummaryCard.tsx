"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Gift, CheckCircle } from "lucide-react";
import { api } from "@/shared/lib/axios";

interface EqualRefundSummaryCardProps {
  groupId: string;
}

export default function EqualRefundSummaryCard({
  groupId,
}: EqualRefundSummaryCardProps) {
  const [summary, setSummary] = useState<{
    enableBackupFund: boolean;
    totalBackupCollected: number;
    totalPenaltiesCollected: number;
    totalMembers: number;
    refundPerMember: number;
    hasZeroDefaults: boolean;
  } | null>(null);

  useEffect(() => {
    api
      .get(`/groups/${groupId}/backup-fund/summary`)
      .then((res) => setSummary(res.data))
      .catch(() => setSummary(null));
  }, [groupId]);

  if (!summary || !summary.enableBackupFund || summary.refundPerMember === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-3xl border border-brand-accent/30 bg-gradient-to-r from-brand-accent/15 via-background to-brand-accent/10 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-accent/20 border border-brand-accent/30 text-brand-accent flex items-center justify-center">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <span>Untouched Reserve Savings Rebate</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </h3>
            <p className="text-[10px] text-neutral-subtext">
              Equal backup fund refund for perfect circle record
            </p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          100% On-Time Record
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-background border border-neutral-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-neutral-subtext uppercase tracking-wider font-bold">
            Total Reserve Pool Collected
          </span>
          <span className="text-lg font-black text-foreground">
            ₱{summary.totalBackupCollected.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col text-left sm:text-right">
          <span className="text-[10px] text-neutral-subtext uppercase tracking-wider font-bold">
            Equal Refund Per Member
          </span>
          <span className="text-lg font-black text-brand-accent flex items-center gap-1 sm:justify-end">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            ₱{summary.refundPerMember.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
