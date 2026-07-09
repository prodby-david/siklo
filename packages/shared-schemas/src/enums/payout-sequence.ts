export const PAYOUT_SEQUENCES = [
  "RANDOM",
  "MANUAL",
  "FREECHOOSING",
] as const;

export type PayoutSequence = (typeof PAYOUT_SEQUENCES)[number];

export const PAYOUT_SEQUENCE_LABELS: Record<PayoutSequence, string> = {
  RANDOM: "Randomized",
  MANUAL: "Manual",
  FREECHOOSING: "Free Choosing",
};

export const PAYOUT_SEQUENCE_DESCRIPTIONS: Record<PayoutSequence, string> = {
  RANDOM: "Shuffle slots randomly",
  MANUAL: "First come, first served",
  FREECHOOSING: "Members choose their payout slot",
};
