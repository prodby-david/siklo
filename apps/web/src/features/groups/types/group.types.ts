export interface User {
  id: string;
  name: string;
  contactNumber?: string;
}

export interface Membership {
  userId: string;
  position: number;
  preferredPaymentMethod?: "E_WALLET" | "BANK_TRANSFER" | "CASH" | null;
  paymentAccountDetails?: string | null;
  joinedAt?: string | Date;
  user: User;
}

export interface Group {
  id: string;
  name: string;
  description?: string | null;
  inviteCode?: string;
  organizerId: string;
  organizer?: {
    id: string;
    name: string;
    contactNumber: string;
  };
  createdAt: string | Date;
  startDate?: string | Date | null;
  billingCycle: string;
  contributionAmount: number;
  maxMembers: number;
  cycleDuration: number;
  payoutSequence: string;
  gracePeriodDays?: number;
  latePenaltyAmount?: number;
  enableBackupFund?: boolean;
  backupFundPerTurn?: number;
  allowedPaymentMethods?: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
  paymentDetails?: string | null;
  memberships?: Membership[];
}

export interface GroupHeroProps {
  groupId?: string;
  name: string;
  description: string | null;
  billingCycle: string;
  inviteCode: string;
  copied: boolean;
  onCopyInviteCode: () => void;
  hasStarted?: boolean;
  isCycleDone?: boolean;
  isOrganizer?: boolean;
  allowedMethods?: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
  organizerPaymentDetails?: string | null;
  contributionAmount?: number;
  gracePeriodDays?: number;
  latePenaltyAmount?: number;
  backupFundAmount?: number;
  roundId?: string;
  currentMemberMethod?: "E_WALLET" | "BANK_TRANSFER" | "CASH" | null;
  currentMemberAccountDetails?: string | null;
  maxMembers?: number;
  payoutSequence?: string;
  enableBackupFund?: boolean;
  onRefresh?: () => void;
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
