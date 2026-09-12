"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  HandCoins,
  Hourglass,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type { TurnActionPanelProps } from "@/features/groups/types/showcase.types";
import TurnActionWaitingState from "./actions/TurnActionWaitingState";
import DisbursePayoutAction from "./actions/DisbursePayoutAction";
import SubmitContributionAction from "./actions/SubmitContributionAction";

export default function TurnActionPanel({
  selectedTurn,
  selectedMemberName,
  selectedMembership,
  currentRound,
  group,
  currentCycle,
  currentUserId,
  calculatedPayoutDate,
  contributionAmount,
  poolTotal,
  isOrganizer,
  isCurrentTurn,
  isCycleDone,
  hasStarted,
  isUserSlotOwner,
  isSelectedTurnReceived,
  isSelectedPaid,
  isSelectedPending,
  isSelectedRejected,
  hasCurrentMemberPaidOrganizerFee,
  isRoundAllContributionsPaid,
  isSelectingSlot,
  isDisbursingPayout,
  onSelectSlot,
  onDisbursePayout,
}: TurnActionPanelProps) {
  if (isCycleDone) {
    return (
      <TurnActionWaitingState
        icon={<Lock className="h-3.5 w-3.5" />}
        message="Cycle Completed"
      />
    );
  }

  if (!hasStarted) {
    if (group.payoutSequence !== "FREECHOOSING") {
      return (
        <TurnActionWaitingState
          icon={<Clock className="h-3.5 w-3.5" />}
          message="Cycle Not Started • Waiting for Organizer"
        />
      );
    }

    if (isUserSlotOwner) {
      return (
        <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-success/25 bg-success-bg py-3 text-xs font-bold text-success">
          <ShieldCheck className="h-4 w-4" />
          <span>Your Chosen Slot</span>
        </div>
      );
    }

    if (!selectedMembership) {
      return (
        <button
          onClick={() => onSelectSlot?.(selectedTurn)}
          disabled={isSelectingSlot}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-brand-accent py-3 text-xs font-bold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent-hover active:scale-95 disabled:opacity-50"
        >
          <HandCoins className="h-4 w-4" />
          <span>
            {isSelectingSlot ? "Selecting..." : `Select Slot #${selectedTurn}`}
          </span>
        </button>
      );
    }

    return (
      <TurnActionWaitingState
        icon={<Lock className="h-3.5 w-3.5" />}
        message={`Claimed by ${selectedMembership.user?.name || "Member"}`}
      />
    );
  }

  if (isSelectedTurnReceived) {
    return (
      <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-success/25 bg-success-bg py-3 text-xs font-bold text-success">
        <CheckCircle2 className="h-4 w-4" />
        <span>Payout Received & Confirmed for Turn #{selectedTurn}</span>
      </div>
    );
  }

  if (isRoundAllContributionsPaid && isCurrentTurn) {
    if (!isOrganizer) {
      return (
        <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-brand-accent/20 bg-brand-accent/10 px-2 py-3 text-center text-xs font-bold text-brand-accent">
          <Hourglass className="h-4 w-4 shrink-0" />
          <span>
            All Contributions Collected • Waiting for Organizer to Release Payout
          </span>
        </div>
      );
    }

    return (
      <DisbursePayoutAction
        group={group}
        currentRound={currentRound}
        currentCycle={currentCycle}
        selectedMemberName={selectedMemberName}
        selectedMembership={selectedMembership}
        selectedTurn={selectedTurn}
        poolTotal={poolTotal}
        isDisbursingPayout={isDisbursingPayout}
        onDisbursePayout={onDisbursePayout}
      />
    );
  }

  if (!isCurrentTurn) {
    return (
      <TurnActionWaitingState
        icon={<Clock className="h-3.5 w-3.5" />}
        message={`Turn #${selectedTurn} Details`}
      />
    );
  }

  if (isSelectedPaid) {
    return (
      <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-success/25 bg-success-bg py-3 text-xs font-bold text-success">
        <ShieldCheck className="h-4 w-4" />
        <span>Your Contribution is Verified (Turn #{selectedTurn})</span>
      </div>
    );
  }

  if (isSelectedPending) {
    return (
      <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-warning/25 bg-warning-bg py-3 text-xs font-bold text-warning">
        <Clock className="h-4 w-4" />
        <span>Payment Pending Organizer Approval</span>
      </div>
    );
  }

  const canSubmitContribution =
    isUserSlotOwner ||
    (!isOrganizer && selectedMembership?.userId === currentUserId);

  if (canSubmitContribution) {
    return (
      <SubmitContributionAction
        currentRound={currentRound}
        group={group}
        contributionAmount={contributionAmount}
        currentUserId={currentUserId}
        calculatedPayoutDate={calculatedPayoutDate}
        isSelectedRejected={isSelectedRejected}
        hasCurrentMemberPaidOrganizerFee={hasCurrentMemberPaidOrganizerFee}
      />
    );
  }

  if (isSelectedRejected) {
    return (
      <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-danger-border bg-danger-bg py-3 text-xs font-bold text-danger">
        <AlertCircle className="h-4 w-4" />
        <span>Payment Rejected • Awaiting Member Re-submission</span>
      </div>
    );
  }

  return (
    <TurnActionWaitingState
      icon={<Clock className="h-3.5 w-3.5" />}
      message={
        isOrganizer
          ? "Collecting Contributions • Payout unlocks once all members contribute"
          : "Awaiting Member Contribution"
      }
    />
  );
}
