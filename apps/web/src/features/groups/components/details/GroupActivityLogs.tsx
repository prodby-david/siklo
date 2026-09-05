"use client";

import { formatDateTime12h } from "@/shared/utils/formatDate";
import useGetGroupActivities from "@/features/groups/hooks/useGetGroupActivities";
import useGroupSocket from "@/features/groups/hooks/useGroupSocket";
import { useMemo } from "react";
import { Activity, Loader2, Megaphone, Clock } from "lucide-react";
import {
  mapApiActivitiesToEvents,
  buildDerivedEvents,
} from "../../utils/groupActivity";
import { GroupActivityLogsProps } from "../../types/group-activity.types";

export default function GroupActivityLogs({
  group,
  memberships,
  isCycleDone = false,
}: GroupActivityLogsProps) {
  const { data: activities = [], isLoading } = useGetGroupActivities(group.id);
  const { isConnected } = useGroupSocket(group.id);

  const organizer = memberships?.find(
    (m) => m.userId === group.organizerId,
  )?.user;
  const organizerName = organizer?.name || "Organizer";

  const events = useMemo(() => {
    const derived = buildDerivedEvents(group, memberships, organizerName);
    const apiEvents = mapApiActivitiesToEvents(activities);
    const merged = [...derived, ...apiEvents];
    merged.sort((a, b) => b.date.getTime() - a.date.getTime());
    return merged;
  }, [group, memberships, organizerName, activities]);

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-background shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              Group Activity Logs
            </h3>
            <span className="text-[11px] text-neutral-subtext">
              Real-time ledger events & turn updates
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected && !isCycleDone ? (
            <span className="flex items-center gap-1 rounded-full border border-success/25 bg-success-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Live Sync
            </span>
          ) : (
            <span className="text-[10px] font-bold text-neutral-subtext bg-neutral-table-stripe px-2 py-0.5 rounded-full border border-neutral-border/60">
              {events.length} Events
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-neutral-subtext">
          <Loader2 className="w-5 h-5 animate-spin text-brand-accent" />
          <span className="text-xs font-semibold">Loading activity timeline...</span>
        </div>
      ) : events.length === 0 ? (
        <div className="py-10 px-4 rounded-2xl border border-dashed border-neutral-border text-center flex flex-col items-center justify-center gap-1.5">
          <Clock className="w-5 h-5 text-neutral-subtext" />
          <p className="text-xs font-bold text-foreground">No Activities Yet</p>
          <p className="text-[11px] text-neutral-subtext">
            Group activity updates and payment transactions will appear here.
          </p>
        </div>
      ) : (
        <div className="relative max-h-[380px] overflow-y-auto pr-1 space-y-3 no-scrollbar">
          {events.map((event) => {
            const Icon = event.icon;
            const isAnnouncement = event.type === "ANNOUNCEMENT";

            if (isAnnouncement) {
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 shadow-2xs"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent text-brand-accent-foreground shadow-2xs">
                    <Megaphone className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-accent flex items-center gap-1">
                      <Megaphone className="w-3 h-3" /> Announcement
                    </span>
                    <p className="text-xs font-bold text-foreground leading-relaxed">
                      {event.text}
                    </p>
                    <span className="text-[10px] font-medium text-neutral-subtext">
                      {formatDateTime12h(event.date)}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-2xl border border-neutral-border/60 bg-background hover:border-neutral-border hover:bg-neutral-table-stripe/30 transition-all shadow-2xs"
              >
                <span
                  className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${event.iconColor}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground leading-relaxed">
                    {event.text}
                  </p>
                  <span className="text-[10px] font-medium text-neutral-subtext">
                    {formatDateTime12h(event.date)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
