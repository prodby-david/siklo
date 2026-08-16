import { Check } from "lucide-react";
import { PAYMENT_METHOD_META } from "../../constants/payment.constants";
import { PaymentMethod, PaymentMethodSelectorProps } from "../../types/payment.types";

export default function PaymentMethodSelector({
  allowedMethods,
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-foreground block">
        Select Payment Method
      </label>
      <div className="grid grid-cols-3 gap-2">
        {allowedMethods.map((method: PaymentMethod) => {
          const meta = PAYMENT_METHOD_META[method];
          const Icon = meta.icon;
          const isSelected = selectedMethod === method;

          return (
            <button
              key={method}
              type="button"
              onClick={() => onSelectMethod(method)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer text-center relative ${
                isSelected
                  ? "border-brand-accent bg-brand-accent/10 text-brand-accent shadow-xs"
                  : "border-neutral-border bg-background hover:bg-neutral-table-stripe/60 text-neutral-subtext"
              }`}
            >
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-brand-accent text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
              <Icon className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-bold leading-tight line-clamp-1">
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
