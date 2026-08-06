import { CheckCircle2, ShieldAlert, RotateCw, CalendarCheck } from "lucide-react";

export const schemesData = [
  {
    id: 1,
    title: "Draw Lots / Random",
    desc: "Members use a randomizer or draw numbers to assign payout turns. This is the fairest method when all members have similar savings goals.",
    icon: RotateCw,
  },
  {
    id: 2,
    title: "Seniority / Priority Need",
    desc: "Turns are assigned based on financial situations or member agreement (e.g., tuition or emergency dates), keeping your circle supportive.",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "First-Come / Slot Reservation",
    desc: "Members reserve available payout turn positions directly on a first-come, first-served basis upon joining or accepting group invites.",
    icon: CalendarCheck,
  },
  {
    id: 4,
    title: "Custom Agreement",
    desc: "A custom payout order agreed upon and locked by circle members. Group organizers can manually lock and verify this turn sequence.",
    icon: ShieldAlert,
  },
];
