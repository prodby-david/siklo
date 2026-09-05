"use client";

import { useState, useMemo } from "react";
import formatDate from "@/shared/utils/formatDate";
import {
  UserCheck,
  Clock,
  Calendar,
  HandCoins,
  UserX,
  Crown,
  Award,
  Receipt,
  CheckCircle2,
} from "lucide-react";
import { TurnDetailPanelProps } from "@/features/groups/types/showcase.types";
import { getInitials } from "@/features/groups/utils/groupHelpers";
import MemberPaymentHistoryModal from "@/features/groups/components/modals/MemberPaymentHistoryModal";
import TurnPaymentStatusPanel from "./TurnPaymentStatusPanel";
import TurnActionPanel from "./TurnActionPanel";

export default function TurnDetailPanel({
  selectedTurn,
  selectedMemberName,
  selectedMembership,
  isSelectedPaid,
  isSelectedPending = false,
  isSelectedRejected = false,
  isSelectedTurnReceived = false,
  isSelectedTurnDisbursed = false,
  calculatedPayoutDate,
  group,
  isOrganizer,
  isCurrentTurn = false,
  isCycleDone,
  currentCycle,
  currentTurn,
  hasStarted = false,
  currentUserId,
  hasSelectedMemberPaidOrganizerFee = false,
  hasCurrentMemberPaidOrganizerFee = false,
  onSelectSlot,
  isSelectingSlot = false,
  onRemoveMember,
  isRemovingMember = false,
  isRoundAllContributionsPaid = false,
  onDisbursePayout,
  isDisbursingPayout = false,
  onRefresh,
}: TurnDetailPanelProps) {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

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

  const currentRound = group.rounds?.find(
    (round) =>
      round.cycleNumber === currentCycle &&
      round.roundNumber === currentTurn,
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

  const initials = getInitials(selectedMemberName);
  const feeAmount = group.organizerFeeAmount || 0;

  return (
    <div className="lg:col-span-7 border border-neutral-border/80 rounded-3xl p-5 sm:p-7 bg-card flex flex-col justify-between gap-5 shadow-xs">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black uppercase tracking-wider text-brand-accent bg-brand-accent/15 px-3 py-1 rounded-xl border border-brand-accent/25">
              Turn Details #{selectedTurn}
            </span>
            {hasStarted && isSelectedTurnReceived && (
              <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-success">
                <CheckCircle2 className="h-3 w-3 text-success" /> Received
              </span>
            )}
            {hasStarted && isSelectedTurnDisbursed && !isSelectedTurnReceived && (
              <span className="flex items-center gap-1 rounded-full border border-winner-payout/30 bg-winner-payout-bg px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-winner-payout">
                <HandCoins className="h-3 w-3 text-winner-payout" /> Disbursed
              </span>
            )}
            {hasStarted && isCurrentBeneficiary && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-accent bg-brand-accent/15 border border-brand-accent/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3 text-brand-accent" /> Receiving Now
              </span>
            )}
          </div>
          <span className="text-xs text-neutral-subtext font-bold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-subtext" /> Cycle{" "}
            {currentCycle} Payout
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-accent/15 text-brand-accent font-black text-base border border-brand-accent/25 shrink-0">
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
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-danger-border bg-danger-bg px-2.5 py-1 text-[10px] font-bold text-danger transition-all hover:opacity-80 active:scale-95 disabled:opacity-50"
                title="Remove Member from Group"
              >
                <UserX className="w-3 h-3" />
                <span>
                  {isRemovingMember ? "Removing..." : "Remove Member"}
                </span>
              </button>
            )}

            {isSlotOrganizer ? (
              <span className="flex items-center gap-1 rounded-full border border-warning/30 bg-warning-bg px-3 py-1 text-[10px] font-extrabold text-warning">
                <Crown className="h-3 w-3 text-warning" /> Group Organizer (Admin)
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

            {selectedMembership && feeAmount > 0 && (
              isSlotOrganizer ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-table-stripe text-neutral-subtext border border-neutral-border/60">
                  Organizer (Exempt)
                </span>
              ) : hasSelectedMemberPaidOrganizerFee ? (
                <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2 py-0.5 text-[10px] font-bold text-success">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span>Fee Paid (₱{feeAmount.toLocaleString()})</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full border border-warning/30 bg-warning-bg px-2 py-0.5 text-[10px] font-bold text-warning">
                  <Clock className="h-3 w-3 text-warning" />
                  <span>Fee Unpaid (₱{feeAmount.toLocaleString()})</span>
                </span>
              )
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

        <TurnPaymentStatusPanel
          selectedTurn={selectedTurn}
          selectedMemberName={selectedMemberName}
          currentTurn={currentTurn}
          contributionAmount={contributionNum}
          poolTotal={poolTotal}
          hasStarted={hasStarted}
          hasSelectedMembership={Boolean(selectedMembership)}
          isCurrentBeneficiary={isCurrentBeneficiary}
          isSelectedTurnReceived={isSelectedTurnReceived}
          isSelectedTurnDisbursed={isSelectedTurnDisbursed}
          isSelectedPaid={isSelectedPaid}
          isSelectedPending={isSelectedPending}
          isSelectedRejected={isSelectedRejected}
        />

        {selectedMembership && (
          <div className="flex items-center justify-between p-3 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/50">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-brand-accent" />
              <span className="text-xs font-bold text-foreground">
                Payment History
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsHistoryModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-accent/25 bg-brand-accent/10 hover:bg-brand-accent/20 text-xs font-bold text-brand-accent transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <span>View Records ({memberPayments.length})</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-neutral-border/60 pt-2">
        <TurnActionPanel
          selectedTurn={selectedTurn}
          selectedMemberName={selectedMemberName}
          selectedMembership={selectedMembership}
          currentRound={currentRound}
          group={group}
          currentCycle={currentCycle}
          currentUserId={currentUserId}
          calculatedPayoutDate={calculatedPayoutDate}
          contributionAmount={contributionNum}
          poolTotal={poolTotal}
          isOrganizer={isOrganizer}
          isCurrentTurn={isCurrentTurn}
          isCycleDone={isCycleDone}
          hasStarted={hasStarted}
          isUserSlotOwner={isUserSlotOwner}
          isSelectedTurnReceived={isSelectedTurnReceived}
          isSelectedPaid={isSelectedPaid}
          isSelectedPending={isSelectedPending}
          isSelectedRejected={isSelectedRejected}
          hasCurrentMemberPaidOrganizerFee={
            hasCurrentMemberPaidOrganizerFee
          }
          isRoundAllContributionsPaid={isRoundAllContributionsPaid}
          isSelectingSlot={isSelectingSlot}
          isDisbursingPayout={isDisbursingPayout}
          onSelectSlot={onSelectSlot}
          onDisbursePayout={onDisbursePayout}
          onRefresh={onRefresh}
        />
      </div>

      {isHistoryModalOpen && (
        <MemberPaymentHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          memberName={selectedMemberName}
          payments={memberPayments}
          rounds={group.rounds}
          currentCycle={currentCycle}
          selectedTurn={selectedTurn}
        />
      )}
    </div>
  );
}
