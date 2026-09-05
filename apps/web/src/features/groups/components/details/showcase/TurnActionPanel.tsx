"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  HandCoins,
  Hourglass,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type { DisbursePayoutDTO } from "@siklo/shared-schemas";
import PaymentSubmissionModal from "@/features/payments/components/modals/PaymentSubmissionModal";
import DisbursePayoutModal from "@/features/payments/components/modals/DisbursePayoutModal";
import type { GroupRound, Membership } from "@/features/groups/types/group.types";
import type { TurnDetailGroup } from "@/features/groups/types/showcase.types";

interface TurnActionPanelProps {
  selectedTurn: number;
  selectedMemberName: string;
  selectedMembership?: Membership;
  currentRound?: GroupRound;
  group: TurnDetailGroup;
  currentCycle: number;
  currentUserId?: string;
  calculatedPayoutDate: Date | null;
  contributionAmount: number;
  poolTotal: number;
  isOrganizer: boolean;
  isCurrentTurn: boolean;
  isCycleDone: boolean;
  hasStarted: boolean;
  isUserSlotOwner: boolean;
  isSelectedTurnReceived: boolean;
  isSelectedPaid: boolean;
  isSelectedPending: boolean;
  isSelectedRejected: boolean;
  hasCurrentMemberPaidOrganizerFee: boolean;
  isRoundAllContributionsPaid: boolean;
  isSelectingSlot: boolean;
  isDisbursingPayout: boolean;
  onSelectSlot?: (position: number) => Promise<void>;
  onDisbursePayout?: (data: {
    referenceNumber: string;
    proofUrl: string;
  }) => Promise<void>;
  onRefresh?: () => void;
}

const WAITING_STATE_CLASS_NAME =
  "flex w-full items-center justify-center gap-1.5 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe py-3 text-xs font-bold text-neutral-subtext";

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
  onRefresh,
}: TurnActionPanelProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);

  if (isCycleDone) {
    return (
      <div className={WAITING_STATE_CLASS_NAME}>
        <Lock className="h-3.5 w-3.5" />
        <span>Cycle Completed</span>
      </div>
    );
  }

  if (!hasStarted) {
    if (group.payoutSequence !== "FREECHOOSING") {
      return (
        <div className={WAITING_STATE_CLASS_NAME}>
          <Clock className="h-3.5 w-3.5" />
          <span>Cycle Not Started • Waiting for Organizer</span>
        </div>
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
      <div className={WAITING_STATE_CLASS_NAME}>
        <Lock className="h-3.5 w-3.5" />
        <span>Claimed by {selectedMembership.user?.name || "Member"}</span>
      </div>
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
            All Contributions Collected • Waiting for Organizer to Release
            Payout
          </span>
        </div>
      );
    }

    return (
      <>
        <button
          onClick={() => setIsDisburseModalOpen(true)}
          disabled={isDisbursingPayout}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-brand-accent py-3 text-xs font-bold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent-hover active:scale-95 disabled:opacity-50"
        >
          <HandCoins className="h-4 w-4" />
          <span>
            {isDisbursingPayout
              ? "Disbursing..."
              : selectedTurn === group.maxMembers
                ? `Release Final Payout & Complete Group (₱${poolTotal.toLocaleString()})`
                : `Release Payout & Start Turn #${selectedTurn + 1} (₱${poolTotal.toLocaleString()})`}
          </span>
        </button>

        {group.id && isDisburseModalOpen && currentRound && (
          <DisbursePayoutModal
            isOpen={isDisburseModalOpen}
            onClose={() => setIsDisburseModalOpen(false)}
            groupId={group.id}
            roundId={currentRound.id}
            cycleNumber={currentCycle}
            recipientName={selectedMemberName}
            recipientPaymentAccounts={selectedMembership?.user?.paymentAccounts}
            recipientPaymentMethod={selectedMembership?.preferredPaymentMethod}
            recipientAccountDetails={selectedMembership?.paymentAccountDetails}
            turnNumber={selectedTurn}
            poolTotal={poolTotal}
            onDisburse={async (data: DisbursePayoutDTO) => {
              if (onDisbursePayout) {
                await onDisbursePayout({
                  referenceNumber: data.referenceNumber || "",
                  proofUrl: data.proofUrl || "",
                });
              }
            }}
            isDisbursing={isDisbursingPayout}
          />
        )}
      </>
    );
  }

  if (!isCurrentTurn) {
    return (
      <div className={WAITING_STATE_CLASS_NAME}>
        <Clock className="h-3.5 w-3.5" />
        <span>Turn #{selectedTurn} Details</span>
      </div>
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
    if (!currentRound) {
      return (
        <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-danger-border bg-danger-bg px-3 py-3 text-center text-xs font-bold text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            Current contribution round is unavailable. Please refresh the group.
          </span>
        </div>
      );
    }

    return (
      <>
        {isSelectedRejected && (
          <div className="mb-2 flex items-center gap-2 rounded-xl border border-danger-border bg-danger-bg p-2.5 text-[11px] font-semibold text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              Previous payment was rejected. Please re-submit valid proof.
            </span>
          </div>
        )}
        <button
          onClick={() => setIsPayModalOpen(true)}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-brand-accent py-3 text-xs font-bold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent-hover active:scale-95"
        >
          <CreditCard className="h-4 w-4" />
          <span>
            {isSelectedRejected
              ? "Re-submit Contribution"
              : `Pay Contribution (₱${contributionAmount.toLocaleString()})`}
          </span>
        </button>

        {isPayModalOpen && (
          <PaymentSubmissionModal
            isOpen={isPayModalOpen}
            onClose={() => setIsPayModalOpen(false)}
            roundId={currentRound.id}
            baseAmount={contributionAmount}
            organizerFeeAmount={group.organizerFeeAmount}
            isOrganizer={currentUserId === group.organizerId}
            hasAlreadyPaidOrganizerFee={hasCurrentMemberPaidOrganizerFee}
            targetDueDate={calculatedPayoutDate}
            gracePeriodDays={group.gracePeriodDays ?? 0}
            latePenaltyRate={group.latePenaltyAmount ?? 0}
            allowedMethods={
              group.allowedPaymentMethods || [
                "E_WALLET",
                "BANK_TRANSFER",
                "CASH",
              ]
            }
            organizerPaymentDetails={group.paymentDetails}
            onSuccess={() => {
              setIsPayModalOpen(false);
              onRefresh?.();
            }}
          />
        )}
      </>
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
    <div className={WAITING_STATE_CLASS_NAME}>
      <Clock className="h-3.5 w-3.5" />
      <span>
        {isOrganizer
          ? "Collecting Contributions • Payout unlocks once all members contribute"
          : "Awaiting Member Contribution"}
      </span>
    </div>
  );
}
