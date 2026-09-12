import {
  UserCheck,
  Clock,
  HandCoins,
  UserX,
  Crown,
  CheckCircle2,
} from "lucide-react";
import type { TurnDetailBeneficiaryProps } from "@/features/groups/types/showcase.types";

export default function TurnDetailBeneficiary({
  selectedMemberName,
  initials,
  selectedMembership,
  isSlotOrganizer,
  isUserSlotOwner,
  isRemovableMember,
  isRemovingMember,
  feeAmount,
  hasSelectedMemberPaidOrganizerFee,
  selectedTurn,
  onRemoveMember,
}: TurnDetailBeneficiaryProps) {
  return (
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
            <span>{isRemovingMember ? "Removing..." : "Remove Member"}</span>
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
  );
}
