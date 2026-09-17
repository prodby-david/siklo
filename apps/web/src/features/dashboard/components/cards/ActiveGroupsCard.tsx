import React from "react";
import Link from "next/link";
import { Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { ActiveGroupsCardProps } from "../../types/dashboard.types";

export default function ActiveGroupsCard({
  count,
  nextContributionAmount = 0,
  groupName,
  groupId,
  nearestDueDate,
  paymentStatus = "UPCOMING",
  daysOverdue = 0,
}: ActiveGroupsCardProps) {
  const hasContribution = nextContributionAmount > 0 && paymentStatus !== "PAID";
  const targetHref = groupId ? `/group/${groupId}` : "/group";

  const formattedDueDate = nearestDueDate
    ? new Date(nearestDueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  const isDelayed = paymentStatus === "DELAYED";
  const isPending = paymentStatus === "PENDING";
  const isPaid = paymentStatus === "PAID" || !hasContribution;

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl w-full bg-card shadow-xs hover:border-brand-accent/40 transition-all duration-300 col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 items-start min-w-0 flex-1">
          <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
            Next Contribution Due
          </span>
          <p
            className={`text-3xl font-black tracking-tight mt-1 tabular-nums ${
              isDelayed
                ? "text-warning"
                : isPaid
                  ? "text-success"
                  : "text-foreground"
            }`}
          >
            {hasContribution
              ? `₱${nextContributionAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}`
              : "All Settled"}
          </p>

          {isDelayed ? (
            <div className="mt-2 flex items-center gap-1.5 rounded-2xl border border-warning/30 bg-warning-bg px-2.5 py-1 text-[11px] font-semibold text-warning max-w-full">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
                {groupName ? `${groupName} • ` : ""}Delayed ({daysOverdue}d overdue)
              </span>
            </div>
          ) : isPending ? (
            <div className="mt-2 flex items-center gap-1.5 rounded-2xl border border-warning/25 bg-warning-bg px-2.5 py-1 text-[11px] font-semibold text-warning max-w-full">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
                {groupName ? `${groupName} • ` : ""}Verification Pending
              </span>
            </div>
          ) : isPaid ? (
            <div className="mt-2 flex items-center gap-1.5 rounded-2xl border border-success/25 bg-success-bg px-2.5 py-1 text-[11px] font-semibold text-success max-w-full">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {count > 0 ? "Contribution Paid & Clear" : "No Active Circles"}
              </span>
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-1.5 rounded-2xl border border-warning/25 bg-warning-bg px-2.5 py-1 text-[11px] font-semibold text-warning max-w-full">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
                {groupName ? `${groupName}` : "Due Soon"}
                {formattedDueDate ? ` • Due ${formattedDueDate}` : ""}
              </span>
            </div>
          )}
        </div>

        <div
          className={`flex items-center justify-center w-12 h-12 rounded-2xl border shrink-0 ${
            isDelayed || isPending || !isPaid
              ? "bg-warning-bg text-warning border-warning/30"
              : "bg-success-bg text-success border-success/30"
          }`}
        >
          {isDelayed ? (
            <AlertTriangle className="h-6 w-6" />
          ) : isPaid ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Clock className="h-6 w-6" />
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
