"use client";

import React from "react";
import formatDate from "@/shared/utils/formatDate";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Clock,
  Calendar,
  CheckCircle2,
  HandCoins,
  UserX,
  Crown,
} from "lucide-react";
import { TurnDetailPanelProps } from "@/features/groups/types/showcase.types";

const getInitials = (name: string) => {
  if (!name || name === "Unassigned Slot" || name === "Open Slot") return "SL";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function TurnDetailPanel({
  selectedTurn,
  selectedMemberName,
  selectedMembership,
  isSelectedPaid,
  calculatedPayoutDate,
  group,
  isOrganizer,
  isCurrentTurn,
  isCycleDone,
  currentCycle,
  onMarkAsPaid,
  isMarkingPaid,
  hasStarted = false,
  currentUserId,
  onSelectSlot,
  isSelectingSlot = false,
  onRemoveMember,
  isRemovingMember = false,
}: TurnDetailPanelProps) {
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
              : "Contributions for this round are verified in real time by the group organizer."}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/60">
        {isCycleDone ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Cycle Completed</span>
          </div>
        ) : !hasStarted ? (
          group.payoutSequence === "FREECHOOSING" ? (
            isUserSlotOwner ? (
              <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-emerald-600 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
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
        ) : isOrganizer ? (
          isSelectedPaid ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-emerald-600 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Marked as Paid for Cycle #{currentCycle}</span>
            </div>
          ) : selectedMembership ? (
            <button
              onClick={onMarkAsPaid}
              disabled={isMarkingPaid}
              className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {isMarkingPaid
                  ? "Verifying..."
                  : `Mark as Paid (Cycle ${currentCycle})`}
              </span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
              <Lock className="w-3.5 h-3.5" />
              <span>Slot Unassigned</span>
            </div>
          )
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Organizer Action Required</span>
          </div>
        )}
      </div>
    </div>
  );
}
