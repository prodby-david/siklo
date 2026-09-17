"use client";

import Link from "next/link";
import { CalendarDays, ArrowRight, Award, Check } from "lucide-react";
import type { PayoutTimelineStripProps } from "../../types/dashboard.types";

export default function PayoutTimelineStrip({
  milestones,
}: PayoutTimelineStripProps) {
  if (!milestones || milestones.length === 0) {
    return (
      <section className="w-full rounded-3xl border border-neutral-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-3 py-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-foreground">
            No Upcoming Payout Milestones
          </h3>
          <p className="text-xs text-neutral-subtext leading-relaxed">
            When you join or start a paluwagan circle, your scheduled turns and payout roadmap will appear here automatically.
          </p>
          <Link
            href="/group"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover transition-colors shadow-xs mt-2 cursor-pointer"
          >
            <span>Browse Circles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  const totalProjected = milestones.reduce(
    (sum, item) => sum + item.payoutAmount,
    0,
  );

  return (
    <section className="w-full rounded-3xl border border-neutral-border bg-card p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-border/60 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              Annual Payout Roadmap
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-subtext mt-0.5">
              Scheduled lump-sum payout milestones across your savings circles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-neutral-subtext bg-neutral-table-stripe px-3.5 py-1.5 rounded-full border border-neutral-border/60">
            Total Projected Pool:{" "}
            <span className="font-black text-brand-accent tabular-nums">
              ₱{totalProjected.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-stretch min-w-max px-1">
          {milestones.map((milestone, idx) => {
            const dateObj = new Date(milestone.targetDate);
            const monthStr = dateObj.toLocaleDateString("en-US", {
              month: "short",
            });
            const dayStr = dateObj.getDate();
            const yearStr = dateObj.getFullYear();

            const isCurrent = milestone.status === "CURRENT";
            const isDisbursed = milestone.status === "DISBURSED";
            const isReceived = milestone.status === "RECEIVED";

            const badgeClasses = isCurrent
              ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
              : isDisbursed
                ? "border-winner-payout/30 bg-winner-payout-bg text-winner-payout"
                : isReceived
                  ? "border-success/30 bg-success-bg text-success"
                  : "border-neutral-border/70 bg-neutral-table-stripe text-neutral-subtext";

            const badgeLabel = isCurrent
              ? "Receiving Now"
              : isDisbursed
                ? "Ready to Claim"
                : isReceived
                  ? "Claimed"
                  : "Scheduled";

            const cardBorderClasses = isCurrent
              ? "border-brand-accent/40 bg-brand-accent/5 ring-1 ring-brand-accent/20 shadow-xs"
              : isDisbursed
                ? "border-winner-payout/35 bg-winner-payout-bg/15 shadow-xs"
                : isReceived
                  ? "border-neutral-border/70 bg-neutral-table-stripe/40"
                  : "border-neutral-border/70 bg-card hover:border-neutral-border";

            return (
              <div
                key={milestone.id}
                className="flex flex-col items-center w-[290px] sm:w-[320px] shrink-0"
              >
                <div className="relative w-full flex items-center justify-center">
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      idx === 0
                        ? "opacity-0"
                        : isReceived
                          ? "bg-success"
                          : isCurrent
                            ? "bg-brand-accent"
                            : "bg-neutral-border/80"
                    }`}
                  />

                  <div
                    className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 font-black text-xs shrink-0 transition-all ${
                      isReceived
                        ? "bg-success text-success-foreground border-success"
                        : isCurrent
                          ? "bg-brand-accent text-brand-accent-foreground border-brand-accent ring-4 ring-brand-accent/25 shadow-xs"
                          : isDisbursed
                            ? "bg-winner-payout text-white border-winner-payout ring-4 ring-winner-payout/25"
                            : "bg-card text-neutral-subtext border-neutral-border/80"
                    }`}
                  >
                    {isReceived ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      idx === milestones.length - 1
                        ? "opacity-0"
                        : isReceived
                          ? "bg-success"
                          : "bg-neutral-border/80"
                    }`}
                  />
                </div>

                <div
                  className={`w-0.5 h-3.5 transition-colors ${
                    isCurrent
                      ? "bg-brand-accent"
                      : isReceived
                        ? "bg-success"
                        : "bg-neutral-border/80"
                  }`}
                />

                <div
                  className={`w-[calc(100%-16px)] flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-all shadow-2xs ${cardBorderClasses}`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex flex-col items-center justify-center w-11 h-11 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-center shrink-0 shadow-2xs">
                          <span className="text-[9px] font-black uppercase tracking-wider text-brand-accent leading-none">
                            {monthStr}
                          </span>
                          <span className="text-sm font-black text-foreground leading-tight tabular-nums mt-0.5">
                            {dayStr}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-medium text-neutral-subtext leading-none">
                            Step #{idx + 1} • {yearStr}
                          </span>
                          <span className="text-xs font-black text-foreground truncate mt-1">
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
                        Target Lump Sum
                      </span>
                      <p
                        className={`text-2xl font-black tracking-tight tabular-nums mt-0.5 ${
                          isCurrent ? "text-brand-accent" : "text-foreground"
                        }`}
                      >
                        ₱{milestone.payoutAmount.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-neutral-subtext mt-1 truncate">
                        Turn #{milestone.turnNumber} of {milestone.totalTurns} •{" "}
                        {milestone.billingCycle.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-border/50 mt-3.5">
                    <Link
                      href={`/group/${milestone.groupId}`}
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-brand-accent hover:text-brand-accent-hover transition-colors group cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        View Circle
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
