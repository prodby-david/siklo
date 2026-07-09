import useGetCurrentName from "@/features/users/hooks/useGetCurrentName";
import useGetGroup from "@/features/groups/hooks/useGetGroup";

interface Group {
  id: string;
  name: string;
  description: string | null;
  contributionAmount: number;
  billingCycle: "DAILY" | "WEEKLY" | "BIMONTHLY" | "MONTHLY" | "QUARTERLY";
  cycleDuration: number;
  maxMembers: number;
  inviteCode: string;
  organizerId: string;
  startDate: string;
  createdAt: string;
  _count: {
    memberships: number;
  };
}

export function useDashboardData() {
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();
  const { data: groups = [], isLoading: isGroupsLoading } = useGetGroup();

  const firstName = user?.name?.split(" ")[0] || "User";

  const totalPayoutPool = groups.reduce(
    (sum: number, group: Group) =>
      sum + group.contributionAmount * group.maxMembers * group.cycleDuration,
    0
  );

  const totalMonthlyContributions = groups.reduce(
    (sum: number, group: Group) => {
      const amt = group.contributionAmount;
      switch (group.billingCycle) {
        case "DAILY":
          return sum + amt * 30;
        case "WEEKLY":
          return sum + amt * 4;
        case "BIMONTHLY":
          return sum + amt * 2;
        case "MONTHLY":
          return sum + amt;
        case "QUARTERLY":
          return sum + amt / 3;
        default:
          return sum + amt;
      }
    },
    0
  );

  const sortedActiveGroups = [...groups].sort(
    (a: Group, b: Group) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const nearestGroup = sortedActiveGroups[0] || null;

  const nextPayoutAmount = nearestGroup
    ? nearestGroup.contributionAmount * nearestGroup.maxMembers
    : 0;

  const nextPayoutDate = nearestGroup
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
