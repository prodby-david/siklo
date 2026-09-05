"use client";

import { useState } from "react";
import { Layers, Flame, Clock, CheckCircle2 } from "lucide-react";
import useGetGroup from "@/features/groups/hooks/useGetGroup";
import Loader from "@/shared/components/loader/Loader";
import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";
import JoinGroupModal from "@/features/groups/components/modals/JoinGroupModal";
import EmptyGroupState from "@/features/dashboard/components/EmptyGroupState";
import GroupCardItem from "@/features/groups/components/cards/GroupCardItem";
import { ExtendedGroup } from "@/features/groups/types/group.types";

export default function ShowGroup() {
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "PENDING" | "COMPLETED">("ALL");
  const { data: allGroups = [], isLoading } = useGetGroup("ALL");

  if (isLoading) {
    return <Loader />;
  }

  const allCount = allGroups.length;
  const activeCount = allGroups.filter(
    (g: ExtendedGroup) => Boolean(g.startDate) && !g.isCycleDone,
  ).length;
  const pendingCount = allGroups.filter(
    (g: ExtendedGroup) => !g.startDate && !g.isCycleDone,
  ).length;
  const completedCount = allGroups.filter(
    (g: ExtendedGroup) => Boolean(g.isCycleDone),
  ).length;

  const displayGroups = allGroups.filter((g: ExtendedGroup) => {
    if (filter === "ACTIVE") return Boolean(g.startDate) && !g.isCycleDone;
    if (filter === "PENDING") return !g.startDate && !g.isCycleDone;
    if (filter === "COMPLETED") return Boolean(g.isCycleDone);
    return true;
  });

  return (
    <main className="flex-1 bg-neutral-subtext/5 p-6 md:p-10 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              My Savings Groups
            </h1>
            <p className="text-sm text-neutral-subtext">
              Manage your active Paluwagan cycles and review your completed groups.
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <JoinGroupModal />
            <CreateGroupButton />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-b border-neutral-border/60 pb-3 w-full">
          <button
            onClick={() => setFilter("ALL")}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
              filter === "ALL"
                ? "bg-brand-accent text-brand-accent-foreground border-brand-accent shadow-sm"
                : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Groups ({allCount})</span>
          </button>
          <button
            onClick={() => setFilter("ACTIVE")}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
              filter === "ACTIVE"
                ? "bg-brand-accent text-brand-accent-foreground border-brand-accent shadow-sm"
                : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Active ({activeCount})</span>
          </button>
          <button
            onClick={() => setFilter("PENDING")}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
              filter === "PENDING"
                ? "bg-brand-accent text-brand-accent-foreground border-brand-accent shadow-sm"
                : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending ({pendingCount})</span>
          </button>
          <button
            onClick={() => setFilter("COMPLETED")}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
              filter === "COMPLETED"
                ? "bg-brand-accent text-brand-accent-foreground border-brand-accent shadow-sm"
                : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed ({completedCount})</span>
          </button>
        </div>

        {displayGroups.length === 0 ? (
          <EmptyGroupState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayGroups.map((group: ExtendedGroup) => (
              <GroupCardItem key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
