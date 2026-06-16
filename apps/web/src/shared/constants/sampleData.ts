import { Member, CycleStats } from "@/features/hero/types/hero.types";

export const defaultMembers: Member[] = [
  {
    id: "1",
    name: "David Gaspar",
    initials: "DG",
    status: "paid",
    payoutTurn: 1,
    contributionAmount: 5000,
  },
  {
    id: "2",
    name: "Jane Cruz",
    initials: "JC",
    status: "paid",
    payoutTurn: 2,
    contributionAmount: 5000,
  },
  {
    id: "3",
    name: "Alex Santos",
    initials: "AS",
    status: "current",
    payoutTurn: 3,
    contributionAmount: 5000,
  },
  {
    id: "4",
    name: "Maria Clara",
    initials: "MC",
    status: "pending",
    payoutTurn: 4,
    contributionAmount: 5000,
  },
  {
    id: "5",
    name: "Juan Dela Cruz",
    initials: "JC",
    status: "pending",
    payoutTurn: 5,
    contributionAmount: 5000,
  },
];

export const defaultStats: CycleStats = {
  totalPool: 30000,
  activeMembersCount: 6,
  onTimeRate: 99.4,
  nextPayoutAmount: 30000,
  nextPayoutDate: "Jun 25, 2026",
};
