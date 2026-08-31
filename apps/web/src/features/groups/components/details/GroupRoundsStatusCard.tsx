"use client";

import { useMemo } from "react";
import {
  Layers,
  Award,
  ShieldCheck,
  Clock,
  Coins,
  CheckCircle2,
  Users,
} from "lucide-react";
import { GroupRoundsStatusCardProps } from "@/features/groups/types/showcase.types";

export default function GroupRoundsStatusCard({
  groupName,
  hasStarted,
  isCycleDone,
  currentCycle,
  currentTurn,
  maxMembers,
  cycleDuration,
  contributionAmount,
  rounds = [],
  payments = [],
  memberships = [],
}: GroupRoundsStatusCardProps) {
  const contributionNum = Number(contributionAmount) || 0;
  const poolTotal = contributionNum * maxMembers;

  const currentRound = useMemo(
    () =>
      rounds.find(
        (r) =>
          r.cycleNumber === currentCycle && r.roundNumber === currentTurn,
      ),
    [rounds, currentCycle, currentTurn],
  );

  const activeBeneficiaryMembership = useMemo(
    () => memberships.find((m) => m.position === currentTurn),
    [memberships, currentTurn],
  );

  const activeBeneficiaryName =
    activeBeneficiaryMembership?.user?.name || `Slot #${currentTurn}`;

  const verifiedPaymentsCount = useMemo(() => {
    if (!currentRound) return 0;
    const currentRoundPayments = payments.filter(
      (p) => p.roundId === currentRound.id && p.status === "VERIFIED",
    );
    const uniqueUserIds = new Set(currentRoundPayments.map((p) => p.userId));
    return uniqueUserIds.size;
  }, [currentRound, payments]);

  const progressPercent = Math.min(
    100,
    Math.round((verifiedPaymentsCount / maxMembers) * 100),
  );

  const isRoundDisbursed = currentRound?.status === "DISBURSED";
  const isRoundReceived = currentRound?.status === "RECEIVED";
  const isRoundAllPaid = verifiedPaymentsCount >= maxMembers;

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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Clock className="w-3.5 h-3.5" /> Unstarted • Forming
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-subtext/3 flex flex-col justify-between gap-1.5">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
            <Coins className="w-3 h-3 text-brand-accent" /> Round Concept
          </span>
          <p className="text-xs font-semibold text-foreground leading-snug">
            Each round is 1 rotation where all {maxMembers} members contribute ₱{contributionNum.toLocaleString()} for 1 recipient.
          </p>
          <span className="text-[10px] text-neutral-subtext">
            Pool total: ₱{poolTotal.toLocaleString()} per round
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-subtext/3 flex flex-col justify-between gap-1.5">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3 h-3 text-brand-accent" /> Current Round Recipient
          </span>
          <p className="text-sm font-extrabold text-foreground truncate">
            {hasStarted ? activeBeneficiaryName : "Pending Cycle Start"}
          </p>
          <span className="text-[10px] text-brand-accent font-bold">
            {hasStarted ? `Turn #${currentTurn} Beneficiary` : "Waiting for organizer"}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-subtext/3 flex flex-col justify-between gap-1.5">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-brand-accent" /> Payout Stage
          </span>
          <div>
            {isCycleDone ? (
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                Completed
              </span>
            ) : isRoundReceived ? (
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                Payout Confirmed Received
              </span>
            ) : isRoundDisbursed ? (
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                Payout Disbursed
              </span>
            ) : isRoundAllPaid ? (
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                Ready for Payout Release
              </span>
            ) : hasStarted ? (
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                Collecting Contributions
              </span>
            ) : (
              <span className="text-xs font-extrabold text-neutral-subtext">
                Waiting for Start
              </span>
            )}
          </div>
          <span className="text-[10px] text-neutral-subtext">
            {hasStarted ? `${verifiedPaymentsCount} of ${maxMembers} members verified` : "0 members contributed"}
          </span>
        </div>
      </div>

      {hasStarted && !isCycleDone && (
        <div className="p-4 rounded-2xl border border-brand-accent/25 bg-brand-accent/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-accent" /> Active Turn #{currentTurn} Contribution Progress
            </span>
            <span className="font-black text-brand-accent">
              {verifiedPaymentsCount} / {maxMembers} Paid
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-brand-accent h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
