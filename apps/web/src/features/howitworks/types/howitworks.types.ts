export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface HowItWorksProps {
  title?: string;
  description?: string;
  steps?: HowItWorksStep[];
}

export interface PaluwaganRules {
  contributionAmount: number;
  frequency: "weekly" | "semi-monthly" | "monthly";
  payoutScheme: "draw-lots" | "seniority" | "bidding" | "custom";
  gracePeriodDays: number;
  latePenalty: number;
  paymentChannel: string;
}
