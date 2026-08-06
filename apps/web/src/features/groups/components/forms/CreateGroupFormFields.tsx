import Input from "@/shared/components/inputs/Input";
import {
  Users,
  Calendar,
  PhilippinePeso,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
} from "lucide-react";
import { CreateGroupFormFieldsProps } from "@/features/groups/types/create-group-field.types";
import useCreateGroupFormFields from "../../hooks/useCreateGroupFormFields";
import { BILLING_CYCLE_LABELS } from "@siklo/shared-schemas";
import PayoutSequenceSelector from "./PayoutSequenceSelector";

export default function CreateGroupFormFields(
  props: CreateGroupFormFieldsProps,
) {
  const {
    register,
    errors,
    selectedPayoutSequence,
    selectedBillingCycle,
    isPending,
    handleSubmit,
    handleBillingCycleSelect,
    handlePayoutSequenceSelect,
  } = useCreateGroupFormFields(props);

  return (
    <div className="lg:col-span-7 bg-background border border-neutral-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 pb-4 border-b border-neutral-border/60">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            Create Paluwagan Group
          </h2>
          <p className="text-xs text-neutral-subtext">
            Set up your group parameters, contribution amount, and payout rotation rules.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="name"
            labelText="Group Name"
            placeholder="e.g. Office Savings Pool"
            disabled={isPending}
            {...register("name")}
            errors={errors}
            icon={<FileText className="w-4 h-4 text-neutral-subtext" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="contributionAmount"
              labelText="Contribution Amount (₱)"
              placeholder="5000"
              type="number"
              disabled={isPending}
              {...register("contributionAmount", { valueAsNumber: true })}
              errors={errors}
              icon={<PhilippinePeso className="w-4 h-4 text-neutral-subtext" />}
            />

            <Input
              label="maxMembers"
              labelText="Member Capacity (3 - 15)"
              placeholder="6"
              type="number"
              disabled={isPending}
              {...register("maxMembers", { valueAsNumber: true })}
              errors={errors}
              icon={<Users className="w-4 h-4 text-neutral-subtext" />}
            />
          </div>

          <PayoutSequenceSelector
            selectedSequence={selectedPayoutSequence}
            isPending={isPending}
            onSelectSequence={handlePayoutSequenceSelect}
          />
          <input type="hidden" {...register("payoutSequence")} />
          {errors.payoutSequence && (
            <p className="text-danger text-[10px] font-medium mt-0.5">
              {errors.payoutSequence.message}
            </p>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
              Billing Cycle
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(BILLING_CYCLE_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  disabled={isPending}
                  onClick={() => handleBillingCycleSelect(key)}
                  className={`p-2.5 text-center rounded-2xl border text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedBillingCycle === key
                      ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                      : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("billingCycle")} />
            {errors.billingCycle && (
              <p className="text-danger text-[10px] font-medium mt-0.5">
                {errors.billingCycle.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-border/60 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-extrabold rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Creating Group...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Create Paluwagan Group
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
