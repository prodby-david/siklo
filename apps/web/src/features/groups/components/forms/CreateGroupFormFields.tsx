import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { CreateGroupInput } from "@/features/groups/validator/create-group.validator";
import {
  BILLING_CYCLES,
  BILLING_CYCLE_LABELS,
} from "@/features/groups/constants/billing-cycle.constants";
import {
  PAYOUT_SEQUENCES,
  PAYOUT_SEQUENCE_LABELS,
  PAYOUT_SEQUENCE_DESCRIPTIONS,
} from "@/features/groups/constants/payout-sequence.constants";
import {
  Users,
  Clock,
  FileText,
  Loader2,
  Layers,
  ArrowRight,
  ChevronDown,
  Dices,
  UserCheck,
  MousePointerClick,
} from "lucide-react";

interface CreateGroupFormFieldsProps {
  register: UseFormRegister<CreateGroupInput>;
  errors: FieldErrors<CreateGroupInput>;
  payoutSequence: string;
  setValue: UseFormSetValue<CreateGroupInput>;
  isPending: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function CreateGroupFormFields({
  register,
  errors,
  payoutSequence,
  setValue,
  isPending,
  onSubmit,
}: CreateGroupFormFieldsProps) {
  return (
    <div className="lg:col-span-7 bg-background border border-neutral-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-brand-accent animate-pulse" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Create New Group
            </h2>
          </div>
          <p className="text-xs text-neutral-subtext">
            Set up your rotating savings and credit group (paluwagan). Define
            terms, cycles, and contributions.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                htmlFor="name"
                className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider"
              >
                Group Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70 pointer-events-none">
                  <Layers className="w-4 h-4" />
                </span>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Siklo Alpha Savings"
                  className={`w-full pl-9 pr-4 py-2 text-xs bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all duration-200 text-foreground ${
                    errors.name
                      ? "border-danger focus:ring-danger/20 focus:border-danger bg-danger-bg/5"
                      : "border-neutral-border"
                  }`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-danger text-[10px] font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                htmlFor="description"
                className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider"
              >
                Description (Optional)
              </label>
              <div className="relative">
                <span className="absolute top-3 left-0 pl-3 flex items-start text-neutral-subtext/70 pointer-events-none">
                  <FileText className="w-4 h-4" />
                </span>
                <textarea
                  id="description"
                  placeholder="Describe the group goals, payout rules, etc."
                  rows={3}
                  className={`w-full pl-9 pr-4 py-2 text-xs bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all duration-200 resize-none text-foreground ${
                    errors.description
                      ? "border-danger focus:ring-danger/20 focus:border-danger bg-danger-bg/5"
                      : "border-neutral-border"
                  }`}
                  {...register("description")}
                />
              </div>
              {errors.description && (
                <p className="text-danger text-[10px] font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contributionAmount"
                className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider"
              >
                Contribution Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70 pointer-events-none font-semibold text-xs">
                  ₱
                </span>
                <input
                  id="contributionAmount"
                  type="number"
                  placeholder="0.00"
                  step="any"
                  className={`w-full pl-8 pr-4 py-2 text-xs bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all duration-200 text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    errors.contributionAmount
                      ? "border-danger focus:ring-danger/20 focus:border-danger bg-danger-bg/5"
                      : "border-neutral-border"
                  }`}
                  {...register("contributionAmount")}
                />
              </div>
              {errors.contributionAmount && (
                <p className="text-danger text-[10px] font-medium">
                  {errors.contributionAmount.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cycleDuration"
                className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider"
              >
                Cycle Duration (Rounds)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70 pointer-events-none">
                  <Clock className="w-4 h-4" />
                </span>
                <input
                  id="cycleDuration"
                  type="number"
                  placeholder="10"
                  className={`w-full pl-9 pr-4 py-2 text-xs bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all duration-200 text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    errors.cycleDuration
                      ? "border-danger focus:ring-danger/20 focus:border-danger bg-danger-bg/5"
                      : "border-neutral-border"
                  }`}
                  {...register("cycleDuration")}
                />
              </div>
              {errors.cycleDuration && (
                <p className="text-danger text-[10px] font-medium">
                  {errors.cycleDuration.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="maxMembers"
                className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider"
              >
                Max Members
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70 pointer-events-none">
                  <Users className="w-4 h-4" />
                </span>
                <input
                  id="maxMembers"
                  type="number"
                  placeholder="10"
                  className={`w-full pl-9 pr-4 py-2 text-xs bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all duration-200 text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    errors.maxMembers
                      ? "border-danger focus:ring-danger/20 focus:border-danger bg-danger-bg/5"
                      : "border-neutral-border"
                  }`}
                  {...register("maxMembers")}
                />
              </div>
              {errors.maxMembers && (
                <p className="text-danger text-[10px] font-medium">
                  {errors.maxMembers.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="billingCycle"
                className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider"
              >
                Billing Cycle
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70 pointer-events-none">
                  <Clock className="w-4 h-4" />
                </span>
                <select
                  id="billingCycle"
                  className={`w-full pl-9 pr-10 py-2 text-xs bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all duration-200 text-foreground appearance-none cursor-pointer ${
                    errors.billingCycle
                      ? "border-danger focus:ring-danger/20 focus:border-danger bg-danger-bg/5"
                      : "border-neutral-border"
                  }`}
                  {...register("billingCycle")}
                >
                  {BILLING_CYCLES.map((cycle) => (
                    <option key={cycle} value={cycle}>
                      {BILLING_CYCLE_LABELS[cycle]}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-subtext/70 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </div>
              {errors.billingCycle && (
                <p className="text-danger text-[10px] font-medium">
                  {errors.billingCycle.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                Payout Sequence
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PAYOUT_SEQUENCES.map((value) => {
                  const option = {
                    value,
                    label: PAYOUT_SEQUENCE_LABELS[value],
                    description: PAYOUT_SEQUENCE_DESCRIPTIONS[value],
                  };
                  const isSelected = payoutSequence === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValue("payoutSequence", option.value)}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-150 cursor-pointer active:scale-95 ${
                        isSelected
                          ? "border-brand-accent/35 bg-brand-accent/5 text-foreground shadow-sm ring-1 ring-brand-accent/20"
                          : "border-neutral-border bg-background hover:bg-neutral-subtext/5 text-neutral-subtext"
                      }`}
                    >
                      {option.value === "MANUAL" && (
                        <UserCheck
                          className={`w-5 h-5 mb-2 ${
                            isSelected
                              ? "text-brand-accent"
                              : "text-neutral-subtext/75"
                          }`}
                        />
                      )}
                      {option.value === "RANDOM" && (
                        <Dices
                          className={`w-5 h-5 mb-2 ${
                            isSelected
                              ? "text-brand-accent"
                              : "text-neutral-subtext/75"
                          }`}
                        />
                      )}

                      {option.value === "FREECHOOSING" && (
                        <MousePointerClick
                          className={`w-5 h-5 mb-2 ${
                            isSelected
                              ? "text-brand-accent"
                              : "text-neutral-subtext/75"
                          }`}
                        />
                      )}
                      <span
                        className={`text-xs font-bold ${isSelected ? "text-brand-accent" : ""}`}
                      >
                        {option.label}
                      </span>
                      <span className="text-[9px] mt-1 opacity-70 leading-normal">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>
              <input type="hidden" {...register("payoutSequence")} />
              {errors.payoutSequence && (
                <p className="text-danger text-[10px] font-medium">
                  {errors.payoutSequence.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900 text-white py-3 rounded-2xl font-semibold active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 text-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
                Creating Group...
              </>
            ) : (
              <>
                Create Group
                <ArrowRight className="w-4 h-4 text-brand-accent" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
