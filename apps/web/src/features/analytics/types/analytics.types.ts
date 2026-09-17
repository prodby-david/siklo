import type { PayoutMilestoneItem, SaverHealthStats } from "@/features/dashboard/types/dashboard.types";

export interface AnalyticsStats extends SaverHealthStats {
  totalPayoutPool: number;
  totalMonthlyContributions: number;
  perTurnContribution: number;
  primaryBillingCycle: string;
  activeGroupsCount: number;
  netBalance: number;
}

export interface AnalyticsHeaderProps {
  stats: AnalyticsStats;
}

export interface SaverReliabilityCardProps {
  stats: AnalyticsStats;
}

export interface AnalyticsDataResult {
  stats: AnalyticsStats;
  payoutTimeline: PayoutMilestoneItem[];
  isLoading: boolean;
}
