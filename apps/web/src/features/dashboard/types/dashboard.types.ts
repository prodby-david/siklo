import type { GroupFilterStatus } from "@/features/groups/types/group.types";

export interface DashboardWelcomeBannerProps {
  firstName: string;
}

export type ContributionDueStatus = "PAID" | "PENDING" | "DELAYED" | "UPCOMING";

export interface ActiveGroupsCardProps {
  count: number;
  nextContributionAmount?: number;
  groupName?: string;
  groupId?: string;
  nearestDueDate?: string | null;
  paymentStatus?: ContributionDueStatus;
  daysOverdue?: number;
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

export interface SavingsFlowStats {
  totalSavingsCollected: number;
  totalContributionsPaid: number;
  activeCyclesCount: number;
  completedCyclesCount: number;
  onTimeReliabilityPercent?: number;
  hasHistory?: boolean;
}

export type SaverHealthStats = SavingsFlowStats;

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

export interface SavingsFlowCardProps {
  stats: SavingsFlowStats;
}

export interface DashboardActivityFeedProps {
  activities: DashboardActivityItem[];
  isLoading?: boolean;
}

export interface CycleCardsProps {
  statusFilter?: string;
}

export interface EmptyGroupStateProps {
  filter?: GroupFilterStatus;
  title?: string;
  description?: string;
}

export type OrganizerTaskType = "VERIFY_PAYMENTS" | "DISBURSE_PAYOUT" | "START_CYCLE";

export interface OrganizerTaskItem {
  id: string;
  type: OrganizerTaskType;
  groupId: string;
  groupName: string;
  count?: number;
  amount?: number;
  recipientName?: string;
  turnNumber?: number;
  actionUrl: string;
  actionLabel: string;
}

export interface OrganizerActionCenterProps {
  tasks: OrganizerTaskItem[];
}

export type PayoutMilestoneStatus = "RECEIVED" | "DISBURSED" | "CURRENT" | "UPCOMING";

export interface PayoutMilestoneItem {
  id: string;
  groupId: string;
  groupName: string;
  turnNumber: number;
  totalTurns: number;
  payoutAmount: number;
  targetDate: Date;
  status: PayoutMilestoneStatus;
  billingCycle: string;
}

export interface PayoutTimelineStripProps {
  milestones: PayoutMilestoneItem[];
}
