import { Check, CreditCard } from "lucide-react";
import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import { PAYMENT_METHOD_OPTIONS } from "../../constants/group.constants";
import type { PaymentMethodKey } from "../../types/group.types";
import getPaymentMethodDetails from "../../utils/getPaymentMethodDetails";

interface GroupPaymentMethodSelectorProps {
  selectedMethods: PaymentMethodKey[];
  organizerAccounts?: PaymentAccountDetailsDTO;
  isPending: boolean;
  onToggleMethod: (method: PaymentMethodKey) => void;
}

export default function GroupPaymentMethodSelector({
  selectedMethods,
  organizerAccounts,
  isPending,
  onToggleMethod,
}: GroupPaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <CreditCard className="h-4 w-4 text-brand-accent" />
          <span>Select Payment Method</span>
        </label>
        <span className="block text-[10px] text-neutral-subtext">
          Select the payment channels members can use to send contributions.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
        {PAYMENT_METHOD_OPTIONS.map(({ key, label, icon: MethodIcon }) => {
          const isSelected = selectedMethods.includes(key);

          return (
            <button
              key={key}
              type="button"
              disabled={isPending}
              onClick={() => onToggleMethod(key)}
              className={`flex cursor-pointer items-start justify-between gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                isSelected
                  ? "border-brand-accent bg-brand-accent/10 text-foreground shadow-xs"
                  : "border-neutral-border/80 bg-background text-neutral-subtext hover:border-neutral-border"
              }`}
            >
              <div className="flex min-w-0 items-start gap-2.5">
                <span
                  className={`shrink-0 rounded-xl p-2 ${
                    isSelected
                      ? "bg-brand-accent text-brand-accent-foreground"
                      : "bg-neutral-table-stripe text-neutral-subtext"
                  }`}
                >
                  <MethodIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold text-foreground">
                    {label}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] text-neutral-subtext">
                    {getPaymentMethodDetails(key, organizerAccounts)}
                  </span>
                </span>
              </div>
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-brand-accent bg-brand-accent text-brand-accent-foreground"
                    : "border-neutral-border bg-background"
                }`}
              >
                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
