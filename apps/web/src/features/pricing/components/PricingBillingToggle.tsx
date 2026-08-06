import React from "react";
import { PricingBillingToggleProps } from "../types/pricing.types";

export default function PricingBillingToggle({
  interval,
  onToggle,
}: PricingBillingToggleProps) {
  const isYearly = interval === "YEARLY";

  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`text-xs font-extrabold ${
          !isYearly ? "text-foreground" : "text-neutral-subtext"
        }`}
      >
        Monthly Billing
      </span>

      <button
        type="button"
        onClick={onToggle}
        className="w-12 h-6 rounded-full bg-neutral-subtext/20 p-1 transition-colors relative cursor-pointer focus:outline-none"
        aria-label="Toggle billing interval"
      >
        <div
          className={`w-4 h-4 rounded-full bg-brand-accent transition-transform duration-200 ${
            isYearly ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

      <div className="flex items-center gap-1.5">
        <span
          className={`text-xs font-extrabold ${
            isYearly ? "text-foreground" : "text-neutral-subtext"
          }`}
        >
          Annual Billing
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-accent/15 text-brand-accent border border-brand-accent/25">
          Save up to 20%
        </span>
      </div>
    </div>
  );
}
