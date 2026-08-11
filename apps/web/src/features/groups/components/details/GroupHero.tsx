"use client";

import { useState } from "react";
import {
  RotateCw,
  Check,
  Copy,
  Lock,
  CreditCard,
  Wallet,
  Settings,
} from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { GroupHeroProps } from "../../types/group.types";
import PaymentSubmissionModal from "../modal/PaymentSubmissionModal";
import MemberPaymentPreferenceModal from "../modal/MemberPaymentPreferenceModal";
import EditGroupModal from "../modal/EditGroupModal";

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
  backupFundAmount = 0,
  roundId = "",
  currentMemberMethod,
  currentMemberAccountDetails,
  maxMembers = 6,
  payoutSequence = "MANUAL",
  enableBackupFund = false,
  onRefresh,
}: GroupHeroProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
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

            {!isCycleDone && (
              <button
                type="button"
                onClick={() => setIsPrefModalOpen(true)}
                className="inline-flex items-center gap-2 bg-background border border-neutral-border hover:border-brand-accent/40 text-foreground px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
              >
                <Wallet className="w-4 h-4 text-brand-accent" />
                <span>Payout Receiving Details</span>
              </button>
            )}
          </div>
        </div>

        {isOrganizer && (
          <>
            {isCycleDone ? (
              <div className="flex flex-col gap-1.5 bg-neutral-table-stripe/80 border border-neutral-border/80 p-4 rounded-2xl min-w-[260px] shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext flex items-center gap-1">
                  <Lock className="w-3 h-3 text-neutral-subtext" /> Group Invite Closed
                </span>
                <span className="text-xs font-bold text-foreground">
                  Invites Disabled
                </span>
                <span className="text-[10px] text-neutral-subtext leading-relaxed">
                  This cycle has ended. New members cannot join completed groups.
                </span>
              </div>
            ) : hasStarted || !inviteCode ? (
              <div className="flex flex-col gap-1.5 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl min-w-[260px] shadow-sm">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-500" /> Invites Disabled
                </span>
                <span className="text-xs font-bold text-foreground">
                  Cycle Has Started
                </span>
                <span className="text-[10px] text-neutral-subtext leading-relaxed">
                  You can no longer invite new members once the group cycle has started.
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm border border-neutral-border p-4 rounded-2xl min-w-[260px] shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
                  Organizer Invite Code
                </span>
                <div className="flex items-center justify-between bg-neutral-subtext/5 rounded-2xl p-2.5 border border-neutral-border/50">
                  <code className="font-mono text-sm font-bold tracking-wider text-foreground select-all">
                    {inviteCode}
                  </code>
                  <button
                    onClick={onCopyInviteCode}
                    className="p-1.5 rounded-2xl hover:bg-neutral-subtext/10 text-brand-accent hover:text-brand-accent-hover transition-all duration-150 active:scale-95 cursor-pointer"
                    title="Copy Code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <span className="text-[10px] text-neutral-subtext leading-relaxed">
                  Share this invite code with members. Once the cycle starts, inviting new members will be disabled.
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {groupId && isPayModalOpen && (
        <PaymentSubmissionModal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          groupId={groupId}
          roundId={roundId || "current"}
          baseAmount={contributionAmount}
          lateFee={latePenaltyAmount}
          backupFundAmount={backupFundAmount}
          allowedMethods={allowedMethods}
          organizerPaymentDetails={organizerPaymentDetails}
          onSuccess={onRefresh}
        />
      )}

      {groupId && isPrefModalOpen && (
        <MemberPaymentPreferenceModal
          isOpen={isPrefModalOpen}
          onClose={() => setIsPrefModalOpen(false)}
          groupId={groupId}
          allowedMethods={allowedMethods}
          initialMethod={currentMemberMethod}
          initialDetails={currentMemberAccountDetails}
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
            enableBackupFund,
            backupFundPerTurn: backupFundAmount,
            billingCycle,
            payoutSequence,
          }}
          onSuccess={onRefresh}
        />
      )}
    </div>
  );
}
