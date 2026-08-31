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
  Wallet,
  Building2,
  Banknote,
  Check,
  RefreshCw,
  Crown,
} from "lucide-react";
import { CreateGroupFormFieldsProps } from "@/features/groups/types/create-group-field.types";
import { PaymentMethodKey } from "@/features/groups/types/group.types";
import useCreateGroupFormFields from "../../hooks/useCreateGroupFormFields";
import {
  BILLING_CYCLE_LABELS,
  type PaymentAccountDetailsDTO,
} from "@siklo/shared-schemas";
import PayoutSequenceSelector from "./PayoutSequenceSelector";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import Loader from "@/shared/components/loader/Loader";

export default function CreateGroupFormFields(
  props: CreateGroupFormFieldsProps,
) {
  const { data: user } = useGetCurrentName();
  const userAccounts = user?.paymentAccounts as
    PaymentAccountDetailsDTO | undefined;

  const {
    register,
    errors,
    setValue,
    watch,
    selectedPayoutSequence,
    selectedBillingCycle,
    isPending,
    handleSubmit,
    handleBillingCycleSelect,
    handlePayoutSequenceSelect,
  } = useCreateGroupFormFields(props);

  const allowedMethods = watch("allowedPaymentMethods") || [
    "E_WALLET",
    "BANK_TRANSFER",
    "CASH",
  ];

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

    const detailsArr: string[] = [];
    if (current.includes("E_WALLET")) {
      if (userAccounts?.gcashNumber) {
        detailsArr.push(
          `GCash: ${userAccounts.gcashNumber} (${userAccounts.gcashName || "Organizer"})`,
        );
      }
      if (userAccounts?.mayaNumber) {
        detailsArr.push(
          `Maya: ${userAccounts.mayaNumber} (${userAccounts.mayaName || "Organizer"})`,
        );
      }
    }
    if (current.includes("BANK_TRANSFER") && userAccounts?.bankAccountNumber) {
      detailsArr.push(
        `${userAccounts.bankName || "Bank"}: ${userAccounts.bankAccountNumber} (${userAccounts.gcashName || userAccounts.mayaName || "Organizer"})`,
      );
    }
    if (current.includes("CASH")) {
      detailsArr.push("Cash on Hand");
    }
    setValue("paymentDetails", detailsArr.join("\n"), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const graceRegister = register("gracePeriodDays", { valueAsNumber: true });
  const penaltyRegister = register("latePenaltyAmount", {
    valueAsNumber: true,
  });

  return (
    <div className="lg:col-span-7 bg-background border border-neutral-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      {isPending && <Loader text="Creating paluwagan group..." />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 pb-4 border-b border-neutral-border/60">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            Create Cycle Group
          </h2>
          <p className="text-xs text-neutral-subtext">
            Set up your group parameters, contribution amount, grace period
            rules, and payment options.
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="contributionAmount"
              labelText="Contribution Amount"
              type="number"
              min={50}
              max={10000}
              disabled={isPending}
              {...register("contributionAmount", { valueAsNumber: true })}
              onKeyDown={(e) => {
                if (["-", "e", "E", "+", "."].includes(e.key)) e.preventDefault();
              }}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                const val = Number(cleaned);
                if (isNaN(val) || cleaned === "") {
                  setValue(
                    "contributionAmount",
                    undefined as unknown as number,
                    { shouldValidate: true },
                  );
                } else if (val > 10000) {
                  setValue("contributionAmount", 10000, {
                    shouldValidate: true,
                  });
                } else {
                  setValue("contributionAmount", val, { shouldValidate: true });
                }
              }}
              errors={errors}
              icon={<PhilippinePeso className="w-4 h-4 text-neutral-subtext" />}
            />

            <Input
              label="maxMembers"
              labelText="Member Capacity (3 - 50)"
              type="number"
              min={3}
              max={50}
              disabled={isPending}
              {...register("maxMembers", { valueAsNumber: true })}
              onKeyDown={(e) => {
                if ([".", ",", "-", "e", "E", "+"].includes(e.key))
                  e.preventDefault();
              }}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                const val = parseInt(cleaned, 10);
                if (isNaN(val) || cleaned === "") {
                  setValue("maxMembers", undefined as unknown as number, {
                    shouldValidate: true,
                  });
                } else if (val > 50) {
                  setValue("maxMembers", 50, { shouldValidate: true });
                } else {
                  setValue("maxMembers", val, { shouldValidate: true });
                }
              }}
              errors={errors}
              icon={<Users className="w-4 h-4 text-neutral-subtext" />}
            />

            <Input
              label="cycleDuration"
              labelText="Rotation Cycles (1 - 10)"
              type="number"
              min={1}
              max={10}
              disabled={isPending}
              {...register("cycleDuration", { valueAsNumber: true })}
              onKeyDown={(e) => {
                if ([".", ",", "-", "e", "E", "+"].includes(e.key))
                  e.preventDefault();
              }}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                const val = parseInt(cleaned, 10);
                if (isNaN(val) || cleaned === "") {
                  setValue("cycleDuration", 1, { shouldValidate: true });
                } else if (val > 10) {
                  setValue("cycleDuration", 10, { shouldValidate: true });
                } else if (val < 1) {
                  setValue("cycleDuration", 1, { shouldValidate: true });
                } else {
                  setValue("cycleDuration", val, { shouldValidate: true });
                }
              }}
              errors={errors}
              icon={<RefreshCw className="w-4 h-4 text-brand-accent" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="gracePeriodDays"
              labelText="Grace Period (0 - 7 Days)"
              type="number"
              min={0}
              max={7}
              disabled={isPending}
              {...graceRegister}
              onKeyDown={(e) => {
                if ([".", ",", "-", "e", "E", "+"].includes(e.key))
                  e.preventDefault();
              }}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                const val = parseInt(cleaned, 10);
                if (isNaN(val) || cleaned === "") {
                  setValue("gracePeriodDays", 0, { shouldValidate: true });
                } else if (val > 7) {
                  setValue("gracePeriodDays", 7, { shouldValidate: true });
                } else if (val < 0) {
                  setValue("gracePeriodDays", 0, { shouldValidate: true });
                } else {
                  setValue("gracePeriodDays", val, { shouldValidate: true });
                }
              }}
              errors={errors}
              icon={<Clock className="w-4 h-4 text-brand-accent" />}
            />

            <Input
              label="latePenaltyAmount"
              labelText="Daily Late Penalty (0% - 10% per day)"
              type="number"
              step={1}
              min={0}
              max={10}
              disabled={isPending}
              {...penaltyRegister}
              onKeyDown={(e) => {
                if ([".", ",", "-", "e", "E", "+"].includes(e.key))
                  e.preventDefault();
              }}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                const val = parseInt(cleaned, 10);
                if (isNaN(val) || cleaned === "") {
                  setValue("latePenaltyAmount", 0, { shouldValidate: true });
                } else if (val > 10) {
                  setValue("latePenaltyAmount", 10, { shouldValidate: true });
                } else if (val < 0) {
                  setValue("latePenaltyAmount", 0, { shouldValidate: true });
                } else {
                  setValue("latePenaltyAmount", val, { shouldValidate: true });
                }
              }}
              errors={errors}
              icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
            />
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500" />
                <span>Organizer Cycle Participation</span>
              </label>
              <p className="text-[10px] text-neutral-subtext">
                Choose whether you will participate as a saver in the rotation or purely manage the cycle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  setValue("isOrganizerParticipating", true, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  watch("isOrganizerParticipating") !== false
                    ? "bg-brand-accent/10 border-brand-accent text-foreground shadow-xs"
                    : "bg-background border-neutral-border/80 text-neutral-subtext hover:border-neutral-border"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground block">
                    Participating Saver
                  </span>
                  <span className="text-[10px] text-neutral-subtext block">
                    Save, contribute, & receive a payout turn in rotation
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                    watch("isOrganizerParticipating") !== false
                      ? "border-brand-accent bg-brand-accent text-white"
                      : "border-neutral-border bg-background"
                  }`}
                >
                  {watch("isOrganizerParticipating") !== false && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  setValue("isOrganizerParticipating", false, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  watch("isOrganizerParticipating") === false
                    ? "bg-brand-accent/10 border-brand-accent text-foreground shadow-xs"
                    : "bg-background border-neutral-border/80 text-neutral-subtext hover:border-neutral-border"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground block">
                    Manager Only (Excluded)
                  </span>
                  <span className="text-[10px] text-neutral-subtext block">
                    Manage proofs & disbursements without saving
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                    watch("isOrganizerParticipating") === false
                      ? "border-brand-accent bg-brand-accent text-white"
                      : "border-neutral-border bg-background"
                  }`}
                >
                  {watch("isOrganizerParticipating") === false && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
              </button>
            </div>
            <input type="hidden" {...register("isOrganizerParticipating")} />
          </div>

          <Input
            label="organizerFeeAmount"
            labelText="One-Time Organizer Fee (₱0 - ₱1,000)"
            type="number"
            min={0}
            max={1000}
            disabled={isPending}
            {...register("organizerFeeAmount", { valueAsNumber: true })}
            onKeyDown={(e) => {
              if ([".", ",", "-", "e", "E", "+"].includes(e.key))
                e.preventDefault();
            }}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              const val = parseInt(cleaned, 10);
              if (isNaN(val) || cleaned === "") {
                setValue("organizerFeeAmount", 0, { shouldValidate: true });
              } else if (val > 1000) {
                setValue("organizerFeeAmount", 1000, { shouldValidate: true });
              } else if (val < 0) {
                setValue("organizerFeeAmount", 0, { shouldValidate: true });
              } else {
                setValue("organizerFeeAmount", val, { shouldValidate: true });
              }
            }}
            errors={errors}
            icon={<PhilippinePeso className="w-4 h-4 text-brand-accent" />}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-brand-accent" />
                  <span>Select Payment Method</span>
                </label>
                <span className="text-[10px] text-neutral-subtext block">
                  Select the payment channels members can use to send
                  contributions.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                {
                  key: "E_WALLET" as PaymentMethodKey,
                  label: "E-Wallet (GCash / Maya)",
                  icon: Wallet,
                  details:
                    userAccounts?.gcashNumber || userAccounts?.mayaNumber
                      ? `GCash: ${userAccounts?.gcashNumber || "—"} | Maya: ${userAccounts?.mayaNumber || "—"}`
                      : "Default saved mobile wallet",
                },
                {
                  key: "BANK_TRANSFER" as PaymentMethodKey,
                  label: "Bank Transfer",
                  icon: Building2,
                  details: userAccounts?.bankAccountNumber
                    ? `${userAccounts?.bankName || "Bank"}: ${userAccounts.bankAccountNumber}`
                    : "Default saved bank account",
                },
                {
                  key: "CASH" as PaymentMethodKey,
                  label: "Cash on Hand",
                  icon: Banknote,
                  details: "In-person cash handover to organizer",
                },
              ].map(({ key, label, icon: IconComponent, details }) => {
                const isSelected = allowedMethods.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isPending}
                    onClick={() => togglePaymentMethod(key)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-brand-accent/10 border-brand-accent text-foreground shadow-xs"
                        : "bg-background border-neutral-border/80 text-neutral-subtext hover:border-neutral-border"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          isSelected
                            ? "bg-brand-accent text-white"
                            : "bg-neutral-subtext/10 text-neutral-subtext"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground block truncate">
                          {label}
                        </span>
                        <span className="text-[10px] text-neutral-subtext block truncate mt-0.5">
                          {details}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-brand-accent bg-brand-accent text-white"
                          : "border-neutral-border bg-background"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
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
