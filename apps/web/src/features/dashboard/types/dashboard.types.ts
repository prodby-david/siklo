export interface DashboardWelcomeBannerProps {
  firstName: string;
}

export interface ActiveGroupsCardProps {
  count: number;
  nextContributionAmount?: number;
  groupName?: string;
  groupId?: string;
  nearestDueDate?: string | null;
}

export interface NextPayoutCardProps {
  expectedAmount: number;
  expectedDate: string | null;
  groupName: string;
  groupId?: string;
}

export interface TotalSavingsCardProps {
  totalPayoutPool: number;
  totalMonthlyContributions?: number;
  perTurnContribution?: number;
  primaryBillingCycle?: string;
  activeGroupsCount?: number;
}

export interface ActionAlertItem {
  id: string;
  type: "PAYMENT_DUE" | "PAYMENT_PENDING" | "ORGANIZER_VERIFY" | "CONFIRM_PAYOUT";
  title: string;
  subtitle: string;
  amount?: number;
  dueDate?: Date | string | null;
  groupId: string;
  groupName: string;
  actionUrl: string;
  actionLabel: string;
}

export interface RotationAgendaItem {
  id: string;
  groupId: string;
  groupName: string;
  type: "CONTRIBUTION_DUE" | "PAYOUT_SCHEDULED";
  amount: number;
  targetDate?: Date | string | null;
  turnNumber: number;
  maxMembers: number;
  status: "PENDING" | "PAID" | "VERIFIED" | "DISBURSED";
  billingCycle: string;
  isCurrentUserTurn: boolean;
}

export interface SaverHealthStats {
  totalSavingsCollected: number;
  totalContributionsPaid: number;
  activeCyclesCount: number;
  completedCyclesCount: number;
  onTimeReliabilityPercent: number;
}

export interface DashboardActivityItem {
  id: string;
  groupId: string;
  groupName: string;
  text: string;
  date: Date;
  type: "PAYMENT" | "ANNOUNCEMENT" | "CYCLE" | "JOIN";
}

export interface ActionRequiredBannerProps {
  alerts: ActionAlertItem[];
}

export interface RotationAgendaListProps {
  agenda: RotationAgendaItem[];
  isLoading?: boolean;
}

export interface SaverHealthTrackerCardProps {
  stats: SaverHealthStats;
}

export interface DashboardActivityFeedProps {
  activities: DashboardActivityItem[];
  isLoading?: boolean;
}
