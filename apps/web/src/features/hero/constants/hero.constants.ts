import { ActivityItem } from "../types/hero.types";

export const mockActivities: ActivityItem[] = [
  {
    id: "1",
    user: "Alex Santos",
    action: "received the payout pool",
    amount: 30000,
    time: "2 hours ago",
    type: "payout",
  },
  {
    id: "2",
    user: "David Gaspar",
    action: "paid contribution for Round 3",
    amount: 5000,
    time: "4 hours ago",
    type: "payment",
  },
  {
    id: "3",
    user: "Jane Cruz",
    action: "paid contribution for Round 3",
    amount: 5000,
    time: "1 day ago",
    type: "payment",
  },
  {
    id: "4",
    user: "System Log",
    action: "started Round 3 cycle automatically",
    time: "2 days ago",
    type: "system",
  },
  {
    id: "5",
    user: "Maria Clara",
    action: "paid contribution for Round 2",
    amount: 5000,
    time: "1 week ago",
    type: "payment",
  },
];
