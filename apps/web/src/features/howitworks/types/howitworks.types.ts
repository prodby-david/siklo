import { LucideIcon } from "lucide-react";

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export type HowItWorksRole = "ORGANIZER" | "MEMBER";

export interface HowItWorksProps {
  title?: string;
  description?: string;
  steps?: HowItWorksStep[];
  organizerSteps?: HowItWorksStep[];
  memberSteps?: HowItWorksStep[];
  defaultRole?: HowItWorksRole;
}

export interface PaluwaganRules {
  contributionAmount: number;
  frequency: "weekly" | "semi-monthly" | "monthly";
  payoutScheme: "draw-lots" | "seniority" | "first-come";
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

export interface PayoutSchemeData {
  id: number;
  title: string;
  badge?: string;
  desc: string;
  icon: LucideIcon;
}

export interface PayoutSchemesGridProps {
  schemes: PayoutSchemeData[];
}

export interface BestPracticesListProps {
  practices: BestPracticeItem[];
}
