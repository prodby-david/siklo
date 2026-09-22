"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { GroupHeroProps } from "../../types/group.types";
import PaymentSubmissionModal from "@/features/payments/components/modals/PaymentSubmissionModal";
import EditGroupModal from "../modals/EditGroupModal";
import GroupHeroCompletedBadge from "./elements/GroupHeroCompletedBadge";
import GroupHeroInviteCodeCard from "./elements/GroupHeroInviteCodeCard";
import GroupHeroWisdomQuoteCard from "./elements/GroupHeroWisdomQuoteCard";
import GroupHeroHeader from "./elements/GroupHeroHeader";
import GroupHeroActions from "./elements/GroupHeroActions";

export default function GroupHero({
  groupId,
  name,
  description,
  billingCycle,
  inviteCode,
  copied,
  onCopyInviteCode,
  hasStarted,
  isCycleDone = false,
  isOrganizer = false,
  isOrganizerParticipating = true,
  isUserMember = true,
  allowedMethods = ["E_WALLET", "BANK_TRANSFER", "CASH"],
  organizerPaymentDetails,
  contributionAmount = 1000,
  organizerFeeAmount = 0,
  hasAlreadyPaidOrganizerFee = false,
  gracePeriodDays = 0,
  latePenaltyAmount = 0,
  roundId = "",
  maxMembers = 6,
  payoutSequence = "MANUAL",
  isCurrentUserPaid = false,
  isCurrentUserPending = false,
  currentTurn = 1,
  nextPayoutee,
}: GroupHeroProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const billingLabel =
    BILLING_CYCLE_LABELS[billingCycle as keyof typeof BILLING_CYCLE_LABELS] ||
    billingCycle;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-winner-payout-bg p-4 sm:p-6 md:p-8 shadow-sm backdrop-blur-md">
      <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 pointer-events-none">
        <RotateCw className="w-32 h-32 text-brand-accent" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <GroupHeroHeader
            name={name}
            description={description}
            billingLabel={billingLabel}
            hasStarted={hasStarted}
            isCycleDone={isCycleDone}
            isOrganizer={isOrganizer}
            onOpenEdit={() => setIsEditModalOpen(true)}
          />

          <GroupHeroActions
            hasStarted={hasStarted}
            isCycleDone={isCycleDone}
            isOrganizer={isOrganizer}
            isOrganizerParticipating={isOrganizerParticipating}
            isCurrentUserPaid={isCurrentUserPaid}
            isCurrentUserPending={isCurrentUserPending}
            roundId={roundId}
            isUserMember={isUserMember}
            currentTurn={currentTurn}
            onOpenPay={() => setIsPayModalOpen(true)}
          />
        </div>

        {isCycleDone ? (
          <GroupHeroCompletedBadge />
        ) : isOrganizer && !hasStarted && inviteCode ? (
          <GroupHeroInviteCodeCard
            inviteCode={inviteCode}
            copied={copied}
            onCopyInviteCode={onCopyInviteCode}
          />
        ) : (
          <GroupHeroWisdomQuoteCard />
        )}
      </div>

      {roundId && isPayModalOpen && (
        <PaymentSubmissionModal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          roundId={roundId}
          baseAmount={contributionAmount}
          organizerFeeAmount={organizerFeeAmount}
          isOrganizer={isOrganizer}
          hasAlreadyPaidOrganizerFee={hasAlreadyPaidOrganizerFee}
          targetDueDate={nextPayoutee?.payoutDate}
          gracePeriodDays={gracePeriodDays}
          latePenaltyRate={latePenaltyAmount}
          allowedMethods={allowedMethods}
          organizerPaymentDetails={organizerPaymentDetails}
        />
      )}

      {groupId && isEditModalOpen && (
        <EditGroupModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          groupId={groupId}
          initialData={{
            name,
            description,
            contributionAmount,
            maxMembers,
            gracePeriodDays,
            latePenaltyAmount,
            allowedPaymentMethods: allowedMethods,
            paymentDetails: organizerPaymentDetails,
            billingCycle,
            payoutSequence,
          }}
        />
      )}
    </div>
  );
}
