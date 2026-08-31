"use client";

import Link from "next/link";
import {
  CalendarDays,
  Coins,
  ArrowRight,
  Clock,
  CheckCircle2,
  Award,
} from "lucide-react";
import formatDate from "@/shared/utils/formatDate";
import { RotationAgendaListProps } from "../../types/dashboard.types";

export default function RotationAgendaList({
  agenda,
}: RotationAgendaListProps) {
  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-background shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              My Rotation Agenda
            </h3>
            <span className="text-[11px] text-neutral-subtext">
              Active turn schedule and upcoming group milestones
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold text-neutral-subtext bg-neutral-table-stripe px-2.5 py-1 rounded-full border border-neutral-border/60">
          {agenda.length} Active {agenda.length === 1 ? "Turn" : "Turns"}
        </span>
      </div>

      {agenda.length === 0 ? (
        <div className="py-8 px-4 rounded-2xl border border-dashed border-neutral-border text-center flex flex-col items-center justify-center gap-1.5">
          <Clock className="w-5 h-5 text-neutral-subtext" />
          <p className="text-xs font-bold text-foreground">
            No Active Rotations Scheduled
          </p>
          <p className="text-[11px] text-neutral-subtext max-w-xs">
            Join or start a paluwagan cycle group to see your upcoming contribution dues and payout turns here.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {agenda.map((item) => {
            const isPayout = item.type === "PAYOUT_SCHEDULED";
            const formattedDate = item.targetDate
              ? formatDate(item.targetDate)
              : "Upcoming";

            return (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-2xl border border-neutral-border/80 hover:border-neutral-border bg-background hover:bg-neutral-table-stripe/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-xl border shrink-0 mt-0.5 sm:mt-0 ${
                      isPayout
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-brand-accent/15 border-brand-accent/30 text-brand-accent"
                    }`}
                  >
                    {isPayout ? (
                      <Award className="w-4.5 h-4.5" />
                    ) : (
                      <Coins className="w-4.5 h-4.5" />
                    )}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-extrabold text-foreground truncate">
                        {item.groupName}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-subtext bg-neutral-table-stripe px-2 py-0.5 rounded-md border border-neutral-border/50">
                        Turn #{item.turnNumber} of {item.maxMembers}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-subtext flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-foreground">
                        {isPayout ? "Expected Payout:" : "Your Contribution:"}
                      </span>
                      <span
                        className={`font-black ${
                          isPayout
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-foreground"
                        }`}
                      >
                        ₱{item.amount.toLocaleString()}
                      </span>
                      <span>• Target: {formattedDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {item.status === "PAID" ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                      <CheckCircle2 className="w-3 h-3" /> Paid
                    </span>
                  ) : isPayout ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                      <Award className="w-3 h-3" /> Recipient Turn
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl">
                      <Clock className="w-3 h-3" /> Open for Payment
                    </span>
                  )}

                  <Link
                    href={`/group/${item.groupId}`}
                    className="p-1.5 rounded-xl border border-neutral-border bg-background hover:bg-neutral-subtext/10 text-neutral-subtext hover:text-foreground transition-all cursor-pointer"
                    title="Open Group"
                  >
                    <ArrowRight className="w-4 h-4" />
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
