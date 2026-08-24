"use client";

import { useState } from "react";
import formatDate from "@/shared/utils/formatDate";
import {
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Lock,
  Clock,
  Calendar,
  HandCoins,
  UserX,
  Crown,
  CreditCard,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { TurnDetailPanelProps } from "@/features/groups/types/showcase.types";
import { getInitials } from "@/features/groups/utils/group.helper";
import PaymentSubmissionModal from "@/features/payments/components/modals/PaymentSubmissionModal";
import DisbursePayoutModal from "@/features/payments/components/modals/DisbursePayoutModal";
import ConfirmPayoutReceiptModal from "@/features/payments/components/modals/ConfirmPayoutReceiptModal";
import TurnPaidBadge from "../elements/TurnPaidBadge";

export default function TurnDetailPanel({
  selectedTurn,
  selectedMemberName,
  selectedMembership,
  isSelectedPaid,
  isSelectedPending = false,
  isSelectedRejected = false,
  calculatedPayoutDate,
  group,
  isOrganizer,
  isCurrentTurn = false,
  isCycleDone,
  currentCycle,
  hasStarted = false,
  currentUserId,
  onSelectSlot,
  isSelectingSlot = false,
  onRemoveMember,
  isRemovingMember = false,
  isRoundAllContributionsPaid = false,
  isRoundDisbursed = false,
  isRoundConfirmed = false,
  onDisbursePayout,
  isDisbursingPayout = false,
  onConfirmPayoutReceipt,
  isConfirmingPayoutReceipt = false,
  onRefresh,
}: TurnDetailPanelProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
  const [isConfirmReceiptModalOpen, setIsConfirmReceiptModalOpen] = useState(false);
  const contributionNum = Number(group.contributionAmount) || 0;
  const poolTotal = contributionNum * group.maxMembers;
  const isUserSlotOwner =
    currentUserId && selectedMembership?.userId === currentUserId;
  const isSlotOrganizer =
    selectedMembership &&
    group.organizerId &&
    selectedMembership.userId === group.organizerId;
  const isRemovableMember =
    isOrganizer &&
    !hasStarted &&
    selectedMembership &&
    selectedMembership.userId !== currentUserId;

  const initials = getInitials(selectedMemberName);

  return (
    <div className="lg:col-span-7 border border-neutral-border/80 rounded-3xl p-6 sm:p-8 bg-card flex flex-col justify-between gap-6 shadow-xs">
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3.5">
          <span className="text-xs font-black uppercase tracking-wider text-brand-accent bg-brand-accent/15 px-3 py-1 rounded-xl border border-brand-accent/25">
            Turn Details #{selectedTurn}
          </span>
          <span className="text-xs text-neutral-subtext font-bold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-subtext" /> Cycle{" "}
            {currentCycle} Payout
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-accent/15 text-brand-accent font-black text-base border border-brand-accent/25 shrink-0">
              {initials}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-accent">
                Beneficiary & Role
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-foreground leading-tight">
                {selectedMemberName}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {isRemovableMember && (
              <button
                onClick={() => onRemoveMember?.(selectedMembership.userId)}
                disabled={isRemovingMember}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                title="Remove Member from Group"
              >
                <UserX className="w-3 h-3" />
                <span>
                  {isRemovingMember ? "Removing..." : "Remove Member"}
                </span>
              </button>
            )}

            {isSlotOrganizer ? (
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-500" /> Group Organizer (Admin)
              </span>
            ) : selectedMembership ? (
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/25 flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                {isUserSlotOwner ? "You (Member)" : "Circle Saver (Member)"}
              </span>
            ) : (
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-neutral-table-stripe text-neutral-subtext border border-neutral-border flex items-center gap-1">
                <HandCoins className="w-3 h-3" /> Open Slot #{selectedTurn}
              </span>
            )}
          </div>
        </div>

        <div className="divide-y divide-neutral-border/60 text-xs sm:text-sm pt-2">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-neutral-subtext font-medium">
              Payout Queue Position
            </span>
            <span className="font-extrabold text-foreground">
              Turn #{selectedTurn} of {group.maxMembers}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-neutral-subtext font-medium">
              Individual Contribution
            </span>
            <span className="font-extrabold text-foreground">
              ₱{contributionNum.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-neutral-subtext font-medium">
              Total Lump Sum Payout
            </span>
            <span className="font-black text-brand-accent text-base sm:text-lg">
              ₱{poolTotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-neutral-subtext font-medium">
              Target Payout Date
            </span>
            <span className="font-bold text-foreground">
              {calculatedPayoutDate ? formatDate(calculatedPayoutDate) : "Not started"}
            </span>
          </div>
        </div>

        {isRoundConfirmed ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 sm:p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Payout Received & Confirmed (₱{poolTotal.toLocaleString()})
              </span>
            </div>
            <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
              {selectedMemberName} has confirmed receiving the ₱{poolTotal.toLocaleString()} pooled payout for Turn #{selectedTurn}.
            </p>
          </div>
        ) : isRoundDisbursed ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 sm:p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                Payout Disbursed (Awaiting Recipient Confirmation)
              </span>
            </div>
            <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
              Organizer has disbursed ₱{poolTotal.toLocaleString()} to {selectedMemberName}. Awaiting confirmation to complete Turn #{selectedTurn}.
            </p>
          </div>
        ) : isRoundAllContributionsPaid && isCurrentTurn ? (
          <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-3.5 sm:p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-accent shrink-0" />
              <span className="text-xs font-bold text-brand-accent">
                All Contributions Collected for Turn #{selectedTurn}
              </span>
            </div>
            <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
              All members completed verified contributions for Turn #{selectedTurn}. The ₱{poolTotal.toLocaleString()} pool is ready for payout release.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-border/60 bg-background/80 p-3.5 sm:p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
              <span className="text-xs font-bold text-brand-accent">
                Ledger Verification
              </span>
            </div>
            <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
              {isCycleDone
                ? "All contributions for this cycle have been fully collected and verified."
                : isSelectedPaid
                ? "Payment for this cycle has been confirmed and verified on the ledger."
                : isSelectedPending
                ? "Payment has been submitted and is awaiting verification by the organizer."
                : isSelectedRejected
                ? "Previous payment was rejected. Please review and re-submit contribution."
                : "Contributions for this round are verified on the organizer verification queue."}
            </p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-neutral-border/60">
        {isCycleDone ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Cycle Completed</span>
          </div>
        ) : isRoundConfirmed ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-2xl border border-emerald-500/25">
            <ShieldCheck className="w-4 h-4" />
            <span>Payout Received & Confirmed (₱{poolTotal.toLocaleString()})</span>
          </div>
        ) : !hasStarted ? (
          group.payoutSequence === "FREECHOOSING" ? (
            isUserSlotOwner ? (
              <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-emerald-600 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Your Chosen Slot</span>
              </div>
            ) : !selectedMembership ? (
              <button
                onClick={() => onSelectSlot?.(selectedTurn)}
                disabled={isSelectingSlot}
                className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <HandCoins className="w-4 h-4" />
                <span>
                  {isSelectingSlot
                    ? "Selecting..."
                    : `Select Slot #${selectedTurn}`}
                </span>
              </button>
            ) : (
              <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
                <Lock className="w-3.5 h-3.5" />
                <span>Claimed by {selectedMembership.user.name}</span>
              </div>
            )
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
              <Clock className="w-3.5 h-3.5" />
              <span>Cycle Not Started (Payment Verification Inactive)</span>
            </div>
          )
        ) : isRoundDisbursed ? (
          isUserSlotOwner ? (
            <>
              <button
                onClick={() => setIsConfirmReceiptModalOpen(true)}
                disabled={isConfirmingPayoutReceipt}
                className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isConfirmingPayoutReceipt
                    ? "Confirming..."
                    : `Confirm Payout Received (₱${poolTotal.toLocaleString()})`}
                </span>
              </button>

              {group.id && isConfirmReceiptModalOpen && (
                <ConfirmPayoutReceiptModal
                  isOpen={isConfirmReceiptModalOpen}
                  onClose={() => setIsConfirmReceiptModalOpen(false)}
                  groupId={group.id}
                  roundId={
                    group.rounds?.find(
                      (r) =>
                        r.cycleNumber === currentCycle &&
                        r.roundNumber === selectedTurn,
                    )?.id
                  }
                  cycleNumber={currentCycle}
                  turnNumber={selectedTurn}
                  poolTotal={poolTotal}
                  onConfirmReceipt={async (data) => {
                    if (onConfirmPayoutReceipt)
                      await onConfirmPayoutReceipt(data);
                  }}
                  isConfirming={isConfirmingPayoutReceipt}
                />
              )}
            </>
          ) : isOrganizer ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>Disbursed • Awaiting Member Confirmation</span>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
              <Clock className="w-3.5 h-3.5" />
              <span>Disbursed • Awaiting Member Confirmation</span>
            </div>
          )
        ) : isRoundAllContributionsPaid && isCurrentTurn ? (
          isOrganizer ? (
            <>
              <button
                onClick={() => setIsDisburseModalOpen(true)}
                disabled={isDisbursingPayout}
                className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-white bg-brand-accent hover:bg-brand-accent-hover rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <HandCoins className="w-4 h-4" />
                <span>
                  {isDisbursingPayout
                    ? "Disbursing..."
                    : `Disburse Payout & Notify Member (₱${poolTotal.toLocaleString()})`}
                </span>
              </button>

              {group.id && isDisburseModalOpen && (
                <DisbursePayoutModal
                  isOpen={isDisburseModalOpen}
                  onClose={() => setIsDisburseModalOpen(false)}
                  groupId={group.id}
                  roundId={
                    group.rounds?.find(
                      (r) =>
                        r.cycleNumber === currentCycle &&
                        r.roundNumber === selectedTurn,
                    )?.id || ""
                  }
                  cycleNumber={currentCycle}
                  recipientName={selectedMemberName}
                  recipientPaymentMethod={
                    selectedMembership?.preferredPaymentMethod
                  }
                  recipientAccountDetails={
                    selectedMembership?.paymentAccountDetails
                  }
                  turnNumber={selectedTurn}
                  poolTotal={poolTotal}
                  onDisburse={async (data) => {
                    if (onDisbursePayout) await onDisbursePayout(data);
                  }}
                  isDisbursing={isDisbursingPayout}
                />
              )}
            </>
          ) : isUserSlotOwner ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-brand-accent bg-brand-accent/10 rounded-2xl border border-brand-accent/20">
              <Sparkles className="w-4 h-4" />
              <span>All Contributions Collected • Awaiting Organizer Disbursement</span>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>All Contributions Collected • Awaiting Disbursement</span>
            </div>
          )
        ) : isSelectedPaid ? (
          <TurnPaidBadge currentCycle={currentCycle} isOrganizer={isOrganizer} />
        ) : isSelectedPending ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-2xl border border-amber-500/25">
            <Clock className="w-4 h-4" />
            <span>Payment Pending Verification</span>
          </div>
        ) : isUserSlotOwner ? (
          <>
            {isSelectedRejected && (
              <div className="mb-2 p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-center gap-2 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Previous payment was rejected. Please re-submit valid proof.</span>
              </div>
            )}
            <button
              onClick={() => setIsPayModalOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isSelectedRejected ? "Re-submit Contribution" : `Pay Contribution (Cycle #${currentCycle})`}</span>
            </button>

            {group.id && isPayModalOpen && (
              <PaymentSubmissionModal
                isOpen={isPayModalOpen}
                onClose={() => setIsPayModalOpen(false)}
                groupId={group.id}
                roundId={
                  group.rounds?.find(
                    (r) =>
                      r.cycleNumber === currentCycle &&
                      r.roundNumber === selectedTurn,
                  )?.id || "current"
                }
                cycleNumber={currentCycle}
                turnNumber={selectedTurn}
                baseAmount={contributionNum}
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
        ) : isSelectedRejected ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 rounded-2xl border border-rose-500/25">
            <AlertCircle className="w-4 h-4" />
            <span>Payment Rejected • Awaiting Member Re-submission</span>
          </div>
        ) : selectedMembership ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
            <Clock className="w-3.5 h-3.5" />
            <span>Awaiting Member Contribution</span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Slot Unassigned</span>
          </div>
        )}
      </div>
    </div>
  );
}
