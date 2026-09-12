"use client";

import { motion } from "framer-motion";
import GroupTurnShowcaseHeader from "./showcase/elements/GroupTurnShowcaseHeader";
import TurnDetailPanel from "./showcase/TurnDetailPanel";
import TurnQueue from "./showcase/TurnQueue";
import OrganizerInviteSection from "@/features/invite/components/OrganizerInviteSection";
import type { GroupTurnShowcaseProps } from "../../types/showcase.types";
import { useGroupTurnShowcaseController } from "../../hooks/useGroupTurnShowcaseController";

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
  inviteCode,
}: GroupTurnShowcaseProps) {
  const {
    selectedTurn,
    setSelectedTurn,
    sortedMemberships,
    selectedMembership,
    selectedMemberName,
    calculatedPayoutDate,
    totalPayoutNum,
    isRoundAllContributionsPaid,
    isRoundDisbursed,
    isRoundConfirmed,
    isSelectedTurnReceived,
    isSelectedTurnDisbursed,
    isSelectedPaid,
    isSelectedPending,
    isSelectedRejected,
    hasSelectedMemberPaidOrganizerFee,
    hasCurrentMemberPaidOrganizerFee,
    completedDisbursementDates,
    confirmedTurns,
    disbursedTurns,
    currentCycle,
    currentTurn,
    isSelectingSlot,
    isRemovingMember,
    isDisbursingPayout,
    isConfirmingPayoutReceipt,
    handleDisbursePayout,
    handleConfirmPayoutReceipt,
    handleSelectSlot,
    handleRemoveMember,
  } = useGroupTurnShowcaseController({
    groupId,
    organizerId,
    startDate,
    maxMembers,
    contributionAmount,
    billingCycle,
    cycleDuration,
    memberships,
    hasStarted,
    currentUserId,
    payments,
    rounds,
    organizerFeeAmount,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl border border-neutral-border bg-background p-4 sm:p-6 shadow-xs relative overflow-hidden space-y-4"
    >
      <GroupTurnShowcaseHeader
        payoutSequence={payoutSequence}
        groupId={groupId}
        isOrganizer={isOrganizer}
        hasStarted={hasStarted}
        isCycleDone={isCycleDone}
        currentCycle={currentCycle}
        cycleDuration={cycleDuration}
        totalPayoutNum={totalPayoutNum}
      />

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

        {hasStarted ? (
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
          />
        ) : (
          <OrganizerInviteSection
            groupId={groupId}
            inviteCode={inviteCode}
            maxMembers={maxMembers}
            membershipsCount={sortedMemberships.length}
            isOrganizer={isOrganizer}
          />
        )}
      </div>
    </motion.div>
  );
}
