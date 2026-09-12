import { Clock, CreditCard, Crown, ShieldCheck } from "lucide-react";
import formatDate from "@/shared/utils/formatDate";
import type { GroupHeroActionsProps } from "../../../types/group.types";

export default function GroupHeroActions({
  hasStarted,
  isCycleDone = false,
  isOrganizer = false,
  isOrganizerParticipating = true,
  isCurrentUserPaid = false,
  isCurrentUserPending = false,
  roundId = "",
  isUserMember = true,
  currentTurn = 1,
  nextPayoutee,
  onOpenPay,
}: GroupHeroActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      {isCycleDone ? (
        <div className="flex items-center gap-1.5 rounded-2xl border border-success/25 bg-success-bg px-4 py-2 text-xs font-bold text-success">
          <ShieldCheck className="w-4 h-4" />
          <span>All Cycle Rotations Completed</span>
        </div>
      ) : hasStarted ? (
        isOrganizer && !isOrganizerParticipating ? (
          <div className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-brand-accent bg-brand-accent/10 rounded-2xl border border-brand-accent/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Facilitating Turn #{currentTurn}</span>
          </div>
        ) : isCurrentUserPaid ? (
          <div className="flex items-center gap-1.5 rounded-2xl border border-success/25 bg-success-bg px-4 py-2 text-xs font-bold text-success">
            <ShieldCheck className="w-4 h-4" />
            <span>Turn #{currentTurn} Contribution Paid</span>
          </div>
        ) : isCurrentUserPending ? (
          <div className="flex items-center gap-1.5 rounded-2xl border border-warning/25 bg-warning-bg px-4 py-2 text-xs font-bold text-warning">
            <Clock className="w-4 h-4" />
            <span>Contribution Awaiting Verification</span>
          </div>
        ) : roundId && isUserMember ? (
          <button
            onClick={onOpenPay}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Contribution (Turn #{currentTurn})</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 rounded-2xl border border-danger-border bg-danger-bg px-4 py-2 text-xs font-bold text-danger">
            <Clock className="w-4 h-4" />
            <span>Current contribution round is unavailable</span>
          </div>
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
    </div>
  );
}
