import React from "react";
import Link from "next/link";
import { Calendar, Banknote, Coins, ArrowRight } from "lucide-react";
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
    <div className="p-6 border border-transparent rounded-2xl w-full bg-brand-accent text-white shadow-md hover:bg-brand-accent-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-4">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Coins className="w-24 h-24 text-white" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col items-start gap-3 w-full">
          <span className="text-xs font-semibold text-white/85 uppercase tracking-wider">
            Next Payout
          </span>
          <div className="space-y-1 w-full">
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
              Expected Amount
            </p>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              ₱
              {expectedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            {groupName && (
              <p
                className="text-xs font-semibold text-white/95 truncate max-w-[200px]"
                title={groupName}
              >
                {groupName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 bg-white/15 border border-white/25 px-3 py-1 rounded-2xl text-[11px] font-semibold text-white">
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>
              {expectedAmount > 0
                ? formattedDate || "Cycle Starting Soon"
                : "No Upcoming Payouts"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full shrink-0">
          <Banknote className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="pt-3 border-t border-white/20 relative z-10 flex items-center justify-between">
        <Link
          href={targetHref}
          className="inline-flex items-center gap-1 text-[11px] font-extrabold text-white hover:text-white/80 transition-colors cursor-pointer group"
        >
          <span>View Payout Schedule</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-white" />
        </Link>
      </div>
    </div>
  );
}
