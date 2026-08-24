"use client";

import { useState } from "react";
import { RotateCw, CreditCard, Settings, ShieldCheck, Crown } from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { GroupHeroProps } from "../../types/group.types";
import formatDate from "@/shared/utils/formatDate";
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
  isCurrentUserPaid = false,
  currentCycle = 1,
  currentTurn = 1,
  nextPayoutee,
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
              {isCycleDone ? "Cycle Complete" : hasStarted ? "Active Cycle" : "Unstarted"}
            </span>

            <span className="rounded-full bg-neutral-table-stripe px-3 py-1 text-[10px] font-bold text-neutral-subtext uppercase tracking-wider border border-neutral-border">
              {billingLabel}
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              {name}
            </h1>
            {description ? (
              <p className="text-xs sm:text-sm text-neutral-subtext line-clamp-2">
                {description}
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-neutral-subtext italic">
                No description provided for this group.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {isCycleDone ? (
              <div className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>All Cycle Rotations Completed</span>
              </div>
            ) : hasStarted ? (
              isCurrentUserPaid ? (
                <div className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Turn #{currentTurn} Contribution Paid</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsPayModalOpen(true)}
                  className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-background px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Contribution (Turn #{currentTurn})</span>
                </button>
              )
            ) : (
              <div className="text-xs text-neutral-subtext">
                Waiting for organizer to start cycle...
              </div>
            )}

            {hasStarted && !isCycleDone && nextPayoutee && (
              <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-brand-accent bg-brand-accent/10 rounded-2xl border border-brand-accent/20">
                <Crown className="w-3.5 h-3.5" />
                <span>
                  Next Payoutee: {nextPayoutee.name} · Turn #
                  {nextPayoutee.roundNumber}
                  {nextPayoutee.payoutDate
                    ? ` · ${formatDate(nextPayoutee.payoutDate)}`
                    : ""}
                </span>
              </div>
            )}

            {isOrganizer && !hasStarted && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-neutral-subtext hover:text-foreground bg-background hover:bg-neutral-subtext/5 rounded-2xl border border-neutral-border transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
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
          cycleNumber={currentCycle}
          turnNumber={currentTurn}
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
