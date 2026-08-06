export type BillingInterval = "MONTHLY" | "YEARLY";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular?: boolean;
  isComingSoon?: boolean;
  ctaText: string;
  ctaHref: string;
  features: PricingFeature[];
}

export interface UsePricingViewReturn {
  interval: BillingInterval;
  setInterval: (interval: BillingInterval) => void;
  toggleInterval: () => void;
}

export interface PricingBillingToggleProps {
  interval: BillingInterval;
  onToggle: () => void;
}

export interface PricingFaqItemProps {
  faq: {
    question: string;
    answer: string;
  };
  idx: number;
}
