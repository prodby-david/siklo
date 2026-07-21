import { Group, Membership, LogEvent } from "../types/group.activity.types";
import { UserPlus, PlusCircle } from "lucide-react";

export function buildDerivedEvents(
  group: Group,
  memberships: Membership[] | undefined,
  organizerName: string,
): LogEvent[] {
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
        iconColor:
          "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
      });
    });
  }

  return events;
}
