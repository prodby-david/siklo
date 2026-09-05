import { BILLING_CYCLE_LABELS } from "@siklo/shared-schemas";
import type { BillingCycle, PayoutSequence } from "@siklo/shared-schemas";
import PayoutSequenceSelector from "./PayoutSequenceSelector";

interface EditGroupScheduleFieldsProps {
  billingCycle: BillingCycle;
  payoutSequence: PayoutSequence;
  isSubmitting: boolean;
  onBillingCycleChange: (cycle: BillingCycle) => void;
  onPayoutSequenceChange: (sequence: PayoutSequence) => void;
}

export default function EditGroupScheduleFields({
  billingCycle,
  payoutSequence,
  isSubmitting,
  onBillingCycleChange,
  onPayoutSequenceChange,
}: EditGroupScheduleFieldsProps) {
  return (
    <>
      <PayoutSequenceSelector
        selectedSequence={payoutSequence}
        isPending={isSubmitting}
        onSelectSequence={onPayoutSequenceChange}
      />

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-subtext">
          Billing Cycle
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {Object.entries(BILLING_CYCLE_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              disabled={isSubmitting}
              onClick={() => onBillingCycleChange(key as BillingCycle)}
              className={`cursor-pointer rounded-2xl border p-2.5 text-center text-xs font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                billingCycle === key
                  ? "border-brand-accent bg-brand-accent text-brand-accent-foreground shadow-xs"
                  : "border-neutral-border bg-background text-neutral-subtext hover:border-brand-accent/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
