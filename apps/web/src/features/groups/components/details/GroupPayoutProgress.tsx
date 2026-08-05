"use client";

import React, { useMemo } from "react";
import { TrendingUp, Calendar, CheckCircle2, Clock, ShieldCheck, Wallet } from "lucide-react";
import { Membership } from "../../types/group.types";
import { ApiActivity } from "../../types/group.activity.types";
import { getPayoutDate } from "../../utils/group.calculations";
import useGetGroupActivities from "../../hooks/useGetGroupActivities";
import formatDate from "@/shared/utils/formatDate";

interface GroupPayoutProgressProps {
  groupId?: string;
  memberships?: Membership[];
  maxMembers: number;
  contributionAmount: number;
  startDate?: string | Date | null;
  billingCycle: string;
  currentCycle?: number;
  cycleDuration?: number;
  isCycleDone?: boolean;
}

export default function GroupPayoutProgress({
  groupId,
  memberships = [],
  maxMembers,
  contributionAmount,
  startDate,
  billingCycle,
  currentCycle = 1,
  cycleDuration = 1,
  isCycleDone,
}: GroupPayoutProgressProps) {
  const { data: activities = [] } = useGetGroupActivities(groupId || "");
  const hasStarted = !!startDate;

  const isFinished = useMemo(() => {
    if (isCycleDone !== undefined) return isCycleDone;
    if (!hasStarted || !memberships || memberships.length === 0) return false;
    const map: Record<number, Set<string>> = {};
    (activities as ApiActivity[]).forEach((act: ApiActivity) => {
      if (act.activity === "PAYMENT_VERIFIED") {
        const desc = act.description || "";
        const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
        const cycleNum = cycleMatch ? parseInt(cycleMatch[1], 10) : 1;
        const matchedMember = memberships.find(
          (m) => desc.includes(m.user.name) || desc.includes(`Turn #${m.position}`)
        );
        if (matchedMember) {
          if (!map[cycleNum]) map[cycleNum] = new Set();
          map[cycleNum].add(matchedMember.userId);
        }
      }
    });

    const finalCount = map[cycleDuration]?.size || 0;
    return finalCount >= memberships.length;
  }, [isCycleDone, hasStarted, memberships, activities, cycleDuration]);

  if (isFinished) return null;
  const totalRounds = maxMembers;
  const activeRound = Math.min(totalRounds, Math.max(1, currentCycle));
  const completedRounds = hasStarted ? activeRound - 1 : 0;
  const totalPoolPerRound = contributionAmount * maxMembers;
  const progressPercentage = hasStarted
    ? Math.min(100, Math.round((completedRounds / totalRounds) * 100))
    : 0;

  const currentMember = memberships.find((m) => m.position === activeRound);
  const currentBeneficiary = currentMember?.user?.name || "Available Slot";
  const nextPayoutDate = getPayoutDate(startDate, activeRound, billingCycle);

  return (
    <div className="p-6 border border-neutral-border rounded-2xl bg-background shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3">
        <h3 className="text-md font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-accent" /> Cycle Payout Progress
        </h3>
        <span className="text-xs font-bold text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-2xl border border-brand-accent/20">
          {progressPercentage}% Complete
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-neutral-subtext">Round Progress</span>
          <span className="text-foreground">
            Round {hasStarted ? activeRound : 0} of {totalRounds}
          </span>
        </div>
        <div className="w-full h-2.5 bg-neutral-table-stripe rounded-full overflow-hidden border border-neutral-border/60">
          <div
            className="h-full bg-gradient-to-r from-brand-accent to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-neutral-table-stripe/60 border border-neutral-border/80 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-subtext font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-accent" /> Active Beneficiary
          </span>
          <span className="font-extrabold text-foreground">{currentBeneficiary}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-subtext font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-accent" /> Target Payout Date
          </span>
          <span className="font-bold text-foreground">
            {nextPayoutDate ? formatDate(nextPayoutDate) : "Awaiting Cycle Start"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-2xl bg-background border border-neutral-border flex flex-col gap-1">
          <span className="text-[10px] text-neutral-subtext font-medium flex items-center gap-1">
            <Wallet className="w-3 h-3 text-emerald-500" /> Pool Per Round
          </span>
          <span className="text-sm font-black text-foreground">
            ₱{totalPoolPerRound.toLocaleString()}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-background border border-neutral-border flex flex-col gap-1">
          <span className="text-[10px] text-neutral-subtext font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-brand-accent" /> Guarantee
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            100% Protected
          </span>
        </div>
      </div>
    </div>
  );
}
