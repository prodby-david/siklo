import {
  UserPlus,
  ClipboardCheck,
  Coins,
  KeyRound,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { HowItWorksStep, PaluwaganRules, BestPracticeItem } from "../types/howitworks.types";

export const organizerSteps: HowItWorksStep[] = [
  {
    stepNumber: 1,
    title: "Set Up Your Paluwagan Group",
    description: "Define your group name, contribution amount, billing frequency, member capacity, and payout sequence order.",
    icon: UserPlus,
  },
  {
    stepNumber: 2,
    title: "Review & Verify Contributions",
    description: "Track incoming member payments via GCash, Maya, or bank transfer, and approve valid proofs on the transparent ledger.",
    icon: ClipboardCheck,
  },
  {
    stepNumber: 3,
    title: "Disburse Lump-Sum Payouts",
    description: "Release pooled payout funds to the designated turn beneficiary and advance the circle to the next rotation automatically.",
    icon: Coins,
  },
];

export const memberSteps: HowItWorksStep[] = [
  {
    stepNumber: 1,
    title: "Join with Invite Code & Claim Slot",
    description: "Enter the group's 12-character invite code, review the contribution schedule, and reserve or receive your rotation turn slot.",
    icon: KeyRound,
  },
  {
    stepNumber: 2,
    title: "Send Contribution & Upload Proof",
    description: "Send your turn contribution using the organizer's verified payment details and submit your reference number with receipt proof.",
    icon: CreditCard,
  },
  {
    stepNumber: 3,
    title: "Receive Your Payout & Confirm Receipt",
    description: "Collect your full pooled lump-sum payout when your assigned turn arrives, and confirm receipt on the shared circle ledger.",
    icon: Sparkles,
  },
];

export const defaultSteps: HowItWorksStep[] = organizerSteps;

export const defaultPlannerRules: PaluwaganRules = {
  contributionAmount: 1000,
  frequency: "monthly",
  payoutScheme: "draw-lots",
  gracePeriodDays: 3,
  latePenalty: 100,
  paymentChannel: "Mobile Wallet",
};

export const frequencyOptions = [
  { label: "Weekly", value: "weekly" },
  { label: "Semi-Monthly", value: "semi-monthly" },
  { label: "Monthly", value: "monthly" },
] as const;

export const payoutSchemeOptions = [
  { label: "Draw Lots / Random", value: "draw-lots" },
  { label: "First-Come, First-Served", value: "seniority" },
  { label: "Free Choice Slot Reservation", value: "first-come" },
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
    title: "Maintain Consistent Schedules",
    description: "Agree on contribution cutoffs and payout dates early so every member knows exactly when their turn begins.",
  },
  {
    id: "4",
    stepNumber: 4,
    title: "Use Clear Payment Channels",
    description: "Standardize mobile wallets or bank transfers. Instruct members to send references or receipts directly to the organizer.",
  },
];
