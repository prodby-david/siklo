import type { ReactNode } from "react";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Clock,
  HandCoins,
  ShieldCheck,
} from "lucide-react";
import type { TurnPaymentStatusPanelProps } from "@/features/groups/types/showcase.types";

export default function TurnPaymentStatusPanel({
  selectedTurn,
  selectedMemberName,
  currentTurn,
  contributionAmount,
  poolTotal,
  hasStarted,
  hasSelectedMembership,
  isCurrentBeneficiary,
  isSelectedMemberOrganizer,
  isSelectedTurnReceived,
  isSelectedTurnDisbursed,
  isSelectedPaid,
  isSelectedPending,
  isSelectedRejected,
  isOrganizerSelfAttested,
  daysOverdue = 0,
  accruedPenalty = 0,
  paidPenalty = 0,
}: TurnPaymentStatusPanelProps) {
  if (!hasStarted) return null;

  if (isSelectedTurnReceived) {
    return (
      <div className="space-y-1 rounded-2xl border border-success/30 bg-success-bg p-3.5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
          <span className="text-xs font-bold text-success">
            {isSelectedMemberOrganizer
              ? `Turn #${selectedTurn} Organizer Payout: Self-Confirmed`
              : `Turn #${selectedTurn} Payout: Received & Completed`}
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          {isSelectedMemberOrganizer
            ? `The organizer self-confirmed receipt of the ₱${poolTotal.toLocaleString()} pooled payout.`
            : `${selectedMemberName} confirmed receipt of the ₱${poolTotal.toLocaleString()} pooled payout.`}
        </p>
      </div>
    );
  }

  let contributionStatus: ReactNode = null;

  if (isSelectedPaid) {
    contributionStatus = (
      <div className="space-y-1 rounded-2xl border border-success/30 bg-success-bg p-3.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
          <span className="text-xs font-bold text-success">
            {isOrganizerSelfAttested
              ? `Turn #${currentTurn} Organizer Contribution: Self-Declared`
              : `Turn #${currentTurn} Contribution: Paid & Verified`}
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          {isOrganizerSelfAttested
            ? `The organizer recorded their ₱${contributionAmount.toLocaleString()} contribution. It was not independently verified.`
            : `Contribution of ₱${contributionAmount.toLocaleString()}${
                paidPenalty > 0
                  ? `, including ₱${paidPenalty.toLocaleString()} late penalty`
                  : ""
              }, is confirmed and recorded on the ledger.`}
        </p>
      </div>
    );
  } else if (isSelectedPending) {
    contributionStatus = (
      <div className="space-y-1 rounded-2xl border border-warning/30 bg-warning-bg p-3.5">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-warning" />
          <span className="text-xs font-bold text-warning">
            Turn #{currentTurn} Contribution: Pending Verification
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          Payment proof has been submitted and is currently awaiting organizer
          approval.
        </p>
      </div>
    );
  } else if (isSelectedRejected) {
    contributionStatus = (
      <div className="space-y-1 rounded-2xl border border-danger-border bg-danger-bg p-3.5">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-danger" />
          <span className="text-xs font-bold text-danger">
            Turn #{currentTurn} Contribution: Rejected
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          Previous payment proof was rejected. Please review and re-submit.
        </p>
      </div>
    );
  } else if (hasSelectedMembership && daysOverdue > 0 && accruedPenalty > 0) {
    contributionStatus = (
      <div className="space-y-1.5 rounded-2xl border border-warning/30 bg-warning-bg p-3.5">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-warning" />
          <span className="text-xs font-bold text-warning">
            Turn #{currentTurn} Contribution: Overdue ({daysOverdue}d)
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          Contribution of ₱{contributionAmount.toLocaleString()} is {daysOverdue}{" "}
          day{daysOverdue > 1 ? "s" : ""} overdue. A late penalty of ₱
          {accruedPenalty.toLocaleString()} has accrued (Total Due: ₱
          {(contributionAmount + accruedPenalty).toLocaleString()}).
        </p>
      </div>
    );
  } else if (hasSelectedMembership) {
    contributionStatus = (
      <div className="space-y-1 rounded-2xl border border-neutral-border/60 bg-card p-3.5">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-neutral-subtext" />
          <span className="text-xs font-bold text-neutral-subtext">
            Turn #{currentTurn} Contribution: Unpaid
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          ₱{contributionAmount.toLocaleString()} contribution is due for the
          active turn.
        </p>
      </div>
    );
  }

  if (
    !isCurrentBeneficiary &&
    !isSelectedTurnDisbursed &&
    !contributionStatus
  ) {
    return null;
  }

  return (
    <div className="space-y-2">
      {isCurrentBeneficiary && (
        <div className="space-y-1 rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-3.5">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 shrink-0 text-brand-accent" />
            <span className="text-xs font-bold text-brand-accent">
              Current Turn #{currentTurn} Beneficiary
            </span>
          </div>
          <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
            {selectedMemberName} is scheduled to receive the ₱
            {poolTotal.toLocaleString()} pooled lump-sum payout for Turn #
            {currentTurn}.
          </p>
        </div>
      )}

      {isSelectedTurnDisbursed && (
        <div className="space-y-1 rounded-2xl border border-winner-payout/30 bg-winner-payout-bg p-3.5">
          <div className="flex items-center gap-2">
            <HandCoins className="h-4 w-4 shrink-0 text-winner-payout" />
            <span className="text-xs font-bold text-winner-payout">
              Turn #{selectedTurn} Payout: Disbursed
            </span>
          </div>
          <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
            {isSelectedMemberOrganizer
              ? "The organizer released the payout to themselves. Awaiting organizer self-confirmation."
              : "The organizer released the payout. Awaiting beneficiary confirmation."}
          </p>
        </div>
      )}

      {contributionStatus}
    </div>
  );
}
