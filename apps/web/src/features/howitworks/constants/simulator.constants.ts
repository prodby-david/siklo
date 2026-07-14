import { SimulationConfig } from "../types/simulator.types";

export const CONTRIBUTION_OPTIONS = [
  { label: "₱500", value: 500 },
  { label: "₱1,000", value: 1000 },
  { label: "₱2,000", value: 2000 },
  { label: "₱5,000", value: 5000 },
] as const;

export const MEMBER_COUNT_OPTIONS = [3, 4, 5, 6] as const;

export const SCHEME_OPTIONS = [
  { label: "Draw Lots / Random", value: "draw-lots" },
  { label: "Seniority / First-Come", value: "seniority" },
  { label: "Custom Selection", value: "custom" },
] as const;

export const SIMULATED_NAMES = [
  "Juan",
  "Maria",
  "Pedro",
  "Ana",
  "Jose",
  "Liza",
];

export const DEFAULT_CONFIG: SimulationConfig = {
  contributionAmount: 1000,
  membersCount: 4,
  payoutScheme: "draw-lots",
};
