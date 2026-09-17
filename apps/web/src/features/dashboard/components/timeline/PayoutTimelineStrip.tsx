"use client";

import Link from "next/link";
import { CalendarDays, ArrowRight, Award } from "lucide-react";
import type { PayoutTimelineStripProps } from "../../types/dashboard.types";

export default function PayoutTimelineStrip({
  milestones,
}: PayoutTimelineStripProps) {
  if (!milestones || milestones.length === 0) return null;

  const totalProjected = milestones.reduce(
    (sum, item) => sum + item.payoutAmount,
    0,
  );

  return (
    <section className="w-full rounded-3xl border border-neutral-border bg-card p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-border/60 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-winner-payout-bg text-winner-payout border border-winner-payout/25 shrink-0">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              Annual Payout Roadmap
            </h2>
            <p className="text-[11px] text-neutral-subtext">
              Projected lump-sum payouts across all your paluwagan savings circles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-neutral-subtext bg-neutral-table-stripe px-3 py-1 rounded-full border border-neutral-border/60">
            Total Pool:{" "}
            <span className="font-black text-foreground">
              ₱{totalProjected.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-stretch gap-3.5 overflow-x-auto pb-2 scrollbar-thin">
        {milestones.map((milestone) => {
          const dateObj = new Date(milestone.targetDate);
          const monthStr = dateObj.toLocaleDateString("en-US", {
            month: "short",
          });
          const dayStr = dateObj.getDate();
          const yearStr = dateObj.getFullYear();

          const isCurrent = milestone.status === "CURRENT";
          const isDisbursed = milestone.status === "DISBURSED";
          const isReceived = milestone.status === "RECEIVED";

          const badgeClasses = isCurrent || isDisbursed
            ? "border-winner-payout/30 bg-winner-payout-bg text-winner-payout"
            : isReceived
              ? "border-neutral-border bg-neutral-table-stripe text-neutral-subtext"
              : "border-neutral-border bg-neutral-table-stripe/60 text-neutral-subtext";

          const badgeLabel = isCurrent
            ? "Receiving Now"
            : isDisbursed
              ? "Ready to Claim"
              : isReceived
                ? "Received"
                : "Scheduled";

          return (
            <div
              key={milestone.id}
              className={`min-w-[260px] sm:min-w-[280px] max-w-[320px] flex-1 flex flex-col justify-between p-4 rounded-2xl border transition-all shadow-2xs ${
                isCurrent
                  ? "border-winner-payout/40 bg-winner-payout-bg/15"
                  : isDisbursed
                    ? "border-winner-payout/30 bg-card hover:border-winner-payout/50"
                    : "border-neutral-border/70 bg-neutral-table-stripe/30 hover:border-neutral-border"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-card border border-neutral-border/70 text-center shrink-0 shadow-2xs">
                      <span className="text-[9px] font-black uppercase text-winner-payout leading-none">
                        {monthStr}
                      </span>
                      <span className="text-xs font-black text-foreground leading-tight">
                        {dayStr}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-medium text-neutral-subtext leading-none">
                        {yearStr}
                      </span>
                      <span className="text-xs font-black text-foreground truncate mt-0.5">
                        {milestone.groupName}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border shrink-0 ${badgeClasses}`}
                  >
                    {badgeLabel}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-semibold text-neutral-subtext uppercase tracking-wider block">
                    Expected Lump Sum
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-black text-foreground tracking-tight">
                      ₱{milestone.payoutAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-subtext mt-0.5">
                    Turn #{milestone.turnNumber} of {milestone.totalTurns} •{" "}
                    {milestone.billingCycle.toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-border/40 mt-3">
                <Link
                  href={`/group/${milestone.groupId}`}
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-neutral-subtext hover:text-foreground transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-winner-payout" />
                    View Circle
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-neutral-subtext group-hover:text-foreground" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
