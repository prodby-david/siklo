"use client";

import { useState } from "react";
import { RotateCw, CreditCard, Settings } from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { GroupHeroProps } from "../../types/group.types";
import PaymentSubmissionModal from "@/features/payments/components/modals/PaymentSubmissionModal";
import EditGroupModal from "../modals/EditGroupModal";
import GroupHeroCompletedBadge from "./elements/GroupHeroCompletedBadge";
import GroupHeroInviteCodeCard from "./elements/GroupHeroInviteCodeCard";
import GroupHeroWisdomQuoteCard from "./elements/GroupHeroWisdomQuoteCard";

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
  allowedMethods = ["E_WALLET", "BANK_TRANSFER", "CASH"],
  organizerPaymentDetails,
  contributionAmount = 1000,
  gracePeriodDays = 0,
  latePenaltyAmount = 0,
  roundId = "",
  maxMembers = 6,
  payoutSequence = "MANUAL",
  onRefresh,
}: GroupHeroProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const billingLabel =
    BILLING_CYCLE_LABELS[billingCycle as keyof typeof BILLING_CYCLE_LABELS] ||
    billingCycle;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-indigo-500/10 p-6 sm:p-8 backdrop-blur-md dark:from-brand-accent/10 dark:to-indigo-500/5 shadow-sm">
      <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 pointer-events-none">
        <RotateCw className="w-32 h-32 text-brand-accent" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                isCycleDone
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  : hasStarted
                  ? "bg-brand-accent/15 text-brand-accent"
                  : "bg-warning/15 text-warning"
              }`}
            >
              {isCycleDone ? (
                "Completed"
              ) : hasStarted ? (
                "Active"
              ) : (
                "Not Yet Started"
              )}
            </span>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
              {billingLabel} Cycle
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <span>{name}</span>
            {isOrganizer && !hasStarted && !isCycleDone && (
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-background border border-neutral-border hover:border-brand-accent/40 text-neutral-subtext hover:text-foreground text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                title="Edit Group Parameters"
              >
                <Settings className="w-3.5 h-3.5 text-brand-accent" />
                <span>Edit Group</span>
              </button>
            )}
          </h1>

          <div>
            {description ? (
              <p className="text-sm text-neutral-subtext leading-relaxed">
                {description}
              </p>
            ) : (
              <p className="text-sm text-neutral-subtext italic">
                No description provided for this group.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {hasStarted && !isCycleDone && (
              <button
                type="button"
                onClick={() => setIsPayModalOpen(true)}
                className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-background px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Contribution</span>
              </button>
            )}
          </div>
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

      {groupId && isPayModalOpen && (
        <PaymentSubmissionModal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          groupId={groupId}
          roundId={roundId || "current"}
          baseAmount={contributionAmount}
          gracePeriodDays={gracePeriodDays}
          latePenaltyRate={latePenaltyAmount}
          allowedMethods={allowedMethods}
          organizerPaymentDetails={organizerPaymentDetails}
          onSuccess={onRefresh}
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
          onSuccess={onRefresh}
        />
      )}
    </div>
  );
}
