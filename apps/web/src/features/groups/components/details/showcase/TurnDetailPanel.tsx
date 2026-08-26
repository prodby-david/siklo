"use client";

import { useState, useMemo } from "react";
import formatDate from "@/shared/utils/formatDate";
import {
  ShieldCheck,
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
  Receipt,
} from "lucide-react";
import { TurnDetailPanelProps } from "@/features/groups/types/showcase.types";
import { getInitials } from "@/features/groups/utils/group.helper";
import PaymentSubmissionModal from "@/features/payments/components/modals/PaymentSubmissionModal";
import DisbursePayoutModal from "@/features/payments/components/modals/DisbursePayoutModal";

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
  currentTurn,
  onJumpToCurrentTurn,
  hasStarted = false,
  currentUserId,
  onSelectSlot,
  isSelectingSlot = false,
  onRemoveMember,
  isRemovingMember = false,
  isRoundAllContributionsPaid = false,
  onDisbursePayout,
  isDisbursingPayout = false,
  onRefresh,
}: TurnDetailPanelProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
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

  const getPaymentRoundInfo = (roundId: string) => {
    const round = group.rounds?.find((r) => r.id === roundId);
    return {
      cycleNumber: round?.cycleNumber ?? currentCycle,
      roundNumber: round?.roundNumber ?? selectedTurn,
    };
  };

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
            {isRemovableMember && selectedMembership && (
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

        <div className="divide-y divide-neutral-border/60 text-xs sm:text-sm pt-1">
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

        {hasStarted && (
          <div className="space-y-1.5">
            {isCurrentBeneficiary ? (
              <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-accent shrink-0" />
                  <span className="text-xs font-bold text-brand-accent">
                    Current Turn #{currentTurn} Beneficiary
                  </span>
                </div>
                <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
                  {selectedMemberName} is scheduled to receive the ₱{poolTotal.toLocaleString()} pooled lump-sum payout for Turn #{currentTurn}.
                </p>
              </div>
            ) : isSelectedPaid ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Turn #{currentTurn} Contribution: Paid & Verified
                  </span>
                </div>
                <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
                  Contribution of ₱{contributionNum.toLocaleString()} is confirmed and recorded on the ledger.
                </p>
              </div>
            ) : isSelectedPending ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    Turn #{currentTurn} Contribution: Pending Verification
                  </span>
                </div>
                <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
                  Payment proof has been submitted and is currently awaiting organizer approval.
                </p>
              </div>
            ) : isSelectedRejected ? (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    Turn #{currentTurn} Contribution: Rejected
                  </span>
                </div>
                <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
                  Previous payment proof was rejected. Please review and re-submit.
                </p>
              </div>
            ) : selectedMembership ? (
              <div className="rounded-2xl border border-neutral-border/60 bg-background/80 p-3.5 space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-subtext shrink-0" />
                  <span className="text-xs font-bold text-neutral-subtext">
                    Turn #{currentTurn} Contribution: Unpaid
                  </span>
                </div>
                <p className="text-[11px] text-neutral-subtext leading-relaxed font-normal">
                  ₱{contributionNum.toLocaleString()} contribution is due for the active turn.
                </p>
              </div>
            ) : null}
          </div>
        )}

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between border-b border-neutral-border/60 pb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-brand-accent" />
              Payment History ({memberPayments.length})
            </span>
            <span className="text-[11px] text-neutral-subtext font-semibold">
              {selectedMemberName}
            </span>
          </div>

          {memberPayments.length > 0 ? (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1 no-scrollbar">
              {memberPayments.map((p) => {
                const roundInfo = getPaymentRoundInfo(p.roundId);
                const isVerified = p.status === "VERIFIED";
                const isPending = p.status === "PENDING";

                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl border border-neutral-border/70 bg-background flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isVerified
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : isPending
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        #{roundInfo.roundNumber}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-foreground">
                            Cycle {roundInfo.cycleNumber} • Turn #{roundInfo.roundNumber}
                          </span>
                          <span className="text-[10px] text-neutral-subtext font-medium uppercase px-1.5 py-0.5 rounded-md bg-neutral-subtext/10">
                            {p.paymentMethod.replace("_", " ")}
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-subtext flex items-center gap-1.5">
                          <span>{p.createdAt ? formatDate(p.createdAt) : "Recently"}</span>
                          {p.referenceNumber && (
                            <span>• Ref: {p.referenceNumber}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      <span className="font-black text-foreground text-xs sm:text-sm">
                        ₱{p.totalAmount.toLocaleString()}
                      </span>
                      {isVerified ? (
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      ) : isPending ? (
                        <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                          <AlertCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl border border-neutral-border/60 bg-background/50 flex items-center justify-center gap-2 text-neutral-subtext text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>No payment records found for this member yet.</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/60 space-y-2">
        {currentTurn !== undefined && selectedTurn !== currentTurn && !isCycleDone && (
          <button
            onClick={onJumpToCurrentTurn}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-brand-accent bg-brand-accent/10 hover:bg-brand-accent/20 rounded-2xl border border-brand-accent/25 transition-all cursor-pointer"
          >
            <span>View Current Active Turn (Turn #{currentTurn})</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        )}

        {isCycleDone ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Cycle Completed</span>
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
                <span>Claimed by {selectedMembership?.user?.name || "Member"}</span>
              </div>
            )
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
              <Clock className="w-3.5 h-3.5" />
              <span>Cycle Not Started • Waiting for Organizer</span>
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
                    : selectedTurn === group.maxMembers
                    ? `Release Final Payout & Complete Group (₱${poolTotal.toLocaleString()})`
                    : `Release Payout & Start Turn #${selectedTurn + 1} (₱${poolTotal.toLocaleString()})`}
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
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-brand-accent bg-brand-accent/10 rounded-2xl border border-brand-accent/20 text-center px-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>All Contributions Collected • Waiting for Organizer to Release Payout</span>
            </div>
          )
        ) : isCurrentTurn ? (
          isSelectedPaid ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-2xl border border-emerald-500/25">
              <ShieldCheck className="w-4 h-4" />
              <span>Your Contribution is Verified (Turn #{selectedTurn})</span>
            </div>
          ) : isSelectedPending ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-2xl border border-amber-500/25">
              <Clock className="w-4 h-4" />
              <span>Payment Pending Organizer Approval</span>
            </div>
          ) : isUserSlotOwner || (!isOrganizer && selectedMembership?.userId === currentUserId) ? (
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
                <span>{isSelectedRejected ? "Re-submit Contribution" : `Pay Contribution (₱${contributionNum.toLocaleString()})`}</span>
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
          ) : isOrganizer ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
              <Clock className="w-3.5 h-3.5" />
              <span>Collecting Contributions • Payout unlocks once all members contribute</span>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
              <Clock className="w-3.5 h-3.5" />
              <span>Awaiting Member Contribution</span>
            </div>
          )
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
            <Clock className="w-3.5 h-3.5" />
            <span>Turn #{selectedTurn} Details</span>
          </div>
        )}
      </div>
    </div>
  );
}
