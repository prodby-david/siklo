"use client";

import useGetGroup from "../../../groups/hooks/useGetGroup";
import { Group, ExtendedGroup } from "../../types/groups";
import { PhilippinePeso, FolderOpen, Users } from "lucide-react";
import Link from "next/link";
import EmptyGroupState from "../EmptyGroupState";
import Loader from "@/shared/components/loader/Loader";

export default function CycleCards() {
  const { data, isLoading } = useGetGroup();

  if (isLoading) {
    return <Loader text="Retrieving your groups..." />;
  }

  if (data.length === 0) {
    return <EmptyGroupState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-3">
      {data.slice(0, 2).map((group: Group) => {
        const extendedGroup = group as ExtendedGroup;
        const membershipsCount = extendedGroup._count?.memberships || 1;
        const percentFilled = Math.min(
          100,
          (membershipsCount / extendedGroup.maxMembers) * 100,
        );

        return (
          <div
            key={extendedGroup.id}
            className="flex flex-col justify-between gap-4 border border-neutral-border rounded-2xl p-6 bg-background shadow-sm hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-accent">
                  {extendedGroup.billingCycle} Cycle
                </span>
                <span className="text-[10px] text-neutral-subtext font-medium bg-neutral-subtext/5 px-2 py-0.5 rounded-2xl border border-neutral-border/50">
                  {extendedGroup.cycleDuration} rotation(s)
                </span>
              </div>

              <div className="space-y-1">
                <p className="font-extrabold text-base text-foreground group-hover:text-brand-accent transition-colors duration-200">
                  {extendedGroup.name}
                </p>
                {extendedGroup.description && (
                  <p className="text-xs text-neutral-subtext line-clamp-1">
                    {extendedGroup.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1 border-t border-neutral-border/50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                    Contribution Amount
                  </span>
                  <p className="flex items-center gap-0.5 font-bold text-sm text-foreground mt-0.5">
                    <PhilippinePeso className="w-3.5 h-3.5" />
                    {Number(extendedGroup.contributionAmount).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                    Total Members
                  </span>
                  <p className="flex items-center gap-0.5 font-bold text-sm text-foreground mt-0.5">
                    {extendedGroup._count?.memberships}
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3 h-3 text-neutral-subtext" /> Joined
                    Members
                  </span>
                  <span className="font-bold text-foreground">
                    {membershipsCount} / {extendedGroup.maxMembers}
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
              className="mt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-background bg-brand-accent hover:bg-brand-accent-hover px-4 py-2.5 rounded-2xl transition-all duration-200 active:scale-95 text-center cursor-pointer shadow-sm"
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
