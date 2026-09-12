"use client";

import { useDisbursePayout } from "@/features/payments/hooks/useDisbursePayout";
import { useConfirmPayoutReceipt } from "@/features/payments/hooks/useConfirmPayoutReceipt";
import { useSelectSlot } from "./useSelectSlot";
import { useRemoveMember } from "./useRemoveMember";
import { useGroupTurnShowcaseState } from "./useGroupTurnShowcaseState";
import { getPayoutDate } from "../utils/groupCalculations";
import type { GroupRound, Membership, PaymentRecord } from "../types/group.types";

interface UseGroupTurnShowcaseControllerParams {
  groupId: string;
  organizerId?: string;
  startDate?: string | null;
  maxMembers: number;
  contributionAmount: number | string;
  billingCycle: string;
  cycleDuration: number;
  memberships: Membership[];
  hasStarted?: boolean;
  currentUserId?: string;
  payments?: PaymentRecord[];
  rounds?: GroupRound[];
  organizerFeeAmount?: number;
}

export function useGroupTurnShowcaseController({
  groupId,
  organizerId = "",
  startDate,
  maxMembers,
  contributionAmount,
  billingCycle,
  cycleDuration,
  memberships,
  hasStarted = false,
  currentUserId,
  payments = [],
  rounds = [],
  organizerFeeAmount = 0,
}: UseGroupTurnShowcaseControllerParams) {
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
  };

  const handleConfirmPayoutReceipt = async (data: { notes?: string }) => {
    if (!matchedRound) return;
    await confirmReceipt({
      roundId: matchedRound.id,
      notes: data.notes,
    });
  };

  const handleSelectSlot = async (position: number) => {
    await selectSlot(position);
  };

  const handleRemoveMember = async (memberUserId: string) => {
    await removeMember(memberUserId);
  };

  const hasSelectedMemberPaidOrganizerFee = selectedMemberUserId
    ? paidOrganizerFeeUserIds.has(selectedMemberUserId)
    : false;
  const hasCurrentMemberPaidOrganizerFee = currentUserId
    ? paidOrganizerFeeUserIds.has(currentUserId)
    : false;

  return {
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
  };
}
