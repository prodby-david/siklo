"use client";

import { useState, useMemo } from "react";
import useGetGroup from "./useGetGroup";
import type { GroupFilterStatus, ExtendedGroup } from "../types/group.types";
import { calculateGroupCounts, filterGroupsByStatus } from "../utils/groupFilter";

export function useGroupList() {
  const [filter, setFilter] = useState<GroupFilterStatus>("ALL");
  const { data: allGroups = [], isLoading } = useGetGroup("ALL");

  const counts = useMemo(
    () => calculateGroupCounts(allGroups as ExtendedGroup[]),
    [allGroups],
  );

  const displayGroups = useMemo(
    () => filterGroupsByStatus(allGroups as ExtendedGroup[], filter),
    [allGroups, filter],
  );

  return {
    filter,
    setFilter,
    counts,
    displayGroups,
    isLoading,
  };
}
