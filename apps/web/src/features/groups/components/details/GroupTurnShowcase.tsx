"use client";

import { motion } from "framer-motion";
import { RotateCw, CheckCircle2 } from "lucide-react";
import { useDisbursePayout } from "@/features/payments/hooks/useDisbursePayout";
import { useConfirmPayoutReceipt } from "@/features/payments/hooks/useConfirmPayoutReceipt";
import { useSelectSlot } from "../../hooks/useSelectSlot";
import { useRemoveMember } from "../../hooks/useRemoveMember";
import { useGroupTurnShowcaseState } from "../../hooks/useGroupTurnShowcaseState";
import { getPayoutDate } from "../../utils/groupCalculations";
import GroupAnnouncementDialog from "./GroupAnnouncementDialog";
import TurnDetailPanel from "./showcase/TurnDetailPanel";
import TurnQueue from "./showcase/TurnQueue";
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
  organizerFeeAmount = 0,
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
    paidUserIdsByTurn,
    pendingUserIdsByTurn,
    rejectedUserIdsByTurn,
    paidOrganizerFeeUserIds,
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
    rounds,
    organizerFeeAmount,
  );

  const sortedMemberships = [...memberships].sort(
    (a, b) => a.position - b.position,
  );

  const currentTurnKey = `${currentCycle}-${selectedTurn}`;
  const isRoundAllContributionsPaid =
    sortedMemberships.length > 0 &&
    (paidUserIdsByTurn[currentTurnKey]?.size || 0) >= sortedMemberships.length;

  const matchedRound = rounds.find(
    (r) => r.cycleNumber === currentCycle && r.roundNumber === selectedTurn,
  );
  const isSelectedTurnReceived =
    matchedRound?.status === "RECEIVED" ||
    confirmedTurns.has(currentTurnKey) ||
    (hasStarted && currentTurn !== undefined && selectedTurn < currentTurn);
  const isSelectedTurnDisbursed =
    matchedRound?.status === "DISBURSED" ||
    disbursedTurns.has(currentTurnKey);
  const isRoundDisbursed =
    isSelectedTurnDisbursed ||
    isSelectedTurnReceived ||
    matchedRound?.status === "PAID";
  const isRoundConfirmed =
    isSelectedTurnReceived ||
    matchedRound?.status === "PAID";

  const selectedMembership = sortedMemberships.find(
    (m) => m.position === selectedTurn,
  );
  const selectedMemberName = selectedMembership?.user?.name || "Available Slot";
  const selectedMemberUserId = selectedMembership?.userId;
  const currentActiveTurnKey = `${currentCycle}-${currentTurn}`;
  const isSelectedPaid = selectedMemberUserId
    ? Boolean(
        paidUserIdsByTurn[currentActiveTurnKey]?.has(selectedMemberUserId),
      )
    : false;
  const isSelectedPending = selectedMemberUserId
    ? Boolean(
        pendingUserIdsByTurn[currentActiveTurnKey]?.has(selectedMemberUserId),
      )
    : false;
  const isSelectedRejected = selectedMemberUserId
    ? Boolean(
        rejectedUserIdsByTurn[currentActiveTurnKey]?.has(selectedMemberUserId),
      )
    : false;

  const calculatedPayoutDate = getPayoutDate(
    startDate,
    selectedTurn,
    billingCycle,
    completedDisbursementDates,
  );

  const totalPayoutNum = (Number(contributionAmount) || 0) * maxMembers;

  const handleDisbursePayout = async (data: {
    referenceNumber: string;
    proofUrl: string;
  }) => {
    if (!matchedRound) return;
    await disburse({
      roundId: matchedRound.id,
      referenceNumber: data.referenceNumber,
      proofUrl: data.proofUrl,
    });
    onRefresh?.();
  };

  const handleConfirmPayoutReceipt = async (data: { notes?: string }) => {
    if (!matchedRound) return;
    await confirmReceipt({
      roundId: matchedRound.id,
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
      <span className="text-[10px] font-bold text-sky-500 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
        Random Sequence
      </span>
    ) : payoutSequence === "FREECHOOSING" ? (
      <span className="text-[10px] font-bold text-violet-500 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
        Free Choice Slots
      </span>
    ) : (
      <span className="rounded-full border border-winner-payout/20 bg-winner-payout-bg px-2 py-0.5 text-[10px] font-bold text-winner-payout">
        First Come First Served
      </span>
    );

  const hasSelectedMemberPaidOrganizerFee = selectedMemberUserId
    ? paidOrganizerFeeUserIds.has(selectedMemberUserId)
    : false;
  const hasCurrentMemberPaidOrganizerFee = currentUserId
    ? paidOrganizerFeeUserIds.has(currentUserId)
    : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl border border-neutral-border bg-background p-4 sm:p-6 shadow-xs relative overflow-hidden space-y-4"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-neutral-border/60 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/25 shrink-0">
              <RotateCw className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground flex items-center gap-2 flex-wrap">
              Cycle Turn Queue & Rotations {sequenceBadge}
            </h3>
          </div>
          <p className="text-xs text-neutral-subtext">
            Select any member slot in the rotation to view details, contribute, or release payouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {isOrganizer && hasStarted && !isCycleDone && (
            <GroupAnnouncementDialog groupId={groupId} />
          )}

          <div className="flex items-center gap-2 bg-neutral-table-stripe p-1 rounded-2xl border border-neutral-border/60 shrink-0">
            {isCycleDone ? (
              <span className="flex items-center gap-1 rounded-xl border border-success/30 bg-success-bg px-3 py-1 text-[11px] font-bold text-success">
                <CheckCircle2 className="w-3 h-3" /> Cycle Finished
              </span>
            ) : (
              <>
                <span className="text-[11px] font-bold text-brand-accent px-2.5 py-1 bg-transparent rounded-xl border border-neutral-border/40">
                  Cycle {currentCycle} of {cycleDuration}
                </span>
                <span className="text-[11px] font-semibold text-neutral-subtext px-2">
                  ₱{totalPayoutNum.toLocaleString()} Pool
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <TurnQueue
          memberships={sortedMemberships}
          rounds={rounds}
          maxMembers={maxMembers}
          selectedTurn={selectedTurn}
          currentCycle={currentCycle}
          currentTurn={currentTurn}
          hasStarted={hasStarted}
          startDate={startDate}
          billingCycle={billingCycle}
          completedDisbursementDates={completedDisbursementDates}
          confirmedTurns={confirmedTurns}
          disbursedTurns={disbursedTurns}
          organizerId={organizerId}
          onSelectTurn={setSelectedTurn}
        />

        <TurnDetailPanel
          selectedTurn={selectedTurn}
          selectedMemberName={selectedMemberName}
          selectedMembership={selectedMembership}
          isSelectedPaid={isSelectedPaid}
          isSelectedPending={isSelectedPending}
          isSelectedRejected={isSelectedRejected}
          isSelectedTurnReceived={Boolean(isSelectedTurnReceived)}
          isSelectedTurnDisbursed={Boolean(isSelectedTurnDisbursed)}
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
            organizerFeeAmount,
            rounds,
            payments,
          }}
          isOrganizer={isOrganizer}
          isCurrentTurn={selectedTurn === currentTurn}
          isCycleDone={isCycleDone}
          currentCycle={currentCycle}
          currentTurn={currentTurn}
          hasStarted={hasStarted}
          currentUserId={currentUserId}
          hasSelectedMemberPaidOrganizerFee={hasSelectedMemberPaidOrganizerFee}
          hasCurrentMemberPaidOrganizerFee={hasCurrentMemberPaidOrganizerFee}
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
