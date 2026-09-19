import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import useGetGroup from "@/features/groups/hooks/useGetGroup";
import { usePendingPayments } from "@/features/payments/hooks/usePendingPayments";
import { fetchNearestDue } from "../api/fetchNearestDue";
import {
  deriveDashboardInsights,
  deriveContributionDueStatus,
  deriveOrganizerTasks,
} from "../utils/dashboardAgenda";
import { Group } from "@/features/groups/types/group.types";

const MONTHLY_MULTIPLIER: Record<string, number> = {
  DAILY: 30,
  WEEKLY: 4,
  BIMONTHLY: 2,
  MONTHLY: 1,
  QUARTERLY: 1 / 3,
};

export function useDashboardData() {
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();
  const { data: groups = [], isLoading: isGroupsLoading } = useGetGroup();
  const { isLoading: isPendingPaymentsLoading } =
    usePendingPayments(undefined, Boolean(user?.id));

  const { data: nearestDue, isLoading: isNearestDueLoading } = useQuery({
    queryKey: ["nearest-due"],
    queryFn: fetchNearestDue,
    refetchInterval: 30000,
  });

  const firstName = user?.name?.split(" ")[0] || "User";

  const totalPayoutPool = groups.reduce(
    (sum: number, group: Group) =>
      sum + group.contributionAmount * group.maxMembers * group.cycleDuration,
    0,
  );

  const totalMonthlyContributions = groups.reduce(
    (sum: number, group: Group) => {
      const amt = group.contributionAmount;
      const multiplier = MONTHLY_MULTIPLIER[group.billingCycle] ?? 1;
      return sum + amt * multiplier;
    },
    0,
  );

  const perTurnContribution = groups.reduce(
    (sum: number, group: Group) => sum + group.contributionAmount,
    0,
  );

  const primaryBillingCycle = groups.length === 1 ? groups[0]?.billingCycle : "";

  const dueGroupName =
    nearestDue?.dueGroupName || nearestDue?.nearestGroupName || "";
  const dueGroupId =
    nearestDue?.dueGroupId || nearestDue?.nearestGroupId || "";
  const nextContributionAmount = nearestDue?.nextContributionAmount || 0;
  const activeGroupsCount = nearestDue?.activeGroupsCount ?? groups.length;
  const nearestDueDate = nearestDue?.nearestDueDate || null;

  const dueGroup = useMemo(
    () => groups.find((g: Group) => g.id === dueGroupId),
    [groups, dueGroupId],
  );

  const { paymentStatus: dueContributionStatus, daysOverdue: dueDaysOverdue } =
    useMemo(
      () =>
        deriveContributionDueStatus(
          dueGroup,
          nearestDueDate,
          user?.id,
          nextContributionAmount,
        ),
      [dueGroup, nearestDueDate, user?.id, nextContributionAmount],
    );

  const nextPayoutDate = nearestDue?.nextPayoutDate || null;
  const nextPayoutAmount = nearestDue?.nextPayoutAmount || 0;
  const nextPayoutGroupName = nearestDue?.nextPayoutGroupName || "";
  const nextPayoutGroupId = nearestDue?.nextPayoutGroupId || "";

  const insights = useMemo(() => {
    return deriveDashboardInsights(
      groups,
      user?.id || "",
    );
  }, [groups, user?.id]);

  const organizerTasks = useMemo(() => {
    return deriveOrganizerTasks(groups, user?.id || "");
  }, [groups, user?.id]);

  return {
    firstName,
    groups,
    alerts: insights.alerts,
    organizerTasks,
    agenda: insights.agenda,
    healthStats: insights.healthStats,
    activities: insights.activities,
    isLoading:
      isUserLoading ||
      isGroupsLoading ||
      isNearestDueLoading ||
      isPendingPaymentsLoading,
    stats: {
      totalPayoutPool,
      totalMonthlyContributions,
      perTurnContribution,
      primaryBillingCycle,
      nextPayoutAmount,
      nextPayoutDate,
      nextPayoutGroupName,
      nextPayoutGroupId,
      dueGroupName,
      dueGroupId,
      nearestGroupName: dueGroupName,
      nearestGroupId: dueGroupId,
      nearestDueDate,
      activeGroupsCount,
      nextContributionAmount,
      dueContributionStatus,
      dueDaysOverdue,
    },
  };
}
