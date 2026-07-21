"use client";

import formatDate from "@/shared/utils/formatDate";
import useGetGroupActivities from "@/features/groups/hooks/useGetGroupActivities";
import useGroupSocket from "@/features/groups/hooks/useGroupSocket";
import { useMemo } from "react";
import { Activity, Loader2 } from "lucide-react";
import { mapApiActivitiesToEvents } from "../../utils/mapApiActivitiesToEvents";
import { buildDerivedEvents } from "../../utils/mapDerivedEvents";
import { GroupActivityLogsProps } from "../../types/group.activity.types";

export default function GroupActivityLogs({
  group,
  memberships,
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
          {isConnected && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold uppercase tracking-wider bg-emerald-500/5 px-2 py-1 rounded-2xl border border-emerald-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live
            </span>
          )}
          <span className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider bg-neutral-subtext/5 px-2.5 py-1 rounded-2xl border border-neutral-border/50">
            {events.length} Events
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-neutral-subtext" />
        </div>
      ) : (
        <div className="relative pl-6 border-l border-neutral-border/60 space-y-6 ml-3">
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <div key={event.id} className="relative flex flex-col gap-1">
                <span
                  className={`absolute -left-[37px] top-0.5 w-6.5 h-6.5 rounded-full border flex items-center justify-center ${event.iconColor}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <p className="text-xs font-medium text-foreground leading-relaxed">
                  {event.text}
                </p>
                <span className="text-[10px] text-neutral-subtext/75">
                  {formatDate(event.date)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
