import { useQuery } from "@tanstack/react-query";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import useGetGroup from "@/features/groups/hooks/useGetGroup";
import { fetchNearestDue } from "../api/fetchNearestDue";
import { ExtendedGroup as Group } from "../types/groups.types";

const MONTHLY_MULTIPLIER: Record<Group["billingCycle"], number> = {
  DAILY: 30,
  WEEKLY: 4,
  BIMONTHLY: 2,
  MONTHLY: 1,
  QUARTERLY: 1 / 3,
};

export function useDashboardData() {
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();
  const { data: groups = [], isLoading: isGroupsLoading } = useGetGroup();

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

  const nextPayoutDate = nearestDue?.nextPayoutDate || null;
  const nextPayoutAmount = nearestDue?.nextPayoutAmount || 0;
  const nextPayoutGroupName = nearestDue?.nextPayoutGroupName || "";
  const nextPayoutGroupId = nearestDue?.nextPayoutGroupId || "";

  return {
    firstName,
    groups,
    isLoading: isUserLoading || isGroupsLoading || isNearestDueLoading,
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
    },
  };
}
