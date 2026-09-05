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
    <div className="relative flex w-full flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-transparent bg-brand-accent p-6 text-brand-accent-foreground shadow-md transition-all duration-300 hover:bg-brand-accent-hover">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Coins className="h-24 w-24 text-brand-accent-foreground" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col items-start gap-3 w-full">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent-foreground/85">
            Next Payout
          </span>
          <div className="space-y-1 w-full">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-accent-foreground/70">
              Expected Amount
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-brand-accent-foreground">
              ₱
              {expectedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            {groupName && (
              <p
                className="max-w-[200px] truncate text-xs font-semibold text-brand-accent-foreground/95"
                title={groupName}
              >
                {groupName}
              </p>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-brand-accent-foreground/25 bg-brand-accent-foreground/15 px-3 py-1 text-[11px] font-semibold text-brand-accent-foreground">
            <Calendar className="h-3.5 w-3.5 text-brand-accent-foreground" />
            <span>
              {expectedAmount > 0
                ? formattedDate || "Cycle Starting Soon"
                : "No Upcoming Payouts"}
            </span>
          </div>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent-foreground/20">
          <Banknote className="h-6 w-6 text-brand-accent-foreground" />
        </div>
      </div>

      <div className="pt-3 border-t border-white/20 relative z-10 flex items-center justify-between">
        <Link
          href={targetHref}
          className="group inline-flex cursor-pointer items-center gap-1 text-[11px] font-extrabold text-brand-accent-foreground transition-colors hover:text-brand-accent-foreground/80"
        >
          <span>View Payout Schedule</span>
          <ArrowRight className="h-3.5 w-3.5 text-brand-accent-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
