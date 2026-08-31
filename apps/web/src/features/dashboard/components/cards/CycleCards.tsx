"use client";

import useGetGroup from "../../../groups/hooks/useGetGroup";
import { Group, ExtendedGroup } from "../../types/groups.types";
import { PhilippinePeso, FolderOpen, Users, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import EmptyGroupState from "../EmptyGroupState";
import Loader from "@/shared/components/loader/Loader";

interface CycleCardsProps {
  statusFilter?: string;
}

export default function CycleCards({ statusFilter = "ACTIVE" }: CycleCardsProps) {
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
        const membershipsCount = extendedGroup._count?.memberships ?? 0;
        const percentFilled = Math.min(
          100,
          Math.round((membershipsCount / extendedGroup.maxMembers) * 100),
        );
        const hasStarted = Boolean(extendedGroup.startDate);

        return (
          <div
            key={extendedGroup.id}
            className="flex flex-col justify-between gap-4 border border-neutral-border rounded-3xl p-5 bg-background shadow-xs hover:border-brand-accent/40 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-brand-accent">
                  {extendedGroup.billingCycle} Cycle
                </span>
                <span className="text-[10px] text-neutral-subtext font-semibold bg-neutral-table-stripe px-2 py-0.5 rounded-full border border-neutral-border/60 flex items-center gap-1">
                  {hasStarted ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Active
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-amber-500" /> Forming
                    </>
                  )}
                </span>
              </div>

              <div className="space-y-1">
                <p className="font-extrabold text-base text-foreground truncate">
                  {extendedGroup.name}
                </p>
                {extendedGroup.description && (
                  <p className="text-xs text-neutral-subtext line-clamp-1">
                    {extendedGroup.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-border/60">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                    Contribution
                  </span>
                  <p className="flex items-center gap-0.5 font-black text-sm text-foreground mt-0.5">
                    <PhilippinePeso className="w-3.5 h-3.5" />
                    {Number(extendedGroup.contributionAmount).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                    Pool Total
                  </span>
                  <p className="flex items-center gap-0.5 font-black text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <PhilippinePeso className="w-3.5 h-3.5" />
                    {(
                      Number(extendedGroup.contributionAmount) *
                      extendedGroup.maxMembers
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-neutral-subtext flex items-center gap-1">
                    <Users className="w-3 h-3 text-brand-accent" /> Members ({membershipsCount}/{extendedGroup.maxMembers})
                  </span>
                  <span className="font-bold text-foreground">
                    {percentFilled}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-brand-accent h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentFilled}%` }}
                  />
                </div>
              </div>
            </div>

            <Link
              href={`/group/${extendedGroup.id}`}
              className="mt-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-brand-accent hover:bg-brand-accent-hover px-4 py-2.5 rounded-2xl transition-all duration-150 active:scale-95 text-center cursor-pointer shadow-2xs"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Open Group</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
