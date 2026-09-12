import type { ExtendedGroup, GroupFilterStatus } from "../types/group.types";

export interface GroupCounts {
  allCount: number;
  activeCount: number;
  pendingCount: number;
  completedCount: number;
}

export function calculateGroupCounts(groups: ExtendedGroup[]): GroupCounts {
  const allCount = groups.length;
  const activeCount = groups.filter(
    (g) => Boolean(g.startDate) && !g.isCycleDone,
  ).length;
  const pendingCount = groups.filter(
    (g) => !g.startDate && !g.isCycleDone,
  ).length;
  const completedCount = groups.filter((g) => Boolean(g.isCycleDone)).length;

  return {
    allCount,
    activeCount,
    pendingCount,
    completedCount,
  };
}

export function filterGroupsByStatus(
  groups: ExtendedGroup[],
  status: GroupFilterStatus,
): ExtendedGroup[] {
  return groups.filter((g) => {
    if (status === "ACTIVE") return Boolean(g.startDate) && !g.isCycleDone;
    if (status === "PENDING") return !g.startDate && !g.isCycleDone;
    if (status === "COMPLETED") return Boolean(g.isCycleDone);
    return true;
  });
}
