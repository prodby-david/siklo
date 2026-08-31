"use client";

import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { ActionRequiredBannerProps } from "../types/dashboard.types";

export default function ActionRequiredBanner({
  alerts,
}: ActionRequiredBannerProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="w-full space-y-2">
      {alerts.map((alert) => {
        const isOrganizer = alert.type === "ORGANIZER_VERIFY";
        const isPayoutConfirm = alert.type === "CONFIRM_PAYOUT";

        const Icon = isOrganizer
          ? ShieldCheck
          : isPayoutConfirm
            ? ShieldCheck
            : Clock;

        const badgeColor = isPayoutConfirm
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
          : isOrganizer
            ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
            : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";

        const containerBg = isPayoutConfirm
          ? "bg-emerald-500/5 border-emerald-500/30"
          : isOrganizer
            ? "bg-indigo-500/5 border-indigo-500/30"
            : "bg-amber-500/5 border-amber-500/30";

        return (
          <div
            key={alert.id}
            className={`p-4 sm:p-4.5 rounded-2xl border ${containerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs`}
          >
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-background border border-neutral-border/60 shrink-0 mt-0.5 sm:mt-0">
                <Icon className="w-4 h-4 text-brand-accent" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}`}
                  >
                    Action Required
                  </span>
                  <span className="text-xs font-bold text-foreground truncate">
                    {alert.title}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-subtext leading-relaxed">
                  {alert.subtitle}
                </p>
              </div>
            </div>

            <Link
              href={alert.actionUrl}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-accent text-white hover:bg-brand-accent-hover text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 self-end sm:self-auto active:scale-95"
            >
              <span>{alert.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
