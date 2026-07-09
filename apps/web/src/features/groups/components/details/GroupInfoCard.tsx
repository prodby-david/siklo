import { Info } from "lucide-react";
import formatDate from "@/shared/utils/formatDate";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { PAYOUT_SEQUENCE_LABELS } from "../../constants/payout-sequence.constants";

interface GroupInfoCardProps {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  totalDays: number;
  billingCycle: string;
  payoutSequence: string;
  organizerId: string;
}

export default function GroupInfoCard({
  startDate,
  endDate,
  totalDays,
  billingCycle,
  payoutSequence,
  organizerId,
}: GroupInfoCardProps) {
  const billingLabel =
    BILLING_CYCLE_LABELS[billingCycle as keyof typeof BILLING_CYCLE_LABELS] ||
    billingCycle;
  const sequenceLabel =
    PAYOUT_SEQUENCE_LABELS[payoutSequence as keyof typeof PAYOUT_SEQUENCE_LABELS] ||
    payoutSequence;

  return (
    <div className="p-6 border border-neutral-border rounded-2xl bg-background shadow-sm space-y-4">
      <h3 className="text-md font-bold text-foreground border-b border-neutral-border pb-3 flex items-center gap-2">
        <Info className="w-4 h-4 text-brand-accent" /> Group Details
      </h3>
      <div className="space-y-3.5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Start Date</span>
          <span className="font-semibold text-foreground">
            {startDate ? formatDate(startDate) : "Pending (Not Started)"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Est. End Date</span>
          <span className="font-semibold text-foreground">
            {endDate ? formatDate(endDate) : "Pending"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Est. Duration</span>
          <span className="font-semibold text-foreground">
            {totalDays} day(s)
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Payout Frequency</span>
          <span className="font-semibold text-brand-accent">{billingLabel}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Payout Sequence</span>
          <span className="font-semibold text-foreground">{sequenceLabel}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-neutral-border/50">
          <span className="text-neutral-subtext">Organizer ID</span>
          <span
            className="font-mono text-xs text-neutral-subtext truncate max-w-[120px]"
            title={organizerId}
          >
            {organizerId}
          </span>
        </div>
      </div>
    </div>
  );
}
