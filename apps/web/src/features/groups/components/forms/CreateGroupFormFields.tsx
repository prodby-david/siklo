import Input from "@/shared/components/inputs/Input";
import {
  Users,
  PhilippinePeso,
  FileText,
  AlignLeft,
  Loader2,
  Plus,
  Clock,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
  Wallet,
  Building2,
  Banknote,
  Check,
  Info,
  RefreshCw,
} from "lucide-react";
import { useWatch } from "react-hook-form";
import { CreateGroupFormFieldsProps } from "@/features/groups/types/create-group-field.types";
import useCreateGroupFormFields from "../../hooks/useCreateGroupFormFields";
import { BILLING_CYCLE_LABELS } from "@siklo/shared-schemas";
import PayoutSequenceSelector from "./PayoutSequenceSelector";

type PaymentMethodKey = "E_WALLET" | "BANK_TRANSFER" | "CASH";

export default function CreateGroupFormFields(
  props: CreateGroupFormFieldsProps,
) {
  const {
    register,
    errors,
    setValue,
    watch,
    control,
    selectedPayoutSequence,
    selectedBillingCycle,
    isPending,
    handleSubmit,
    handleBillingCycleSelect,
    handlePayoutSequenceSelect,
  } = useCreateGroupFormFields(props);

  const activeControl = props.control || control;
  const allowedMethods = watch("allowedPaymentMethods") || ["E_WALLET", "BANK_TRANSFER", "CASH"];
  const isBackupEnabled = Boolean(
    useWatch({
      name: "enableBackupFund",
      control: activeControl,
      defaultValue: false,
    })
  );

  const togglePaymentMethod = (method: PaymentMethodKey) => {
    let current = [...allowedMethods];
    if (current.includes(method)) {
      if (current.length === 1) return;
      current = current.filter((m) => m !== method);
    } else {
      current.push(method);
    }
    setValue("allowedPaymentMethods", current, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const graceRegister = register("gracePeriodDays", { valueAsNumber: true });
  const penaltyRegister = register("latePenaltyAmount", { valueAsNumber: true });

  return (
    <div className="lg:col-span-7 bg-background border border-neutral-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 pb-4 border-b border-neutral-border/60">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            Create Paluwagan Group
          </h2>
          <p className="text-xs text-neutral-subtext">
            Set up your group parameters, contribution amount, grace period rules, and payment options.
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

          <Input
            label="description"
            labelText="Group Description (Optional)"
            placeholder="e.g. Monthly savings circle for team members"
            disabled={isPending}
            {...register("description")}
            errors={errors}
            icon={<AlignLeft className="w-4 h-4 text-neutral-subtext" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="contributionAmount"
              labelText="Contribution Amount (₱50 - ₱10,000)"
              placeholder="1000"
              type="number"
              disabled={isPending}
              {...register("contributionAmount", { valueAsNumber: true })}
              errors={errors}
              icon={<PhilippinePeso className="w-4 h-4 text-neutral-subtext" />}
            />

            <Input
              label="maxMembers"
              labelText="Member Capacity"
              placeholder="6"
              type="number"
              disabled={isPending}
              {...register("maxMembers", { valueAsNumber: true })}
              errors={errors}
              icon={<Users className="w-4 h-4 text-neutral-subtext" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="gracePeriodDays"
              labelText="Grace Period (0 - 7 Days)"
              placeholder="3"
              type="number"
              min={0}
              max={7}
              disabled={isPending}
              {...graceRegister}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val > 7) {
                  setValue("gracePeriodDays", 7, { shouldValidate: true });
                } else if (val < 0) {
                  setValue("gracePeriodDays", 0, { shouldValidate: true });
                } else {
                  graceRegister.onChange(e);
                }
              }}
              errors={errors}
              icon={<Clock className="w-4 h-4 text-brand-accent" />}
            />

            <Input
              label="latePenaltyAmount"
              labelText="Daily Late Penalty (1% - 10% per day)"
              placeholder="2.5"
              type="number"
              step="0.1"
              min={1}
              max={10}
              disabled={isPending}
              {...penaltyRegister}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val > 10) {
                  setValue("latePenaltyAmount", 10, { shouldValidate: true });
                } else if (val < 1 && e.target.value !== "") {
                  setValue("latePenaltyAmount", 1, { shouldValidate: true });
                } else {
                  penaltyRegister.onChange(e);
                }
              }}
              errors={errors}
              icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
            />
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-brand-accent" />
                <span>Allowed Payment Methods</span>
              </label>
              <span className="text-[10px] text-neutral-subtext block">
                Select 1 or more payment channels members can use.
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { key: "E_WALLET" as PaymentMethodKey, label: "E-Wallet", icon: Wallet },
                { key: "BANK_TRANSFER" as PaymentMethodKey, label: "Bank Transfer", icon: Building2 },
                { key: "CASH" as PaymentMethodKey, label: "Cash on Hand", icon: Banknote },
              ].map(({ key, label, icon: IconComponent }) => {
                const isSelected = allowedMethods.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isPending}
                    onClick={() => togglePaymentMethod(key)}
                    className={`relative py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                        : "bg-background border-neutral-border text-neutral-subtext hover:border-neutral-border"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span>{label}</span>
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-emerald-500 text-white rounded-full border-2 border-background shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-foreground">
                Organizer Payment Account Details
              </label>
              <textarea
                rows={3}
                placeholder="e.g. GCash: 09171234567 (Juan D.)&#10;BDO Bank: 1234567890 (Juan Dela Cruz)&#10;Maya: 09171234567"
                disabled={isPending}
                {...register("paymentDetails")}
                className="w-full text-xs p-3 min-h-[84px] rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-brand-accent/5 border border-brand-accent/20 space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="enableBackupFundCheck"
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <ShieldCheck
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isBackupEnabled ? "text-brand-accent font-bold" : "text-neutral-subtext"
                  }`}
                />
                <div>
                  <span className="text-xs font-extrabold text-foreground block">
                    Emergency Backup Fund (Optional)
                  </span>
                  <span className="text-[10px] text-neutral-subtext block">
                    Safety reserve pool to protect payouts and refund compliant members.
                  </span>
                </div>
              </label>

              <input
                id="enableBackupFundCheck"
                type="checkbox"
                disabled={isPending}
                {...register("enableBackupFund")}
                className="w-4 h-4 rounded border-neutral-border text-brand-accent focus:ring-brand-accent cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-background/90 border border-brand-accent/15 text-[11px] space-y-2">
              <div className="flex items-start gap-2 text-foreground">
                <Info className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                <span>
                  <strong>How it works:</strong> Members contribute a small extra fee per turn (e.g. ₱50). This money builds a group safety cushion.
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-neutral-border/40 text-[10px] text-neutral-subtext">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span><strong>Default Protection:</strong> Ensures scheduled member gets paid on time.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 text-brand-accent shrink-0" />
                  <span><strong>100% Equal Rebate:</strong> Unused funds are split & refunded on final turn.</span>
                </div>
              </div>
            </div>

            {isBackupEnabled && (
              <div className="pt-2 border-t border-brand-accent/30">
                <Input
                  label="backupFundPerTurn"
                  labelText="Backup Fund Amount Per Turn (₱)"
                  placeholder="50"
                  type="number"
                  disabled={isPending}
                  {...register("backupFundPerTurn", { valueAsNumber: true })}
                  errors={errors}
                  icon={<PhilippinePeso className="w-4 h-4 text-brand-accent" />}
                />
              </div>
            )}
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
