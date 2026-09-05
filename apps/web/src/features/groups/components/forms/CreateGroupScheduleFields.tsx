import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { BILLING_CYCLE_LABELS } from "@siklo/shared-schemas";
import type { CreateGroupData } from "../../validator/create-group.validator";
import PayoutSequenceSelector from "./PayoutSequenceSelector";

interface CreateGroupScheduleFieldsProps {
  register: UseFormRegister<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
  selectedPayoutSequence: string;
  selectedBillingCycle: string;
  isPending: boolean;
  onSelectPayoutSequence: (
    sequence: "RANDOM" | "MANUAL" | "FREECHOOSING",
  ) => void;
  onSelectBillingCycle: (cycle: string) => void;
}

export default function CreateGroupScheduleFields({
  register,
  errors,
  selectedPayoutSequence,
  selectedBillingCycle,
  isPending,
  onSelectPayoutSequence,
  onSelectBillingCycle,
}: CreateGroupScheduleFieldsProps) {
  return (
    <>
      <PayoutSequenceSelector
        selectedSequence={selectedPayoutSequence}
        isPending={isPending}
        onSelectSequence={onSelectPayoutSequence}
      />
      <input type="hidden" {...register("payoutSequence")} />
      {errors.payoutSequence && (
        <p className="mt-0.5 text-[10px] font-medium text-danger">
          {errors.payoutSequence.message}
        </p>
      )}

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-subtext">
          Billing Cycle
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {Object.entries(BILLING_CYCLE_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              disabled={isPending}
              onClick={() => onSelectBillingCycle(key)}
              className={`cursor-pointer rounded-2xl border p-2.5 text-center text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                selectedBillingCycle === key
                  ? "border-brand-accent bg-brand-accent text-brand-accent-foreground shadow-xs"
                  : "border-neutral-border bg-background text-neutral-subtext hover:border-brand-accent/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input type="hidden" {...register("billingCycle")} />
        {errors.billingCycle && (
          <p className="mt-0.5 text-[10px] font-medium text-danger">
            {errors.billingCycle.message}
          </p>
        )}
      </div>
    </>
  );
}
