"use client";

import Link from "next/link";
import formatDate from "@/shared/utils/formatDate";
import { Group } from "@/features/dashboard/types/groups";
import { PhilippinePeso, LogIn, Users, Crown, UserCheck } from "lucide-react";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";

interface ExtendedGroup extends Omit<Group, "billingCycle"> {
  maxMembers: number;
  billingCycle: string;
  _count?: {
    memberships: number;
  };
  isCycleDone?: boolean;
}

export default function GroupCardItem({
  group,
}: {
  group: ExtendedGroup;
}) {
  const { data: currentUser } = useGetCurrentName();
  const isOrganizer = currentUser?.id === group.organizerId;

  const membershipsCount = group._count?.memberships ?? 0;
  const percentFilled = Math.min(
    100,
    (membershipsCount / group.maxMembers) * 100,
  );
  const isDateNull = group.startDate
    ? formatDate(group.startDate)
    : "Not yet started.";

  const isCycleDone = group.isCycleDone ?? false;

  return (
    <div
      key={group.id}
      className="flex flex-col justify-between gap-4 border border-neutral-border rounded-2xl p-5 bg-background shadow-sm hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                isOrganizer
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  : "bg-brand-accent/15 text-brand-accent border border-brand-accent/30"
              }`}
            >
              {isOrganizer ? (
                <>
                  <Crown className="w-2.5 h-2.5" /> Organizer
                </>
              ) : (
                <>
                  <UserCheck className="w-2.5 h-2.5" /> Member
                </>
              )}
            </span>
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-indigo-500">
              {group.billingCycle} Cycle
            </span>
            {!isCycleDone && group.startDate && (
              <span className="rounded-full bg-emerald-500/15 text-emerald-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest">
                Active
              </span>
            )}
          </div>
          <span className="text-[10px] text-neutral-subtext font-medium bg-neutral-subtext/5 px-2 py-0.5 rounded-2xl border border-neutral-border/50">
            {group.cycleDuration} rotation(s)
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-bold text-sm sm:text-base text-foreground group-hover:text-brand-accent transition-colors duration-200">
            {group.name}
          </p>
          {group.description && (
            <p className="text-xs text-neutral-subtext line-clamp-1">
              {group.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-1 border-t border-neutral-border/50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
              Contribution
            </span>
            <p className="flex items-center gap-0.5 font-bold text-sm text-foreground mt-0.5">
              <PhilippinePeso className="w-3.5 h-3.5 text-brand-accent" />
              {Number(group.contributionAmount).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
              Start Date
            </span>
            <p className="font-bold text-sm text-foreground mt-0.5">
              {isDateNull}
            </p>
          </div>
        </div>

        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3 h-3 text-neutral-subtext" /> Joined Members
            </span>
            <span className="font-bold text-foreground">
              {membershipsCount} / {group.maxMembers}
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
        href={`/group/${group.id}`}
        className="mt-2 flex h-10 items-center justify-center gap-2 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover px-4 rounded-2xl transition-all duration-200 active:scale-95 text-center cursor-pointer shadow-sm"
      >
        <LogIn className="w-4 h-4" />
        <span>Open Group</span>
      </Link>
    </div>
  );
}
