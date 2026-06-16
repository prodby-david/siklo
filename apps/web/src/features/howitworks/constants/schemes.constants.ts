import { CheckCircle2, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";

export const schemesData = [
  {
    id: 1,
    title: "Draw Lots / Random",
    desc: "Members pull numbers from a hat or use a randomizer to assign turns. This is the fairest method for groups where everyone has similar needs.",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Seniority / Priority Need",
    desc: "Turns are assigned based on personal situations or seniority (e.g., family emergencies, tuition dates). Keeps the circle helpful and supportive.",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "Bidding / Auctions",
    desc: "Members who want the payout early can bid by offering to take a discount. The deducted bid amount is distributed as a dividend to other savers.",
    icon: HelpCircle,
  },
  {
    id: 4,
    title: "Custom Agreement",
    desc: "A custom sequence drafted and signed off by all group members. Organizers can manually lock this turn order prior to starting the cycle.",
    icon: ShieldAlert,
  },
];
