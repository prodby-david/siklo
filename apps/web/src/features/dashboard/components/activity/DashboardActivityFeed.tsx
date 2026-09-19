"use client";

import Link from "next/link";
import {
  Activity,
  Clock,
  Megaphone,
  CreditCard,
  RotateCw,
  Users,
  ArrowRight,
} from "lucide-react";
import { formatDateTime12h } from "@/shared/utils/formatDate";
import { DashboardActivityFeedProps } from "../../types/dashboard.types";

export default function DashboardActivityFeed({
  activities,
}: DashboardActivityFeedProps) {
  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-card shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground leading-tight">
              Recent Activity
            </h3>
            <span className="text-[10px] text-neutral-subtext">
              Updates across your circles
            </span>
          </div>
        </div>

        <Link
          href="/group"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-accent hover:underline cursor-pointer"
        >
          <span>View Groups</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="py-8 px-4 rounded-2xl border border-dashed border-neutral-border/80 text-center flex flex-col items-center justify-center gap-1.5 bg-neutral-table-stripe/20">
          <Clock className="w-5 h-5 text-neutral-subtext" />
          <p className="text-xs font-bold text-foreground">No Recent Activity</p>
          <p className="text-[10px] text-neutral-subtext max-w-xs">
            Activity updates will show up as members contribute and turns are completed.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {activities.slice(0, 4).map((act) => {
            const isPayment = act.type === "PAYMENT";
            const isAnnouncement = act.type === "ANNOUNCEMENT";
            const isJoin = act.type === "JOIN";

            const Icon = isAnnouncement
              ? Megaphone
              : isPayment
                ? CreditCard
                : isJoin
                  ? Users
                  : RotateCw;

            const badgeStyle = isPayment
              ? "bg-success-bg text-success border-success/25"
              : isAnnouncement
                ? "bg-warning-bg text-warning border-warning/25"
                : isJoin
                  ? "bg-brand-accent/10 text-brand-accent border-brand-accent/20"
                  : "bg-brand-accent/15 text-brand-accent border-brand-accent/25";

            const typeLabel = isPayment
              ? "Payment"
              : isAnnouncement
                ? "Notice"
                : isJoin
                  ? "Member"
                  : "Rotation";

            return (
              <div
                key={act.id}
                className="p-3 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe/30 hover:bg-neutral-table-stripe/60 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold shrink-0 ${badgeStyle}`}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      {typeLabel}
                    </span>
                    <Link
                      href={`/group/${act.groupId}`}
                      className="text-[11px] font-bold text-foreground truncate hover:text-brand-accent transition-colors"
                    >
                      {act.groupName}
                    </Link>
                  </div>
                  <span className="text-[9px] font-medium text-neutral-subtext shrink-0 tabular-nums">
                    {formatDateTime12h(act.date)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pl-0.5">
                  <p className="text-xs text-neutral-subtext leading-snug font-medium capitalize">
                    {act.text.toLowerCase()}
                  </p>
                  <Link
                    href={`/group/${act.groupId}`}
                    className="inline-flex items-center gap-0.5 text-[10px] font-bold text-brand-accent hover:underline shrink-0"
                  >
                    <span>Circle</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
