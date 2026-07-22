import { AboutItem, FaqItem, TrustItem, CoreValueItem } from "../types/about.types";

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

export const faqs: FaqItem[] = [
  {
    question: "What is a Paluwagan and how does it work?",
    answer: "Paluwagan is a traditional peer-to-peer savings group popular in the Philippines. Members contribute a fixed amount regularly (weekly or monthly) to a central pool, and the entire pool is given to one member each turn. The cycle repeats until everyone has received their payout.",
  },
  {
    question: "How does Siklo help run a Paluwagan?",
    answer: "Siklo acts as a transparent digital notebook. Instead of writing payments down on loose papers or private spreadsheets, Siklo keeps the turn list, payment tracking, and next payout dates in a clear, shared web app that all members can view.",
  },
  {
    question: "Is there any financial transaction processed on Siklo?",
    answer: "No, Siklo is strictly a record-keeping and tracking tool. Members still hand over contributions or send them via mobile wallets (like GCash or Maya) manually. Siklo only tracks who has paid and who gets paid next to ensure honesty and organization.",
  },
  {
    question: "What happens if a member pays late?",
    answer: "Siklo provides visual indicator tags (Paid, Next, Pending) so everyone can see the real-time status. The group organizer manages the entries, ensuring everyone is kept in the loop and reducing payment delays through group transparency.",
  },
  {
    question: "Who can edit the group savings notebook?",
    answer: "Only the designated group creator/organizer has permissions to mark contributions as paid, update penalties, and advance payout turns. Other circle members are given read-only access links to verify their statuses.",
  },
  {
    question: "How do members coordinate GCash/Maya receipts?",
    answer: "Siklo has a real-time activity feed where organizers can post transaction updates. Many groups use this list to reconcile their GCash and Maya transaction logs manually.",
  },
  {
    question: "How many members can save together in a single cycle?",
    answer: "Our interactive planner supports groups of 4 to 15 members, but organizers can add up to 30 people depending on the group's savings goals and frequency.",
  },
  {
    question: "Can we pause or stop a cycle once it starts?",
    answer: "Yes, organizers can pause the active tracking of a cycle or adjust contribution rules mid-stream in case of member emergency adjustments or seasonal agreements.",
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
    description: "Built tailored for Pinoy savings culture, honoring turns, GCash receipts, and community contributions.",
  },
  {
    id: "no-fees",
    title: "No Middleman Fees",
    description: "Siklo does not touch or hold any money. The tool is 100% free to use to coordinate your groups' cycles.",
  },
  {
    id: "responsive",
    title: "Mobile-Responsive Design",
    description: "Easily track contributions and payouts on any device, from smartphones to laptops, anywhere you are.",
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
