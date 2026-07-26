import React from "react";
import { User, Membership, Group } from "./group.types";

export type { User, Membership, Group };

export interface ApiActivity {
  id: string;
  userId: string;
  groupId: string;
  activity: string;
  description: string;
  createdAt: string;
  user: { id: string; name: string };
}

export interface LogEvent {
  id: string;
  type: string;
  text: string;
  date: Date;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export interface GroupActivityLogsProps {
  group: Group;
  memberships?: Membership[];
}
