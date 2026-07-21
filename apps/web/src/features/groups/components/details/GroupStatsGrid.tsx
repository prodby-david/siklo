import { PhilippinePeso, Users, Clock, Sparkles } from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { GroupStatsGridProps } from "../../types/group.types";

export default function GroupStatsGrid({
  contributionAmount,
  maxMembers,
  cycleDuration,
  billingCycle,
  membershipsCount,
  totalPayout,
  totalRounds,
}: GroupStatsGridProps) {
  const billingLabel =
    BILLING_CYCLE_LABELS[billingCycle as keyof typeof BILLING_CYCLE_LABELS] ||
    billingCycle;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-6 border border-neutral-border rounded-2xl bg-background flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
            Payout Per Round
          </span>
          <p className="text-2xl font-bold text-brand-accent flex items-center gap-0.5">
            <PhilippinePeso className="w-5 h-5 shrink-0" />
            {totalPayout.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <span className="text-[10px] text-neutral-subtext">
            ₱{Number(contributionAmount).toLocaleString()} × {maxMembers}{" "}
            members
          </span>
        </div>
        <div className="flex items-center justify-center w-11 h-11 bg-brand-accent/10 rounded-full shrink-0">
          <Sparkles className="w-5 h-5 text-brand-accent" />
        </div>
      </div>

      <div className="p-6 border border-neutral-border rounded-2xl bg-background flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
            Contribution
          </span>
          <p className="text-2xl font-bold text-foreground flex items-center gap-0.5">
            <PhilippinePeso className="w-5 h-5 shrink-0" />
            {Number(contributionAmount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <span className="text-[10px] text-neutral-subtext">
            Due {billingLabel.toLowerCase()}
          </span>
        </div>
        <div className="flex items-center justify-center w-11 h-11 bg-brand-accent/10 rounded-full shrink-0">
          <PhilippinePeso className="w-5 h-5 text-brand-accent" />
        </div>
      </div>

      <div className="p-6 border border-neutral-border rounded-2xl bg-background flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1 w-full mr-2">
          <span className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
            Members Joined
          </span>
          <p className="text-2xl font-bold text-foreground">
            {membershipsCount}{" "}
            <span className="text-sm font-normal text-neutral-subtext">
              / {maxMembers}
            </span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div
              className="bg-brand-accent h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (membershipsCount / maxMembers) * 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-11 h-11 bg-sky-500/10 rounded-full shrink-0">
          <Users className="w-5 h-5 text-sky-600" />
        </div>
      </div>

      <div className="p-6 border border-neutral-border rounded-2xl bg-background flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
            Rotations
          </span>
          <p className="text-2xl font-bold text-foreground">
            {cycleDuration}{" "}
            <span className="text-sm font-normal text-neutral-subtext">
              {cycleDuration === 1 ? "Cycle" : "Cycles"}
            </span>
          </p>
          <span className="text-[10px] text-neutral-subtext">
            {totalRounds} total payout rounds
          </span>
        </div>
        <div className="flex items-center justify-center w-11 h-11 bg-indigo-500/10 rounded-full shrink-0">
          <Clock className="w-5 h-5 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}
