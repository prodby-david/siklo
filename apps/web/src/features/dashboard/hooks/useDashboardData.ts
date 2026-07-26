import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import useGetGroup from "@/features/groups/hooks/useGetGroup";
import { ExtendedGroup as Group } from "../types/groups";

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

  const sortedActiveGroups = [...groups].sort((a: Group, b: Group) => {
    const timeA = a.startDate ? new Date(a.startDate).getTime() : 0;
    const timeB = b.startDate ? new Date(b.startDate).getTime() : 0;
    return timeA - timeB;
  });

  const nearestGroup = sortedActiveGroups[0] || null;

  const nextPayoutAmount = nearestGroup
    ? nearestGroup.contributionAmount * nearestGroup.maxMembers
    : 0;

  const nextPayoutDate = nearestGroup && nearestGroup.startDate
    ? new Date(nearestGroup.startDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const nearestGroupName = nearestGroup ? nearestGroup.name : "";

  return {
    firstName,
    groups,
    isLoading: isUserLoading || isGroupsLoading,
    stats: {
      totalPayoutPool,
      totalMonthlyContributions,
      nextPayoutAmount,
      nextPayoutDate,
      nearestGroupName,
      activeGroupsCount: groups.length,
    },
  };
}
