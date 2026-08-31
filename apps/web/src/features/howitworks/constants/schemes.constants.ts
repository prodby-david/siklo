import { RotateCw, Users, HandCoins } from "lucide-react";
import { PayoutSchemeData } from "../types/howitworks.types";

export const schemesData: PayoutSchemeData[] = [
  {
    id: 1,
    title: "First-Come, First-Served (Manual)",
    badge: "Sequential Order",
    desc: "Payout turns are assigned sequentially in the exact chronological order members join the group (Slot #1, Slot #2, Slot #3). Ideal for pre-arranged queue agreements.",
    icon: Users,
  },
  {
    id: 2,
    title: "Randomized Sequence (Draw Lots)",
    badge: "System Shuffled",
    desc: "The system automatically shuffles and randomizes member slot positions upon cycle start. The fairest, unbiased method when all savers share equal timing preference.",
    icon: RotateCw,
  },
  {
    id: 3,
    title: "Free Choice Slot Reservation",
    badge: "Self Selected",
    desc: "Members freely browse open rotation slots and reserve their preferred payout position upon joining before the cycle begins. Perfect for goal-based target dates.",
    icon: HandCoins,
  },
];
