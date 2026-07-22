import { HowItWorksStep, PaluwaganRules, BestPracticeItem } from "../types/howitworks.types";

export const defaultSteps: HowItWorksStep[] = [
  {
    stepNumber: 1,
    title: "Set Up Your Group",
    description: "Enter how much each member saves, add their names, and set the payout turn order.",
  },
  {
    stepNumber: 2,
    title: "Check Off Payments",
    description: "When a member gives their savings money, click a button to check them off so the whole group can see.",
  },
  {
    stepNumber: 3,
    title: "Hand Over the Payout",
    description: "Give the collected money to the member whose turn it is. The app moves to the next person automatically.",
  },
];

export const defaultPlannerRules: PaluwaganRules = {
  contributionAmount: 1000,
  frequency: "monthly",
  payoutScheme: "draw-lots",
  gracePeriodDays: 3,
  latePenalty: 100,
  paymentChannel: "GCash",
};

export const frequencyOptions = [
  { label: "Weekly", value: "weekly" },
  { label: "Semi-Monthly", value: "semi-monthly" },
  { label: "Monthly", value: "monthly" },
] as const;

export const payoutSchemeOptions = [
  { label: "Draw Lots / Random", value: "draw-lots" },
  { label: "Seniority / First-Come", value: "seniority" },
  { label: "Bidding / Auctions", value: "bidding" },
  { label: "Custom Turn Order", value: "custom" },
] as const;

export const gracePeriodOptions = [
  { label: "No Grace Period", value: 0 },
  { label: "1 Day Grace", value: 1 },
  { label: "3 Days Grace", value: 3 },
  { label: "5 Days Grace", value: 5 },
] as const;

export const bestPractices: BestPracticeItem[] = [
  {
    id: "1",
    stepNumber: 1,
    title: "Choose a Trusted Organizer",
    description: "Since Siklo handles record keeping and not funds, choose an organizer who is highly trustworthy, accessible, and organized.",
  },
  {
    id: "2",
    stepNumber: 2,
    title: "Agree on Late Fees Early",
    description: "Late payments delay everyone's payouts. Setting up a small late penalty per day encourages members to contribute on time.",
  },
  {
    id: "3",
    stepNumber: 3,
    title: "Keep a Small Backup Fund",
    description: "Veteran saving circles often contribute a small extra amount as a reserve to cover temporary delays.",
  },
  {
    id: "4",
    stepNumber: 4,
    title: "Use Clear Payment Channels",
    description: "Standardize GCash, Maya, or bank transfers. Instruct members to send references or receipts directly to the organizer.",
  },
];
