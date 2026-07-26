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
import { CreateGroupFormFieldsProps } from "@/features/groups/types/create.group.field";
import useCreateGroupFormFields from "../../hooks/useCreateGroupFormFields";
import { BILLING_CYCLE_LABELS } from "@siklo/shared-schemas";

export default function CreateGroupFormFields(
  props: CreateGroupFormFieldsProps,
) {
  const {
    register,
    errors,
    isPending,
    handleSubmit,
    selectedBillingCycle,
    handleBillingCycleSelect,
  } = useCreateGroupFormFields(props);

  const preventDecimal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "." || e.key === "," || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  return (
    <div className="lg:col-span-7 w-full">
      <div className="w-full bg-background border border-neutral-border rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="mb-6 pb-4 border-b border-neutral-border/60">
          <h2 className="text-xl font-bold text-foreground">
            Create New Group
          </h2>
          <p className="text-xs text-neutral-subtext mt-1">
            Set up your Paluwagan cycle rules, contribution amount, and total
            members.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="name"
            labelText="Group Name"
            placeholder="e.g. Family Savings 2026"
            {...register("name")}
            errors={errors}
            disabled={isPending}
            icon={<Users className="w-4 h-4 text-neutral-subtext" />}
          />

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
              Description (Optional)
            </label>
            <div className="relative flex items-start">
              <span className="absolute left-3.5 top-3 text-neutral-subtext pointer-events-none">
                <FileText className="w-4 h-4" />
              </span>
              <textarea
                {...register("description")}
                placeholder="Briefly describe the goal or rules for this savings group..."
                rows={3}
                disabled={isPending}
                className="w-full py-2.5 pl-10 pr-3.5 text-xs font-medium border border-neutral-border rounded-2xl bg-background/60 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent focus:bg-background text-foreground transition-all duration-200 resize-none disabled:bg-muted disabled:cursor-not-allowed"
              />
            </div>
            {errors.description && (
              <p className="text-danger text-[10px] font-medium mt-0.5">
                {errors.description.message}
              </p>
            )}
          </div>

          <Input
            label="maxMembers"
            labelText="Group Members"
            placeholder="3 - 15"
            type="number"
            min={3}
            max={15}
            step={1}
            onKeyDown={preventDecimal}
            {...register("maxMembers", { valueAsNumber: true })}
            errors={errors}
            disabled={isPending}
            icon={<Users className="w-4 h-4 text-neutral-subtext" />}
          />

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
                  className={`py-2.5 px-2 text-xs font-bold rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedBillingCycle === key
                      ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                      : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40 hover:text-foreground"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="contributionAmount"
              labelText="Contribution Amount (₱)"
              placeholder="1000"
              type="number"
              min={1}
              step={1}
              onKeyDown={preventDecimal}
              {...register("contributionAmount", { valueAsNumber: true })}
              errors={errors}
              disabled={isPending}
              icon={<PhilippinePeso className="w-4 h-4 text-neutral-subtext" />}
            />

            <Input
              label="cycleDuration"
              labelText="Cycle Duration (Rotations)"
              placeholder="1 - 10"
              type="number"
              min={1}
              max={10}
              step={1}
              onKeyDown={preventDecimal}
              {...register("cycleDuration", { valueAsNumber: true })}
              errors={errors}
              disabled={isPending}
              icon={<RefreshCw className="w-4 h-4 text-neutral-subtext" />}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-brand-accent hover:bg-brand-accent-hover text-white py-3 rounded-2xl font-extrabold active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Creating Group...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-white" />
                <span>Create Group</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
