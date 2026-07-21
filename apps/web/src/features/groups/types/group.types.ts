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
  billingCycle: string;
  contributionAmount: number;
  maxMembers: number;
  cycleDuration: number;
  payoutSequence: string;
}

export interface GroupHeroProps {
  name: string;
  description: string | null;
  billingCycle: string;
  inviteCode: string;
  copied: boolean;
  onCopyInviteCode: () => void;
  hasStarted?: boolean;
}

export interface GroupRotationSlotsProps {
  maxMembers: number;
  membershipsCount: number;
  memberships?: Membership[];
}

export interface GroupStatsGridProps {
  contributionAmount: number;
  maxMembers: number;
  cycleDuration: number;
  billingCycle: string;
  membershipsCount: number;
  totalPayout: number;
  totalRounds: number;
}
