"use client";

import Link from "next/link";
import formatDate from "@/shared/utils/formatDate";
import { PhilippinePeso, LogIn, Users, Crown, UserCheck } from "lucide-react";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { GroupCardItemProps } from "@/features/groups/types/group.types";

export default function GroupCardItem({ group }: GroupCardItemProps) {
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
                  ? "border border-warning/30 bg-warning-bg text-warning"
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
            <span className="rounded-full bg-winner-payout-bg px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-winner-payout">
              {group.billingCycle} Cycle
            </span>
            {isCycleDone ? (
              <span className="rounded-full bg-winner-payout-bg px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-winner-payout">
                Completed
              </span>
            ) : group.startDate ? (
              <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-success">
                Active
              </span>
            ) : (
              <span className="rounded-full bg-warning-bg px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-warning">
                Pending
              </span>
            )}
          </div>
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
          <progress
            className="siklo-progress h-1.5 block"
            value={percentFilled}
            max={100}
            aria-label={`${membershipsCount} of ${group.maxMembers} members joined`}
          />
        </div>
      </div>

      <Link
        href={`/group/${group.id}`}
        className="mt-2 flex h-10 items-center justify-center gap-2 text-xs font-bold text-brand-accent-foreground bg-brand-accent hover:bg-brand-accent-hover px-4 rounded-2xl transition-all duration-200 active:scale-95 text-center cursor-pointer shadow-sm"
      >
        <LogIn className="w-4 h-4" />
        <span>Open Group</span>
      </Link>
    </div>
  );
}
