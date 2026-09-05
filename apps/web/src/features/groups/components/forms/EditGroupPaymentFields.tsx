import { Check, CreditCard } from "lucide-react";
import { PAYMENT_METHOD_OPTIONS } from "../../constants/group.constants";
import type { PaymentMethodKey } from "../../types/group.types";

interface EditGroupPaymentFieldsProps {
  allowedMethods: PaymentMethodKey[];
  paymentDetails: string;
  isSubmitting: boolean;
  onToggleMethod: (method: PaymentMethodKey) => void;
  onPaymentDetailsChange: (value: string) => void;
}

export default function EditGroupPaymentFields({
  allowedMethods,
  paymentDetails,
  isSubmitting,
  onToggleMethod,
  onPaymentDetailsChange,
}: EditGroupPaymentFieldsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <CreditCard className="h-4 w-4 text-brand-accent" />
          <span>Allowed Payment Methods</span>
        </label>
        <span className="block text-[10px] text-neutral-subtext">
          Select 1 or more payment channels members can use.
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1">
        {PAYMENT_METHOD_OPTIONS.map(({ key, label, icon: IconComponent }) => {
          const isSelected = allowedMethods.includes(key);

          return (
            <button
              key={key}
              type="button"
              disabled={isSubmitting}
              onClick={() => onToggleMethod(key)}
              className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition-all ${
                isSelected
                  ? "border-brand-accent bg-brand-accent text-brand-accent-foreground shadow-xs"
                  : "border-neutral-border bg-background text-neutral-subtext hover:border-brand-accent/40"
              }`}
            >
              <IconComponent className="h-3.5 w-3.5 shrink-0" />
              <span>{label}</span>
              {isSelected && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-success text-brand-accent-foreground shadow-xs">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
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
          placeholder={
            "e.g. GCash: 09171234567 (Juan D.)\nBDO Bank: 1234567890 (Juan Dela Cruz)\nMaya: 09171234567"
          }
          disabled={isSubmitting}
          value={paymentDetails}
          onChange={(event) => onPaymentDetailsChange(event.target.value)}
          className="min-h-[84px] w-full resize-none rounded-xl border border-neutral-border bg-background p-3 text-xs leading-relaxed text-foreground focus:border-brand-accent focus:outline-none"
        />
      </div>
    </div>
  );
}
