import {
  AlertCircle,
  Award,
  CheckCircle2,
  Clock,
  HandCoins,
  ShieldCheck,
} from "lucide-react";

interface TurnPaymentStatusPanelProps {
  selectedTurn: number;
  selectedMemberName: string;
  currentTurn?: number;
  contributionAmount: number;
  poolTotal: number;
  hasStarted: boolean;
  hasSelectedMembership: boolean;
  isCurrentBeneficiary: boolean;
  isSelectedTurnReceived: boolean;
  isSelectedTurnDisbursed: boolean;
  isSelectedPaid: boolean;
  isSelectedPending: boolean;
  isSelectedRejected: boolean;
}

export default function TurnPaymentStatusPanel({
  selectedTurn,
  selectedMemberName,
  currentTurn,
  contributionAmount,
  poolTotal,
  hasStarted,
  hasSelectedMembership,
  isCurrentBeneficiary,
  isSelectedTurnReceived,
  isSelectedTurnDisbursed,
  isSelectedPaid,
  isSelectedPending,
  isSelectedRejected,
}: TurnPaymentStatusPanelProps) {
  if (!hasStarted) return null;

  if (isCurrentBeneficiary) {
    return (
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
    );
  }

  if (isSelectedTurnReceived) {
    return (
      <div className="space-y-1 rounded-2xl border border-success/30 bg-success-bg p-3.5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
          <span className="text-xs font-bold text-success">
            Turn #{selectedTurn} Payout: Received & Completed
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          {selectedMemberName} has successfully received and confirmed the ₱
          {poolTotal.toLocaleString()} pooled payout for this turn.
        </p>
      </div>
    );
  }

  if (isSelectedTurnDisbursed) {
    return (
      <div className="space-y-1 rounded-2xl border border-winner-payout/30 bg-winner-payout-bg p-3.5">
        <div className="flex items-center gap-2">
          <HandCoins className="h-4 w-4 shrink-0 text-winner-payout" />
          <span className="text-xs font-bold text-winner-payout">
            Turn #{selectedTurn} Payout: Disbursed
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          Organizer has released the payout. Awaiting confirmation of receipt.
        </p>
      </div>
    );
  }

  if (isSelectedPaid) {
    return (
      <div className="space-y-1 rounded-2xl border border-success/30 bg-success-bg p-3.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
          <span className="text-xs font-bold text-success">
            Turn #{currentTurn} Contribution: Paid & Verified
          </span>
        </div>
        <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
          Contribution of ₱{contributionAmount.toLocaleString()} is confirmed and
          recorded on the ledger.
        </p>
      </div>
    );
  }

  if (isSelectedPending) {
    return (
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
  }

  if (isSelectedRejected) {
    return (
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
  }

  if (!hasSelectedMembership) return null;

  return (
    <div className="space-y-1 rounded-2xl border border-neutral-border/60 bg-background/80 p-3.5">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 shrink-0 text-neutral-subtext" />
        <span className="text-xs font-bold text-neutral-subtext">
          Turn #{currentTurn} Contribution: Unpaid
        </span>
      </div>
      <p className="text-[11px] font-normal leading-relaxed text-neutral-subtext">
        ₱{contributionAmount.toLocaleString()} contribution is due for the active
        turn.
      </p>
    </div>
  );
}
