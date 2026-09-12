"use client";

import { useState, useMemo } from "react";
import { TurnDetailPanelProps } from "@/features/groups/types/showcase.types";
import { getInitials } from "@/features/groups/utils/groupHelpers";
import MemberPaymentHistoryModal from "@/features/groups/components/modals/MemberPaymentHistoryModal";
import TurnDetailHeader from "./elements/TurnDetailHeader";
import TurnDetailBeneficiary from "./elements/TurnDetailBeneficiary";
import TurnDetailMetrics from "./elements/TurnDetailMetrics";
import TurnDetailHistoryBar from "./elements/TurnDetailHistoryBar";
import TurnPaymentStatusPanel from "./TurnPaymentStatusPanel";
import TurnActionPanel from "./TurnActionPanel";

export default function TurnDetailPanel({
  selectedTurn,
  selectedMemberName,
  selectedMembership,
  isSelectedPaid,
  isSelectedPending = false,
  isSelectedRejected = false,
  isSelectedTurnReceived = false,
  isSelectedTurnDisbursed = false,
  calculatedPayoutDate,
  group,
  isOrganizer,
  isCurrentTurn = false,
  isCycleDone,
  currentCycle,
  currentTurn,
  hasStarted = false,
  currentUserId,
  hasSelectedMemberPaidOrganizerFee = false,
  hasCurrentMemberPaidOrganizerFee = false,
  onSelectSlot,
  isSelectingSlot = false,
  onRemoveMember,
  isRemovingMember = false,
  isRoundAllContributionsPaid = false,
  onDisbursePayout,
  isDisbursingPayout = false,
}: TurnDetailPanelProps) {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const contributionNum = Number(group.contributionAmount) || 0;
  const poolTotal = contributionNum * group.maxMembers;
  const isUserSlotOwner =
    Boolean(currentUserId && selectedMembership?.userId === currentUserId);
  const isSlotOrganizer =
    Boolean(
      selectedMembership &&
      group.organizerId &&
      selectedMembership.userId === group.organizerId
    );
  const isRemovableMember =
    Boolean(
      isOrganizer &&
      !hasStarted &&
      selectedMembership &&
      selectedMembership.userId !== currentUserId
    );

  const isCurrentBeneficiary = Boolean(
    hasStarted &&
    currentTurn !== undefined &&
    selectedMembership?.position === currentTurn
  );

  const currentRound = group.rounds?.find(
    (round) =>
      round.cycleNumber === currentCycle &&
      round.roundNumber === currentTurn,
  );

  const selectedMemberUserId = selectedMembership?.userId;

  const memberPayments = useMemo(() => {
    if (!selectedMemberUserId) return [];
    const allPayments = group.payments || [];
    const matched = allPayments.filter(
      (p) => p.userId === selectedMemberUserId
    );
    return [...matched].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [group.payments, selectedMemberUserId]);

  const initials = getInitials(selectedMemberName);
  const feeAmount = group.organizerFeeAmount || 0;

  return (
    <div className="lg:col-span-7 border border-neutral-border/80 rounded-3xl p-5 sm:p-7 bg-card flex flex-col justify-between gap-5 shadow-xs">
      <div className="space-y-4">
        <TurnDetailHeader
          selectedTurn={selectedTurn}
          hasStarted={hasStarted}
          isSelectedTurnReceived={isSelectedTurnReceived}
          isSelectedTurnDisbursed={isSelectedTurnDisbursed}
          isCurrentBeneficiary={isCurrentBeneficiary}
          currentCycle={currentCycle}
        />

        <TurnDetailBeneficiary
          selectedMemberName={selectedMemberName}
          initials={initials}
          selectedMembership={selectedMembership}
          isSlotOrganizer={isSlotOrganizer}
          isUserSlotOwner={isUserSlotOwner}
          isRemovableMember={isRemovableMember}
          isRemovingMember={isRemovingMember}
          feeAmount={feeAmount}
          hasSelectedMemberPaidOrganizerFee={hasSelectedMemberPaidOrganizerFee}
          selectedTurn={selectedTurn}
          onRemoveMember={onRemoveMember}
        />

        <TurnDetailMetrics
          selectedTurn={selectedTurn}
          maxMembers={group.maxMembers}
          poolTotal={poolTotal}
          calculatedPayoutDate={calculatedPayoutDate}
        />

        <TurnPaymentStatusPanel
          selectedTurn={selectedTurn}
          selectedMemberName={selectedMemberName}
          currentTurn={currentTurn}
          contributionAmount={contributionNum}
          poolTotal={poolTotal}
          hasStarted={hasStarted}
          hasSelectedMembership={Boolean(selectedMembership)}
          isCurrentBeneficiary={isCurrentBeneficiary}
          isSelectedTurnReceived={isSelectedTurnReceived}
          isSelectedTurnDisbursed={isSelectedTurnDisbursed}
          isSelectedPaid={isSelectedPaid}
          isSelectedPending={isSelectedPending}
          isSelectedRejected={isSelectedRejected}
        />

        {selectedMembership && (
          <TurnDetailHistoryBar
            paymentCount={memberPayments.length}
            onOpenHistory={() => setIsHistoryModalOpen(true)}
          />
        )}
      </div>

      <div className="space-y-2 border-t border-neutral-border/60 pt-2">
        <TurnActionPanel
          selectedTurn={selectedTurn}
          selectedMemberName={selectedMemberName}
          selectedMembership={selectedMembership}
          currentRound={currentRound}
          group={group}
          currentCycle={currentCycle}
          currentUserId={currentUserId}
          calculatedPayoutDate={calculatedPayoutDate}
          contributionAmount={contributionNum}
          poolTotal={poolTotal}
          isOrganizer={isOrganizer}
          isCurrentTurn={isCurrentTurn}
          isCycleDone={isCycleDone}
          hasStarted={hasStarted}
          isUserSlotOwner={isUserSlotOwner}
          isSelectedTurnReceived={isSelectedTurnReceived}
          isSelectedPaid={isSelectedPaid}
          isSelectedPending={isSelectedPending}
          isSelectedRejected={isSelectedRejected}
          hasCurrentMemberPaidOrganizerFee={hasCurrentMemberPaidOrganizerFee}
          isRoundAllContributionsPaid={isRoundAllContributionsPaid}
          isSelectingSlot={isSelectingSlot}
          isDisbursingPayout={isDisbursingPayout}
          onSelectSlot={onSelectSlot}
          onDisbursePayout={onDisbursePayout}
        />
      </div>

      {isHistoryModalOpen && (
        <MemberPaymentHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          memberName={selectedMemberName}
          payments={memberPayments}
          rounds={group.rounds}
          currentCycle={currentCycle}
          selectedTurn={selectedTurn}
        />
      )}
    </div>
  );
}
