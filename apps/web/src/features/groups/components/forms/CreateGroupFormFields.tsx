"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import {
  createGroupSchema,
  CreateGroupData,
  CreateGroupInput,
} from "../../validator/create-group.validator";
import useCreateGroup from "../../hooks/useCreateGroup";
import Input from "@/features/auth/signup/components/ui/Input";
import {
  Users,
  Calendar,
  PhilippinePeso,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
} from "lucide-react";

const MEMBERS_OPTIONS = [4, 6, 8, 10, 12, 15];

const BILLING_CYCLES = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "BIMONTHLY", label: "Semi-Monthly" },
  { value: "WEEKLY", label: "Weekly" },
] as const;

interface CreateGroupFormFieldsProps {
  register?: UseFormRegister<CreateGroupInput | CreateGroupData>;
  errors?: FieldErrors<CreateGroupInput | CreateGroupData>;
  payoutSequence?: string;
  setValue?: UseFormSetValue<CreateGroupInput | CreateGroupData>;
  isPending?: boolean;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
}

export default function CreateGroupFormFields(props: CreateGroupFormFieldsProps) {
  const internalForm = useForm<CreateGroupData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      maxMembers: 4,
      billingCycle: "MONTHLY",
      contributionAmount: 1000,
      cycleDuration: 1,
      payoutSequence: "MANUAL",
    },
  });

  const internalMutation = useCreateGroup();

  const register = (props.register || internalForm.register) as unknown as UseFormRegister<CreateGroupData>;
  const errors = (props.errors || internalForm.formState.errors) as unknown as FieldErrors<CreateGroupData>;
  const setValue = (props.setValue || internalForm.setValue) as unknown as UseFormSetValue<CreateGroupData>;
  const isPending = props.isPending ?? internalMutation.isPending;

  const handleSubmit = props.onSubmit
    ? (e: React.FormEvent) => {
        e.preventDefault();
        props.onSubmit?.(e);
      }
    : internalForm.handleSubmit((data: CreateGroupData) => internalMutation.mutate(data));

  const selectedMaxMembers = (internalForm.watch("maxMembers") || 4);
  const selectedBillingCycle = (internalForm.watch("billingCycle") || "MONTHLY");

  const handleMaxMembersSelect = (val: number) => {
    setValue("maxMembers", val, { shouldValidate: true });
  };

  const handleBillingCycleSelect = (val: "MONTHLY" | "BIMONTHLY" | "WEEKLY") => {
    setValue("billingCycle", val, { shouldValidate: true });
  };

  return (
    <div className="w-full flex justify-center py-6 px-4">
      <div className="w-full max-w-xl bg-background border border-neutral-border rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-4 border-b border-neutral-border/60">
          <h2 className="text-xl font-bold text-foreground">Create New Group</h2>
          <p className="text-xs text-neutral-subtext mt-1">
            Set up your Paluwagan cycle rules, contribution amount, and total members.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="name"
            labelText="Group Name"
            placeholder="e.g. Family Savings 2026"
            register={register}
            errors={errors}
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
                className="w-full py-2.5 pl-10 pr-3.5 text-xs font-medium border border-neutral-border rounded-2xl bg-background/60 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent focus:bg-background text-foreground transition-all duration-200 resize-none"
              />
            </div>
            {errors.description && (
              <p className="text-danger text-[10px] font-medium mt-0.5">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
              Maximum Members
            </label>
            <div className="grid grid-cols-6 gap-2">
              {MEMBERS_OPTIONS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleMaxMembersSelect(val)}
                  className={`py-2 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                    selectedMaxMembers === val
                      ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                      : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40 hover:text-foreground"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("maxMembers", { valueAsNumber: true })} />
            {errors.maxMembers && (
              <p className="text-danger text-[10px] font-medium">
                {errors.maxMembers.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
              Billing Cycle
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BILLING_CYCLES.map((cycle) => (
                <button
                  key={cycle.value}
                  type="button"
                  onClick={() => handleBillingCycleSelect(cycle.value)}
                  className={`py-2.5 text-xs font-bold rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedBillingCycle === cycle.value
                      ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                      : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40 hover:text-foreground"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cycle.label}</span>
                </button>
              ))}
            </div>
            <input type="hidden" {...register("billingCycle")} />
            {errors.billingCycle && (
              <p className="text-danger text-[10px] font-medium">
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
              register={register}
              errors={errors}
              icon={<PhilippinePeso className="w-4 h-4 text-neutral-subtext" />}
            />

            <Input
              label="cycleDuration"
              labelText="Cycle Duration (Rotations)"
              placeholder="1"
              type="number"
              register={register}
              errors={errors}
              icon={<RefreshCw className="w-4 h-4 text-neutral-subtext" />}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-brand-accent hover:bg-brand-accent-hover text-white py-3 rounded-2xl font-extrabold active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
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
