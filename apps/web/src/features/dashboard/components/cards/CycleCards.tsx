"use client";

import useGetGroup from "../../../groups/hooks/useGetGroup";
import { Group, ExtendedGroup } from "@/features/groups/types/group.types";
import EmptyGroupState from "../EmptyGroupState";
import Loader from "@/shared/components/loader/Loader";
import CycleCard from "./CycleCard";

interface CycleCardsProps {
  statusFilter?: string;
}

export default function CycleCards({ statusFilter = "ALL" }: CycleCardsProps) {
  const queryParam = statusFilter === "ALL" ? undefined : statusFilter;
  const { data = [], isLoading } = useGetGroup(queryParam);

  if (isLoading) {
    return <Loader text="Retrieving your groups..." />;
  }

  if (data.length === 0) {
    return <EmptyGroupState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {data.slice(0, 4).map((group: Group) => {
        const extendedGroup = group as ExtendedGroup;
        return <CycleCard key={extendedGroup.id} group={extendedGroup} />;
      })}
    </div>
  );
}
