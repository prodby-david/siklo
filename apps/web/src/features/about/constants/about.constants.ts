import {
  AboutItem,
  TrustItem,
  CoreValueItem,
  PaluwaganTermItem,
} from "../types/about.types";

export const defaultAboutItems: AboutItem[] = [
  {
    id: "1",
    title: "No More Notebooks",
    description:
      "Everything is saved online. You don't need to write payments down in notebooks or paper slips that can get lost.",
  },
  {
    id: "2",
    title: "Know Your Turn",
    description:
      "Everyone has a turn number. You know exactly when it is your turn to receive the group money, with no confusion.",
  },
  {
    id: "3",
    title: "Honest & Clear",
    description:
      "All members see the same payment list. It builds trust and avoids any disagreements or misunderstandings.",
  },
];

export const trustItems: TrustItem[] = [
  {
    id: "visibility",
    title: "100% Shared Visibility",
    description:
      "Every member gets read-only access to the group ledger, removing the risk of altered numbers or hidden secrets.",
  },
  {
    id: "math",
    title: "Zero Math Errors",
    description:
      "Siklo automatically computes payout pots and increments turns. No calculator needed, no mistakes made.",
  },
  {
    id: "philippine",
    title: "Philippine-Centric Setup",
    description:
      "Built tailored for Pinoy savings culture, honoring turns, digital receipts, and community contributions.",
  },
  {
    id: "no-fees",
    title: "No Middleman Fees",
    description:
      "Siklo does not touch or hold any money. The tool is 100% free to use to coordinate your groups' cycles.",
  },
  {
    id: "private-access",
    title: "Private Invite Access",
    description:
      "Every savings circle is strictly private. Members join securely via unique group invite codes, keeping your records confidential.",
  },
];

export const coreValues: CoreValueItem[] = [
  {
    id: "transparency",
    title: "Radical Transparency",
    description:
      "Every payment log and turn schedule is visible to all group members, eliminating secret records or misunderstandings.",
    highlightText: "100% Open Ledger",
    iconName: "Eye",
  },
  {
    id: "equity",
    title: "Automated Equity",
    description:
      "Turn order math, payout totals, and payment deadlines are calculated automatically so everyone gets treated fairly.",
    highlightText: "Zero Bias Math",
    iconName: "RotateCw",
  },
  {
    id: "security",
    title: "Community Protection",
    description:
      "Built specifically to preserve trust in Filipino saving circles without holding your money or charging middleman fees.",
    highlightText: "Zero Fee Guarantee",
    iconName: "ShieldCheck",
  },
];

export const paluwaganTermsList: PaluwaganTermItem[] = [
  {
    id: "cycle",
    term: "Cycle",
    simpleTitle: "Full Group Rotation",
    badge: "Full Rotation",
    iconName: "RotateCcw",
    description:
      "One full cycle means every single person in the group has received their payout once. If a group has 2 cycles, the rotation repeats so everyone gets paid twice.",
    example: "5 members with 2 cycles will run 10 turns in total.",
  },
  {
    id: "turn",
    term: "Turn / Round",
    simpleTitle: "One Payout Period",
    badge: "Active Turn",
    iconName: "Clock",
    description:
      "The specific period where all members chip in their share of money for one scheduled member.",
    example: "In Turn 1, everyone pays so Member 1 gets the total money.",
  },
  {
    id: "pool",
    term: "Payout Pool",
    simpleTitle: "Total Money Collected",
    badge: "Combined Pool",
    iconName: "PhilippinePeso",
    description:
      "The total amount of money collected from all members for that turn, given directly to the scheduled member.",
    example: "₱1,000 from 5 members makes a ₱5,000 payout pool.",
  },
  {
    id: "billing",
    term: "Billing Cycle",
    simpleTitle: "How Often You Pay",
    badge: "Payment Frequency",
    iconName: "CalendarDays",
    description:
      "How often members need to send their payments. This can be daily, weekly, twice a month (15th and 30th), or monthly.",
    example: "If weekly, members pay once every week.",
  },
  {
    id: "beneficiary",
    term: "Beneficiary",
    simpleTitle: "Member Getting Paid",
    badge: "Recipient",
    iconName: "UserCheck",
    description:
      "The member assigned to receive the full pooled money for the current active turn.",
    example: "If you have Slot #3, you are the beneficiary on Turn #3.",
  },
  {
    id: "organizer",
    term: "Organizer",
    simpleTitle: "Group Leader / Admin",
    badge: "Circle Leader",
    iconName: "Crown",
    description:
      "The trusted person who creates the group, checks members' payment receipts, and sends out the pooled money to each recipient.",
    example: "The organizer verifies proofs and advances the turns.",
  },
];
