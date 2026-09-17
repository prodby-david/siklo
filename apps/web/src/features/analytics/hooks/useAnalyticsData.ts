"use client";

import { useMemo } from "react";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import useGetGroup from "@/features/groups/hooks/useGetGroup";
import type { Group } from "@/features/groups/types/group.types";
import {
  deriveDashboardInsights,
  derivePayoutTimeline,
} from "@/features/dashboard/utils/dashboardAgenda";
import type { AnalyticsDataResult } from "../types/analytics.types";

const MONTHLY_MULTIPLIER: Record<string, number> = {
  DAILY: 30,
  WEEKLY: 4.33,
  BIWEEKLY: 2.16,
  SEMI_MONTHLY: 2,
  MONTHLY: 1,
  QUARTERLY: 1 / 3,
};

export function useAnalyticsData(): AnalyticsDataResult {
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();
  const { data: groups = [], isLoading: isGroupsLoading } = useGetGroup();

  const totalPayoutPool = useMemo(() => {
    return groups.reduce(
      (sum: number, group: Group) =>
        sum + group.contributionAmount * group.maxMembers * group.cycleDuration,
      0,
    );
  }, [groups]);

  const totalMonthlyContributions = useMemo(() => {
    return groups.reduce((sum: number, group: Group) => {
      const amt = group.contributionAmount;
      const multiplier = MONTHLY_MULTIPLIER[group.billingCycle] ?? 1;
      return sum + amt * multiplier;
    }, 0);
  }, [groups]);

  const perTurnContribution = useMemo(() => {
    return groups.reduce(
      (sum: number, group: Group) => sum + group.contributionAmount,
      0,
    );
  }, [groups]);

  const primaryBillingCycle = groups.length === 1 ? groups[0]?.billingCycle : "";

  const insights = useMemo(() => {
    return deriveDashboardInsights(groups, user?.id || "");
  }, [groups, user?.id]);

  const payoutTimeline = useMemo(() => {
    return derivePayoutTimeline(groups, user?.id || "");
  }, [groups, user?.id]);

  const netBalance =
    insights.healthStats.totalSavingsCollected -
    insights.healthStats.totalContributionsPaid;

  const stats = useMemo(() => {
    return {
      ...insights.healthStats,
      totalPayoutPool,
      totalMonthlyContributions,
      perTurnContribution,
      primaryBillingCycle,
      activeGroupsCount: groups.length,
      netBalance,
    };
  }, [
    insights.healthStats,
    totalPayoutPool,
    totalMonthlyContributions,
    perTurnContribution,
    primaryBillingCycle,
    groups.length,
    netBalance,
  ]);

  return {
    stats,
    payoutTimeline,
    isLoading: isUserLoading || isGroupsLoading,
  };
}
