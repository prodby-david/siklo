import React from "react";
import Link from "next/link";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface ActiveGroupsCardProps {
  count: number;
  nextContributionAmount?: number;
  groupName?: string;
  groupId?: string;
}

export default function ActiveGroupsCard({
  count,
  nextContributionAmount = 0,
  groupName,
  groupId,
}: ActiveGroupsCardProps) {
  const hasContribution = nextContributionAmount > 0;
  const targetHref = groupId ? `/group/${groupId}` : "/group";

  return (
    <div className="p-6 border border-neutral-border rounded-2xl w-full bg-background shadow-sm hover:border-brand-accent/30 transition-all duration-300 col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
            Next Contribution Due
          </span>
          <p
            className={`text-3xl font-extrabold tracking-tight mt-1 ${
              hasContribution ? "text-foreground" : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {hasContribution
              ? `₱${nextContributionAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}`
              : "No Due"}
          </p>
          {hasContribution ? (
            <div className="flex items-center gap-1.5 mt-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-2xl text-[11px] font-semibold border border-amber-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {count} Active {count === 1 ? "Group" : "Groups"}
                {groupName ? ` • ${groupName}` : ""}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-2xl text-[11px] font-semibold border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {count > 0
                  ? "No Pending Due • All Payments Clear"
                  : "No Active Groups"}
              </span>
            </div>
          )}
        </div>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${
            hasContribution ? "bg-amber-500/10" : "bg-emerald-500/10"
          }`}
        >
          {hasContribution ? (
            <Clock className="w-6 h-6 text-amber-500" />
          ) : (
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/50 flex items-center justify-between">
        <Link
          href={targetHref}
          className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-accent hover:text-brand-accent-hover transition-colors cursor-pointer group"
        >
          <span>View Turn Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
