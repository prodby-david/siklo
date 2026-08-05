"use client";

import formatDate, { formatDateTime12h } from "@/shared/utils/formatDate";
import useGetGroupActivities from "@/features/groups/hooks/useGetGroupActivities";
import useGroupSocket from "@/features/groups/hooks/useGroupSocket";
import { useMemo } from "react";
import { Activity, Loader2, Megaphone } from "lucide-react";
import { mapApiActivitiesToEvents } from "../../utils/mapApiActivitiesToEvents";
import { buildDerivedEvents } from "../../utils/mapDerivedEvents";
import { GroupActivityLogsProps } from "../../types/group.activity.types";

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
    <div className="p-6 border border-neutral-border rounded-2xl bg-background shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3">
        <h3 className="text-md font-bold text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-accent" /> Group Activity Logs
        </h3>
        <div className="flex items-center gap-2">
          {isConnected && !isCycleDone && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold uppercase tracking-wider bg-emerald-500/5 px-2 py-1 rounded-2xl border border-emerald-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-neutral-subtext" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-xs text-neutral-subtext text-center py-6">
          No activity recorded for this group yet.
        </p>
      ) : (
        <div className="relative max-h-[400px] overflow-y-auto pr-1 space-y-3">
          {events.map((event) => {
            const Icon = event.icon;
            const isAnnouncement = event.type === "ANNOUNCEMENT";

            if (isAnnouncement) {
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-brand-accent/15 via-indigo-500/10 to-brand-accent/5 border-2 border-brand-accent/40 shadow-sm"
                >
                  <span className="w-8 h-8 rounded-xl border border-brand-accent/40 bg-brand-accent text-background flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Megaphone className="w-4 h-4" />
                  </span>
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-accent flex items-center gap-1.5">
                      <Megaphone className="w-3.5 h-3.5 text-brand-accent" /> Official Announcement
                    </span>
                    <p className="text-xs font-bold text-foreground leading-relaxed">
                      {event.text}
                    </p>
                    <span className="text-[10px] font-semibold text-neutral-subtext">
                      {formatDateTime12h(event.date)}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={event.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-table-stripe/40 transition-colors"
              >
                <span
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${event.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
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
