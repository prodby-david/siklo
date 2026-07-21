export interface User {
  id: string;
  name: string;
}

export interface Membership {
  userId: string;
  position: number;
  joinedAt?: string | Date;
  user: User;
}

export interface Group {
  id: string;
  name: string;
  organizerId: string;
  createdAt: string | Date;
  startDate?: string | Date | null;
}

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
