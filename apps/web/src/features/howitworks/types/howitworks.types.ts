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
  payoutScheme: "draw-lots" | "seniority" | "first-come" | "custom";
  gracePeriodDays: number;
  latePenalty: number;
  paymentChannel: string;
}

export interface BestPracticeItem {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface PayoutSchemesGridProps {
  schemes: Array<{
    id: number;
    title: string;
    desc: string;
    icon: any;
  }>;
}

export interface BestPracticesListProps {
  practices: BestPracticeItem[];
}
