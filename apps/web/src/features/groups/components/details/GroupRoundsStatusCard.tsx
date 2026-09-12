"use client";

import {
  Layers,
  Clock,
  CheckCircle2,
} from "lucide-react";
import type { GroupRoundsStatusCardProps } from "@/features/groups/types/showcase.types";
import { useGroupRoundsStatus } from "@/features/groups/hooks/useGroupRoundsStatus";
import GroupRoundsSummaryCards from "./elements/GroupRoundsSummaryCards";
import GroupRoundsProgressBars from "./elements/GroupRoundsProgressBars";

export default function GroupRoundsStatusCard({
  groupName,
  hasStarted,
  isCycleDone,
  currentCycle,
  currentTurn,
  maxMembers,
  cycleDuration,
  contributionAmount,
  organizerId,
  organizerFeeAmount = 0,
  rounds = [],
  payments = [],
  memberships = [],
}: GroupRoundsStatusCardProps) {
  const {
    contributionNum,
    poolTotal,
    organizerFeeNum,
    activeBeneficiaryName,
    verifiedPaymentsCount,
    progressPercent,
    nonOrganizerMembers,
    paidOrganizerFeeCount,
    feeProgressPercent,
    isRoundDisbursed,
    isRoundReceived,
    isRoundAllPaid,
  } = useGroupRoundsStatus({
    rounds,
    currentCycle,
    currentTurn,
    memberships,
    organizerId,
    organizerFeeAmount,
    payments,
    maxMembers,
    contributionAmount,
  });

  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-3xl bg-background shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/25 shrink-0">
            <Layers className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              Group Rounds & Status Overview
            </h3>
            <p className="text-[11px] text-neutral-subtext">
              Real-time rotation tracking and round progression for {groupName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCycleDone ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-bg px-3 py-1 text-[10px] font-black uppercase tracking-wider text-success">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Cycles Completed
            </span>
          ) : hasStarted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-accent/15 text-brand-accent border border-brand-accent/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
              </span>
              Active Cycle {currentCycle} of {cycleDuration}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning-bg px-3 py-1 text-[10px] font-black uppercase tracking-wider text-warning">
              <Clock className="w-3.5 h-3.5" /> Unstarted • Pending
            </span>
          )}
        </div>
      </div>

      <GroupRoundsSummaryCards
        maxMembers={maxMembers}
        contributionAmount={contributionNum}
        poolTotal={poolTotal}
        hasStarted={hasStarted}
        activeBeneficiaryName={activeBeneficiaryName}
        currentTurn={currentTurn}
        isCycleDone={isCycleDone}
        isRoundReceived={isRoundReceived}
        isRoundDisbursed={isRoundDisbursed}
        isRoundAllPaid={isRoundAllPaid}
        verifiedPaymentsCount={verifiedPaymentsCount}
      />

      {hasStarted && !isCycleDone && (
        <GroupRoundsProgressBars
          currentTurn={currentTurn}
          verifiedPaymentsCount={verifiedPaymentsCount}
          maxMembers={maxMembers}
          progressPercent={progressPercent}
          organizerFeeAmount={organizerFeeNum}
          paidOrganizerFeeCount={paidOrganizerFeeCount}
          nonOrganizerCount={nonOrganizerMembers.length}
          feeProgressPercent={feeProgressPercent}
        />
      )}
    </div>
  );
}
