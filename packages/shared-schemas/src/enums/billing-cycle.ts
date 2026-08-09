export const BILLING_CYCLES = [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "BIMONTHLY",
  "QUARTERLY",
] as const;

export type BillingCycle = (typeof BILLING_CYCLES)[number];

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  BIMONTHLY: "Bi-weekly",
  MONTHLY: "Monthly",
  QUARTERLY: "Quarterly",
};

export const BILLING_CYCLE_DAYS: Record<BillingCycle, number> = {
  DAILY: 1,
  WEEKLY: 7,
  BIMONTHLY: 15,
  MONTHLY: 30,
  QUARTERLY: 90,
};
