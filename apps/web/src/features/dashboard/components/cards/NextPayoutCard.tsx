import React from "react";
import Link from "next/link";
import { Calendar, Banknote, ArrowRight } from "lucide-react";
import formatDate from "@/shared/utils/formatDate";
import { NextPayoutCardProps } from "../../types/dashboard.types";

export default function NextPayoutCard({
  expectedAmount,
  expectedDate,
  groupName,
  groupId,
}: NextPayoutCardProps) {
  const targetHref = groupId ? `/group/${groupId}` : "/group";
  const formattedDate = expectedDate ? formatDate(expectedDate) : null;

  return (
    <div className="h-full p-5 sm:p-6 border border-neutral-border rounded-3xl w-full bg-card shadow-xs hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 items-start min-w-0 flex-1">
          <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
            Next Expected Payout
          </span>
          <p className="text-3xl font-black tracking-tight text-brand-accent mt-1 tabular-nums">
            ₱{expectedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 mt-2 bg-brand-accent/10 text-brand-accent px-2.5 py-1 rounded-2xl text-[11px] font-semibold border border-brand-accent/20 max-w-full">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
              {expectedAmount > 0
                ? `${formattedDate || "Starting Soon"}${groupName ? ` • ${groupName}` : ""}`
                : "No Upcoming Payouts"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-12 h-12 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded-2xl shrink-0">
          <Banknote className="w-6 h-6" />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/50 min-h-[48px] flex items-center justify-between">
        <Link
          href={targetHref}
          className="h-9 inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-accent hover:text-brand-accent-hover transition-colors cursor-pointer group"
        >
          <span>View Payout Schedule</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
