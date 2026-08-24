export const VERIFIED_PAYMENT_STATUS = 'VERIFIED';
export const PAID_ROUND_STATUS = 'PAID';

export interface GroupCompletionPayment {
  status: string;
}

export interface GroupCompletionRound {
  status: string;
}

export interface GroupCompletionMembership {
  id?: string;
}

export interface GroupCompletionInput {
  startDate?: Date | string | null;
  memberships?: GroupCompletionMembership[] | null;
  maxMembers?: number | null;
  cycleDuration?: number | null;
  payments?: GroupCompletionPayment[] | null;
  rounds?: GroupCompletionRound[] | null;
}

export interface GroupCompletionResult {
  memberCount: number;
  totalRequiredPayments: number;
  verifiedPayments: number;
  totalRequiredPayouts: number;
  paidRounds: number;
  isFullyCollected: boolean;
  isFullyDistributed: boolean;
  isComplete: boolean;
}

const EMPTY_COMPLETION_RESULT: GroupCompletionResult = {
  memberCount: 0,
  totalRequiredPayments: 0,
  verifiedPayments: 0,
  totalRequiredPayouts: 0,
  paidRounds: 0,
  isFullyCollected: false,
  isFullyDistributed: false,
  isComplete: false,
};

export function computeGroupCompletion(
  group: GroupCompletionInput,
): GroupCompletionResult {
  if (!group.startDate) {
    return EMPTY_COMPLETION_RESULT;
  }

  const memberCount = group.memberships?.length ?? group.maxMembers ?? 0;
  if (memberCount <= 0) {
    return EMPTY_COMPLETION_RESULT;
  }

  const duration = group.cycleDuration || 1;

  const totalRequiredPayments = duration * memberCount * memberCount;
  const verifiedPayments = (group.payments ?? []).filter(
    (p) => p.status === VERIFIED_PAYMENT_STATUS,
  ).length;

  const totalRequiredPayouts = memberCount * duration;
  const paidRounds = (group.rounds ?? []).filter(
    (r) => r.status === PAID_ROUND_STATUS,
  ).length;

  const isFullyCollected =
    totalRequiredPayments > 0 && verifiedPayments >= totalRequiredPayments;
  const isFullyDistributed =
    totalRequiredPayouts > 0 && paidRounds >= totalRequiredPayouts;

  return {
    memberCount,
    totalRequiredPayments,
    verifiedPayments,
    totalRequiredPayouts,
    paidRounds,
    isFullyCollected,
    isFullyDistributed,
    isComplete: isFullyCollected && isFullyDistributed,
  };
}
