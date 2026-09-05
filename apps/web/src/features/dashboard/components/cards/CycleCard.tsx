import Link from "next/link";
import { FolderOpen, PhilippinePeso, Users } from "lucide-react";
import { ExtendedGroup } from "@/features/groups/types/group.types";
import CycleStatusBadge from "./CycleStatusBadge";

interface CycleCardProps {
  group: ExtendedGroup;
}

export default function CycleCard({ group }: CycleCardProps) {
  const membershipsCount = group._count?.memberships ?? 0;
  const percentFilled = Math.min(
    100,
    Math.round((membershipsCount / group.maxMembers) * 100),
  );
  const hasStarted = Boolean(group.startDate);
  const poolTotal = Number(group.contributionAmount) * group.maxMembers;

  return (
    <article className="flex flex-col justify-between gap-4 rounded-3xl border border-neutral-border bg-card p-5 shadow-xs transition-colors duration-200 hover:border-brand-accent/40">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-brand-accent">
            {group.billingCycle} Cycle
          </span>
          <CycleStatusBadge
            hasStarted={hasStarted}
            isCycleDone={Boolean(group.isCycleDone)}
          />
        </div>

        <div className="space-y-1">
          <p className="truncate text-base font-extrabold text-foreground">
            {group.name}
          </p>
          {group.description && (
            <p className="line-clamp-1 text-xs text-neutral-subtext">
              {group.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-neutral-border/60 pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
              Contribution
            </span>
            <p className="mt-0.5 flex items-center gap-0.5 text-sm font-black text-foreground">
              <PhilippinePeso className="h-3.5 w-3.5" />
              {Number(group.contributionAmount).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
              Pool Total
            </span>
            <p className="mt-0.5 flex items-center gap-0.5 text-sm font-black text-success">
              <PhilippinePeso className="h-3.5 w-3.5" />
              {poolTotal.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-1 pt-1">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-neutral-subtext">
            <Users className="h-3 w-3 text-brand-accent" /> Members (
            {membershipsCount}/{group.maxMembers})
          </span>
          <progress
            className="siklo-progress block h-1.5"
            value={percentFilled}
            max={100}
            aria-label={`${membershipsCount} of ${group.maxMembers} members joined`}
          />
        </div>
      </div>

      <Link
        href={`/group/${group.id}`}
        className="mt-1 flex items-center justify-center gap-1.5 rounded-2xl bg-brand-accent px-4 py-2.5 text-center text-xs font-bold text-brand-accent-foreground shadow-2xs transition-colors duration-150 hover:bg-brand-accent-hover active:scale-95"
      >
        <FolderOpen className="h-3.5 w-3.5" />
        <span>Open Group</span>
      </Link>
    </article>
  );
}
