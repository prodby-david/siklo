"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Users, Info, CheckCircle2 } from "lucide-react";
import { useDisbursePayout } from "@/features/payments/hooks/useDisbursePayout";
import { useConfirmPayoutReceipt } from "@/features/payments/hooks/useConfirmPayoutReceipt";
import { useSelectSlot } from "../../hooks/useSelectSlot";
import { useRemoveMember } from "../../hooks/useRemoveMember";
import { useGroupTurnShowcaseState } from "../../hooks/useGroupTurnShowcaseState";
import { getPayoutDate } from "../../utils/group.calculations";
import GroupAnnouncementDialog from "./GroupAnnouncementDialog";
import ShowcaseTurnCard from "./showcase/ShowcaseTurnCard";
import TurnDetailPanel from "./showcase/TurnDetailPanel";
import { GroupTurnShowcaseProps } from "../../types/showcase.types";

export default function GroupTurnShowcase({
  groupId,
  organizerId = "",
  startDate,
  maxMembers,
  contributionAmount,
  billingCycle,
  cycleDuration,
  payoutSequence,
  memberships,
  isOrganizer,
  hasStarted = false,
  currentUserId,
  isCycleDone = false,
  payments = [],
  rounds = [],
  allowedPaymentMethods,
  paymentDetails,
  gracePeriodDays,
  latePenaltyAmount,
  onRefresh,
}: GroupTurnShowcaseProps) {
  const { mutateAsync: selectSlot, isPending: isSelectingSlot } =
    useSelectSlot(groupId);
  const { mutateAsync: removeMember, isPending: isRemovingMember } =
    useRemoveMember(groupId);
  const { disburse, isDisbursing: isDisbursingPayout } =
    useDisbursePayout(groupId);
  const { confirmReceipt, isConfirmingReceipt: isConfirmingPayoutReceipt } =
    useConfirmPayoutReceipt(groupId);

  const {
    selectedTurn,
    setSelectedTurn,
    paidMemberUserIds,
    pendingMemberUserIds,
    rejectedMemberUserIds,
    paidUserIdsByTurn,
    pendingUserIdsByTurn,
    rejectedUserIdsByTurn,
    disbursedTurns,
    confirmedTurns,
    completedDisbursementDates,
    currentCycle,
    currentTurn,
  } = useGroupTurnShowcaseState(
    groupId,
    memberships,
    organizerId || "",
    startDate,
    cycleDuration,
    payments,
    rounds
  );

  const sortedMemberships = [...memberships].sort(
    (a, b) => a.position - b.position
  );

  const currentTurnKey = `${currentCycle}-${selectedTurn}`;
  const isRoundAllContributionsPaid =
    sortedMemberships.length > 0 &&
    (paidUserIdsByTurn[currentTurnKey]?.size || 0) >= sortedMemberships.length;

  const matchedRound = rounds.find(
    (r) => r.cycleNumber === currentCycle && r.roundNumber === selectedTurn
  );
  const isRoundDisbursed =
    disbursedTurns.has(currentTurnKey) || matchedRound?.status === "PAID";
  const isRoundConfirmed =
    confirmedTurns.has(currentTurnKey) || matchedRound?.status === "PAID";

  const selectedMembership = sortedMemberships.find(
    (m) => m.position === selectedTurn
  );
  const selectedMemberName = selectedMembership?.user?.name || "Available Slot";
  const selectedMemberUserId = selectedMembership?.userId;
  const currentActiveTurnKey = `${currentCycle}-${currentTurn}`;
  const isSelectedPaid = selectedMemberUserId
    ? Boolean(paidUserIdsByTurn[currentActiveTurnKey]?.has(selectedMemberUserId))
    : false;
  const isSelectedPending = selectedMemberUserId
    ? Boolean(pendingUserIdsByTurn[currentActiveTurnKey]?.has(selectedMemberUserId))
    : false;
  const isSelectedRejected = selectedMemberUserId
    ? Boolean(rejectedUserIdsByTurn[currentActiveTurnKey]?.has(selectedMemberUserId))
    : false;

  const calculatedPayoutDate = getPayoutDate(
    startDate,
    selectedTurn,
    billingCycle,
    completedDisbursementDates
  );

  const totalPayoutNum = (Number(contributionAmount) || 0) * maxMembers;

  const handleDisbursePayout = async (data: {
    referenceNumber?: string;
    proofUrl?: string;
  }) => {
    await disburse({
      groupId,
      roundId: matchedRound?.id,
      cycleNumber: currentCycle,
      turnNumber: selectedTurn,
      referenceNumber: data.referenceNumber,
      proofUrl: data.proofUrl,
    });
    onRefresh?.();
  };

  const handleConfirmPayoutReceipt = async (data: { notes?: string }) => {
    await confirmReceipt({
      groupId,
      roundId: matchedRound?.id,
      cycleNumber: currentCycle,
      turnNumber: selectedTurn,
      notes: data.notes,
    });
    onRefresh?.();
  };

  const handleSelectSlot = async (position: number) => {
    await selectSlot(position);
  };

  const handleRemoveMember = async (memberUserId: string) => {
    await removeMember(memberUserId);
  };

  const sequenceBadge =
    payoutSequence === "RANDOM" ? (
      <span className="text-[10px] font-bold text-sky-500 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
        Random Sequence
      </span>
    ) : payoutSequence === "FREECHOOSING" ? (
      <span className="text-[10px] font-bold text-violet-500 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
        Free Choice Slots
      </span>
    ) : (
      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
        First Come First Served
      </span>
    );

  const activeTurnBeneficiary = sortedMemberships.find(
    (m) => m.position === currentTurn
  )?.user?.name || `Slot #${currentTurn}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl border border-neutral-border bg-background p-4 sm:p-6 shadow-sm relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-neutral-border/60 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/30 shrink-0">
              <RotateCw className="w-4 h-4 animate-spin-slow" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground flex items-center gap-2 flex-wrap">
              Cycle Turn Queue & Rotations {sequenceBadge}
            </h3>
          </div>
          <p className="text-xs text-neutral-subtext">
            Click on any member turn to inspect payout details, manage payments, and confirm payout releases.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {isOrganizer && hasStarted && !isCycleDone && (
            <GroupAnnouncementDialog groupId={groupId} />
          )}

          <div className="flex items-center gap-2 bg-neutral-table-stripe p-1 rounded-2xl border border-neutral-border/60 shrink-0">
            {isCycleDone ? (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> All Member Payouts Completed
              </span>
            ) : (
              <>
                <span className="text-[11px] font-bold text-brand-accent px-3 py-1 bg-transparent rounded-xl border border-neutral-border/40">
                  Cycle {currentCycle} of {cycleDuration}
                </span>
                <span className="text-[11px] font-semibold text-neutral-subtext px-2">
                  ₱{totalPayoutNum.toLocaleString()} Payout Pool
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-xs leading-relaxed text-neutral-subtext bg-brand-accent/5 p-3.5 rounded-2xl border border-brand-accent/10 flex items-start gap-2.5 mb-6">
        <Info className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
        <p>
          Paluwagans run on a rotating payout system. Slots are filled by order of joining. Each round, one member receives the full pooled fund. Once all member payouts are received, the cycle advances.
        </p>
      </div>

      {hasStarted && !isCycleDone && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-brand-accent/10 border border-brand-accent/25 px-4 py-3 rounded-2xl mb-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-accent">
                Turn #{currentTurn} of {maxMembers} in Progress (Cycle {currentCycle})
              </span>
              <span className="text-xs sm:text-sm font-bold text-foreground">
                Beneficiary: {activeTurnBeneficiary}
              </span>
            </div>
          </div>
          {selectedTurn !== currentTurn && (
            <button
              onClick={() => setSelectedTurn(currentTurn)}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-accent hover:underline cursor-pointer shrink-0"
            >
              <span>View Active Turn (Turn #{currentTurn})</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-[11px] font-extrabold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-accent" /> Group Member Turn Queue
          </span>

          <div className="flex flex-col gap-2.5">
            {Array.from({ length: maxMembers }).map((_, index) => {
              const position = index + 1;
              const membership = sortedMemberships.find(
                (m) => m.position === position
              );
              const isSelected = selectedTurn === position;
              const cardKey = `${currentCycle}-${position}`;
              const isConfirmed = confirmedTurns.has(cardKey);
              const isCurrent = position === currentTurn;
              const isTurnPaid =
                isConfirmed ||
                position < currentTurn;

              const calculatedDate = getPayoutDate(
                startDate,
                position,
                billingCycle,
                completedDisbursementDates
              );

              return (
                <ShowcaseTurnCard
                  key={position}
                  position={position}
                  membership={membership}
                  isSelected={isSelected}
                  isPaid={Boolean(isTurnPaid)}
                  isCurrent={isCurrent}
                  calculatedDate={calculatedDate}
                  onSelect={setSelectedTurn}
                  organizerId={organizerId}
                />
              );
            })}
          </div>
        </div>

        <TurnDetailPanel
          selectedTurn={selectedTurn}
          selectedMemberName={selectedMemberName}
          selectedMembership={selectedMembership}
          isSelectedPaid={isSelectedPaid}
          isSelectedPending={isSelectedPending}
          isSelectedRejected={isSelectedRejected}
          calculatedPayoutDate={calculatedPayoutDate}
          group={{
            id: groupId,
            contributionAmount,
            maxMembers,
            billingCycle,
            startDate,
            payoutSequence,
            organizerId,
            allowedPaymentMethods,
            paymentDetails,
            gracePeriodDays,
            latePenaltyAmount,
            rounds,
            payments,
          }}
          isOrganizer={isOrganizer}
          isCurrentTurn={selectedTurn === currentTurn}
          isCycleDone={isCycleDone}
          currentCycle={currentCycle}
          currentTurn={currentTurn}
          onJumpToCurrentTurn={() => setSelectedTurn(currentTurn)}
          hasStarted={hasStarted}
          currentUserId={currentUserId}
          onSelectSlot={handleSelectSlot}
          isSelectingSlot={isSelectingSlot}
          onRemoveMember={handleRemoveMember}
          isRemovingMember={isRemovingMember}
          isRoundAllContributionsPaid={isRoundAllContributionsPaid}
          isRoundDisbursed={isRoundDisbursed}
          isRoundConfirmed={isRoundConfirmed}
          onDisbursePayout={handleDisbursePayout}
          isDisbursingPayout={isDisbursingPayout}
          onConfirmPayoutReceipt={handleConfirmPayoutReceipt}
          isConfirmingPayoutReceipt={isConfirmingPayoutReceipt}
          onRefresh={onRefresh}
        />
      </div>
    </motion.div>
  );
}
