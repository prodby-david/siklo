import { AboutItem, TrustItem, CoreValueItem } from "../types/about.types";

export const defaultAboutItems: AboutItem[] = [
  {
    id: "1",
    title: "No More Notebooks",
    description: "Everything is saved online. You don't need to write payments down in notebooks or paper slips that can get lost.",
  },
  {
    id: "2",
    title: "Know Your Turn",
    description: "Everyone has a turn number. You know exactly when it is your turn to receive the group money, with no confusion.",
  },
  {
    id: "3",
    title: "Honest & Clear",
    description: "All members see the same payment list. It builds trust and avoids any disagreements or misunderstandings.",
  },
];

export const trustItems: TrustItem[] = [
  {
    id: "visibility",
    title: "100% Shared Visibility",
    description: "Every member gets read-only access to the group ledger, removing the risk of altered numbers or hidden secrets.",
  },
  {
    id: "math",
    title: "Zero Math Errors",
    description: "Siklo automatically computes payout pots and increments turns. No calculator needed, no mistakes made.",
  },
  {
    id: "philippine",
    title: "Philippine-Centric Setup",
    description: "Built tailored for Pinoy savings culture, honoring turns, digital receipts, and community contributions.",
  },
  {
    id: "no-fees",
    title: "No Middleman Fees",
    description: "Siklo does not touch or hold any money. The tool is 100% free to use to coordinate your groups' cycles.",
  },
  {
    id: "private-access",
    title: "Private Invite Access",
    description: "Every savings circle is strictly private. Members join securely via unique group invite codes, keeping your records confidential.",
  },
];

export const coreValues: CoreValueItem[] = [
  {
    id: "transparency",
    title: "Radical Transparency",
    description: "Every payment log and turn schedule is visible to all group members, eliminating secret records or misunderstandings.",
    highlightText: "100% Open Ledger",
    iconName: "Eye",
  },
  {
    id: "equity",
    title: "Automated Equity",
    description: "Turn order math, payout totals, and payment deadlines are calculated automatically so everyone gets treated fairly.",
    highlightText: "Zero Bias Math",
    iconName: "RotateCw",
  },
  {
    id: "security",
    title: "Community Protection",
    description: "Built specifically to preserve trust in Filipino saving circles without holding your money or charging middleman fees.",
    highlightText: "Zero Fee Guarantee",
    iconName: "ShieldCheck",
  },
];
