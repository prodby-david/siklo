"use client";

import { Activity, PlusCircle, UserPlus, Play } from "lucide-react";
import formatDate from "@/shared/utils/formatDate";

interface User {
  id: string;
  name: string;
}

interface Membership {
  userId: string;
  position: number;
  joinedAt?: string | Date;
  user: User;
}

interface Group {
  id: string;
  name: string;
  organizerId: string;
  createdAt: string | Date;
  startDate?: string | Date | null;
}

interface GroupActivityLogsProps {
  group: Group;
  memberships?: Membership[];
}

interface LogEvent {
  id: string;
  type: string;
  text: string;
  date: Date;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export default function GroupActivityLogs({
  group,
  memberships,
}: GroupActivityLogsProps) {
  const organizer = memberships?.find((m) => m.userId === group.organizerId)?.user;
  const organizerName = organizer?.name || "Organizer";

  const events: LogEvent[] = [];

  events.push({
    id: "create",
    type: "create",
    text: `Group "${group.name}" was created by ${organizerName}`,
    date: new Date(group.createdAt),
    icon: PlusCircle,
    iconColor: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  });

  if (memberships) {
    memberships.forEach((m) => {
      events.push({
        id: `join-${m.userId}`,
        type: "join",
        text: `${m.user.name} joined the group (Slot #${m.position})`,
        date: new Date(m.joinedAt || group.createdAt),
        icon: UserPlus,
        iconColor: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
      });
    });
  }

  if (group.startDate) {
    events.push({
      id: "start",
      type: "start",
      text: `Cycle started by ${organizerName}`,
      date: new Date(group.startDate),
      icon: Play,
      iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    });
  }

  events.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="p-6 border border-neutral-border rounded-2xl bg-background shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3">
        <h3 className="text-md font-bold text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-accent" /> Group Activity Logs
        </h3>
        <span className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider bg-neutral-subtext/5 px-2.5 py-1 rounded-2xl border border-neutral-border/50">
          {events.length} Events
        </span>
      </div>

      <div className="relative pl-6 border-l border-neutral-border/60 space-y-6 ml-3">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative flex flex-col gap-1">
              <span className={`absolute -left-[37px] top-0.5 w-6.5 h-6.5 rounded-full border flex items-center justify-center ${event.iconColor}`}>
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
    </div>
  );
}
