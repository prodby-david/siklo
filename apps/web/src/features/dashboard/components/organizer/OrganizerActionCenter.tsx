"use client";

import Link from "next/link";
import {
  Crown,
  ShieldCheck,
  HandCoins,
  Play,
  ArrowRight,
} from "lucide-react";
import type { OrganizerActionCenterProps } from "../../types/dashboard.types";

export default function OrganizerActionCenter({
  tasks,
}: OrganizerActionCenterProps) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <section className="w-full rounded-3xl border border-neutral-border bg-card p-5 sm:p-6 shadow-xs hover:border-neutral-border/90 transition-all space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              Organizer Command Center
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-subtext mt-0.5">
              Administrative actions requiring your review across managed circles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center rounded-full border border-neutral-border/60 bg-neutral-table-stripe px-3 py-1 text-[10px] font-bold text-neutral-subtext">
            {tasks.length} Action{tasks.length > 1 ? "s" : ""} Required
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tasks.map((task) => {
          const isVerify = task.type === "VERIFY_PAYMENTS";
          const isDisburse = task.type === "DISBURSE_PAYOUT";

          const Icon = isVerify ? ShieldCheck : isDisburse ? HandCoins : Play;

          const badgeClasses = isVerify
            ? "border-warning/30 bg-warning-bg text-warning"
            : isDisburse
              ? "border-winner-payout/30 bg-winner-payout-bg text-winner-payout"
              : "border-brand-accent/30 bg-brand-accent/10 text-brand-accent";

          const badgeLabel = isVerify
            ? "Proof Verification"
            : isDisburse
              ? "Ready for Payout"
              : "Roster Filled";

          return (
            <div
              key={task.id}
              className="flex flex-col justify-between gap-3.5 p-4 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/30 hover:border-neutral-border hover:bg-card transition-all shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${badgeClasses}`}
                  >
                    {badgeLabel}
                  </span>
                  <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-card border border-neutral-border/60 shrink-0">
                    <Icon className="w-3.5 h-3.5 text-foreground" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black text-foreground truncate">
                    {task.groupName}
                  </h3>
                  <p className="text-[11px] text-neutral-subtext leading-relaxed mt-0.5">
                    {isVerify && (
                      <>
                        {task.count} payment proof{(task.count || 0) > 1 ? "s" : ""}{" "}
                        awaiting verification
                        {task.amount ? ` (₱${task.amount.toLocaleString()})` : ""}.
                      </>
                    )}
                    {isDisburse && (
                      <>
                        Turn #{task.turnNumber} pooled sum of ₱
                        {task.amount?.toLocaleString()} is ready to disburse to{" "}
                        <span className="font-bold text-foreground">
                          {task.recipientName}
                        </span>
                        .
                      </>
                    )}
                    {!isVerify && !isDisburse && (
                      <>
                        All {task.count} slots filled. Group is ready to start
                        Cycle #1.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <Link
                href={task.actionUrl}
                className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover shadow-xs active:scale-98 transition-all group cursor-pointer"
              >
                <span>{task.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
