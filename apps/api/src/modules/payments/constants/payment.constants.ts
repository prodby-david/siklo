export const BILLING_CYCLE_DAYS: Record<string, number> = {
  DAILY: 1,
  WEEKLY: 7,
  BIMONTHLY: 15,
  MONTHLY: 30,
  QUARTERLY: 90,
};

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;
