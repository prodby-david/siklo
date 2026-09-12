"use client";

import { useState } from "react";
import { AlertCircle, CreditCard } from "lucide-react";
import PaymentSubmissionModal from "@/features/payments/components/modals/PaymentSubmissionModal";
import type { SubmitContributionActionProps } from "@/features/groups/types/showcase.types";

export default function SubmitContributionAction({
  currentRound,
  group,
  contributionAmount,
  currentUserId,
  calculatedPayoutDate,
  isSelectedRejected,
  hasCurrentMemberPaidOrganizerFee,
}: SubmitContributionActionProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

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
        />
      )}
    </>
  );
}
