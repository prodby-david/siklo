"use client";

import formatDate from "@/shared/utils/formatDate";
import { PhilippinePeso, ShieldCheck, UserCheck, Lock, Clock, Calendar, CheckCircle2, HandCoins, UserX, Crown, Shield } from "lucide-react";
import { TurnDetailPanelProps } from "@/features/groups/types/showcase.types";

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
  const isUserSlotOwner = currentUserId && selectedMembership?.userId === currentUserId;
  const isSlotOrganizer =
    selectedMembership &&
    group.organizerId &&
    selectedMembership.userId === group.organizerId;
  const isRemovableMember =
    isOrganizer &&
    !hasStarted &&
    selectedMembership &&
    selectedMembership.userId !== currentUserId;

  return (
    <div className="lg:col-span-5 border border-neutral-border rounded-2xl p-5 bg-neutral-table-stripe/40 flex flex-col justify-between gap-5">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-xl">
            Turn Details #{selectedTurn}
          </span>
          <span className="text-[10px] text-neutral-subtext font-semibold flex items-center gap-1">
            <Calendar className="w-3 h-3 text-neutral-subtext" /> Cycle {currentCycle} Payout
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-subtext">
              Beneficiary & Role
            </span>
            {isRemovableMember && (
              <button
                onClick={() => onRemoveMember?.(selectedMembership.userId)}
                disabled={isRemovingMember}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                title="Remove Member from Group"
              >
                <UserX className="w-3 h-3" />
                <span>{isRemovingMember ? "Removing..." : "Remove Member"}</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-lg font-black text-foreground flex items-center gap-2">
              {selectedMemberName}
            </p>
            {isSlotOrganizer ? (
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-500" /> Group Organizer (Admin)
              </span>
            ) : selectedMembership ? (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/25 flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                {isUserSlotOwner ? "You (Member)" : "Circle Saver (Member)"}
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-table-stripe text-neutral-subtext border border-neutral-border flex items-center gap-1">
                <HandCoins className="w-3 h-3" /> Open Slot #{selectedTurn}
              </span>
            )}
          </div>

          <div className="text-[11px] p-2.5 rounded-xl border bg-background/80 text-neutral-subtext leading-relaxed font-medium">
            {isSlotOrganizer ? (
              <p className="flex items-center gap-1.5 text-foreground font-semibold">
                <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Group Lead & Circle Organizer. Manages rotations and verifies member payments.
              </p>
            ) : selectedMembership ? (
              <p className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                Active circle saver. Contributes ₱{contributionNum.toLocaleString()} per cycle.
              </p>
            ) : (
              <p className="flex items-center gap-1.5 italic">
                <Clock className="w-3.5 h-3.5 text-neutral-subtext shrink-0" />
                Unclaimed rotation slot. Available for new members to join.
              </p>
            )}
          </div>
        </div>

        {isCycleDone ? (
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Total Payout Disbursed
              </span>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
                <PhilippinePeso className="w-3.5 h-3.5" />
                {poolTotal.toLocaleString()}
              </p>
              <span className="text-[9px] text-emerald-600/80 dark:text-emerald-400/80 block mt-0.5 font-medium">
                Full payout collected & verified
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Completion Status
              </span>
              <p className="text-xs font-bold text-foreground mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                Cycle Completed
              </p>
              <span className="text-[9px] text-neutral-subtext block mt-0.5">
                {calculatedPayoutDate ? formatDate(calculatedPayoutDate) : "All Turns Received"}
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-background border border-neutral-border/60">
            <div>
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                Estimated Payout
              </span>
              <p className="text-sm font-extrabold text-brand-accent flex items-center gap-0.5 mt-0.5">
                <PhilippinePeso className="w-3.5 h-3.5" />
                {poolTotal.toLocaleString()}
              </p>
              <span className="text-[9px] text-neutral-subtext block mt-0.5">
                ₱{contributionNum.toLocaleString()} × {group.maxMembers} members
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                Target Payout Date
              </span>
              <p className="text-xs font-bold text-foreground mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-subtext" />
                {calculatedPayoutDate ? formatDate(calculatedPayoutDate) : "Not started"}
              </p>
              <span className="text-[9px] text-neutral-subtext block mt-0.5 uppercase font-bold">
                {group.billingCycle} Cycle
              </span>
            </div>
          </div>
        )}

        <div className="space-y-1 pt-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-subtext">
            Verification Status
          </span>
          {isCycleDone ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold">
                Turn Completed & Verified
              </span>
            </div>
          ) : isSelectedPaid ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold">
                Payment verified for Cycle #{currentCycle}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold">
                Payout pending verification for Cycle #{currentCycle}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-border/60">
        {isCycleDone ? (
          <div className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-xl border border-neutral-border/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Cycle Completed</span>
          </div>
        ) : !hasStarted ? (
          group.payoutSequence === "FREECHOOSING" ? (
            isUserSlotOwner ? (
              <div className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your Chosen Slot</span>
              </div>
            ) : !selectedMembership ? (
              <button
                onClick={() => onSelectSlot?.(selectedTurn)}
                disabled={isSelectingSlot}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <HandCoins className="w-4 h-4" />
                <span>{isSelectingSlot ? "Selecting..." : `Select Slot #${selectedTurn}`}</span>
              </button>
            ) : (
              <div className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-xl border border-neutral-border/60">
                <Lock className="w-3.5 h-3.5" />
                <span>Claimed by {selectedMembership.user.name}</span>
              </div>
            )
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-xl border border-neutral-border/60">
              <Clock className="w-3.5 h-3.5" />
              <span>Cycle Not Started (Payment Verification Inactive)</span>
            </div>
          )
        ) : isOrganizer ? (
          isSelectedPaid ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Marked as Paid for Cycle #{currentCycle}</span>
            </div>
          ) : selectedMembership ? (
            <button
              onClick={onMarkAsPaid}
              disabled={isMarkingPaid}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {isMarkingPaid ? "Verifying..." : `Mark as Paid (Cycle ${currentCycle})`}
              </span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-xl border border-neutral-border/60">
              <Lock className="w-3.5 h-3.5" />
              <span>Slot Unassigned</span>
            </div>
          )
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-neutral-subtext bg-neutral-table-stripe rounded-xl border border-neutral-border/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Organizer Action Required</span>
          </div>
        )}
      </div>
    </div>
  );
}
