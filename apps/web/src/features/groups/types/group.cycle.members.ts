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

export interface GroupCycleMembersProps {
  memberships?: Membership[];
  organizerId: string;
  startDate?: string | Date | null;
  billingCycle: string;
}
