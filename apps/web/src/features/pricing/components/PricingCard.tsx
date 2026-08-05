"use client";

import Link from "next/link";
import { Check, X, PhilippinePeso, Flame } from "lucide-react";
import { PricingPlan, BillingInterval } from "../types/pricing.types";

interface PricingCardProps {
  plan: PricingPlan;
  interval: BillingInterval;
}

export default function PricingCard({ plan, interval }: PricingCardProps) {
  const price = interval === "YEARLY" ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
        plan.isPopular
          ? "border-2 border-brand-accent bg-gradient-to-b from-brand-accent/15 via-background/80 to-background/90 backdrop-blur-xl relative z-10 shadow-md scale-102 z-10"
          : "border border-neutral-border bg-background/80 backdrop-blur-xl relative z-10 shadow-xs hover:border-brand-accent/30 hover:shadow-md"
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent text-background px-3.5 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-xs">
          <Flame className="w-3 h-3" /> Most Popular
        </span>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-foreground">{plan.name}</h3>
          <p className="text-xs text-neutral-subtext mt-1.5 leading-relaxed min-h-[36px]">
            {plan.description}
          </p>
        </div>

        <div className="flex items-baseline gap-1 border-b border-neutral-border/60 pb-5">
          <span className="text-3xl sm:text-4xl font-black text-foreground flex items-center gap-0.5">
            <PhilippinePeso className="w-7 h-7 text-brand-accent" />
            {price.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-neutral-subtext">
            / month {interval === "YEARLY" && plan.monthlyPrice > 0 ? "(billed annually)" : ""}
          </span>
        </div>

        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs font-medium">
              {feature.included ? (
                <span className="w-4 h-4 rounded-full bg-brand-accent/15 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
              ) : (
                <span className="w-4 h-4 rounded-full bg-neutral-subtext/10 text-neutral-subtext flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </span>
              )}
              <span className={feature.included ? "text-foreground font-semibold" : "text-neutral-subtext opacity-60"}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={plan.ctaHref}
        className={`mt-8 w-full flex h-11 items-center justify-center gap-2 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 text-center cursor-pointer shadow-sm ${
          plan.isPopular
            ? "bg-brand-accent text-background hover:bg-brand-accent-hover"
            : "bg-neutral-table-stripe hover:bg-neutral-subtext/10 text-foreground border border-neutral-border/60"
        }`}
      >
        {plan.ctaText}
      </Link>
    </div>
  );
}
