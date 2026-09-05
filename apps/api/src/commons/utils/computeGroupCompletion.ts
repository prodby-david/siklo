export const VERIFIED_PAYMENT_STATUS = 'VERIFIED';
export const COMPLETED_ROUND_STATUSES = new Set([
  'DISBURSED',
  'RECEIVED',
  'PAID',
]);

export interface GroupCompletionPayment {
  status: string;
  userId?: string;
  organizerFeeAmount?: number;
}

export interface GroupCompletionRound {
  status: string;
}

export interface GroupCompletionMembership {
  id?: string;
  userId?: string;
}

export interface GroupCompletionInput {
  startDate?: Date | string | null;
  organizerId?: string | null;
  organizerFeeAmount?: number | null;
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
  );
  const verifiedPaymentsCount = verifiedPayments.length;

  const isContributionsCollected =
    totalRequiredPayments > 0 && verifiedPaymentsCount >= totalRequiredPayments;

  const feeAmount = group.organizerFeeAmount || 0;
  const nonOrganizerMembers = (group.memberships ?? []).filter(
    (m) => m.userId && m.userId !== group.organizerId,
  );

  const areOrganizerFeesCollected =
    feeAmount <= 0 ||
    nonOrganizerMembers.every((m) =>
      verifiedPayments.some(
        (p) =>
          p.userId === m.userId && (p.organizerFeeAmount || 0) >= feeAmount,
      ),
    );

  const isFullyCollected =
    isContributionsCollected && areOrganizerFeesCollected;

  const totalRequiredPayouts = memberCount * duration;
  const paidRounds = (group.rounds ?? []).filter((r) =>
    COMPLETED_ROUND_STATUSES.has(r.status),
  ).length;

  const isFullyDistributed =
    totalRequiredPayouts > 0 && paidRounds >= totalRequiredPayouts;

  return {
    memberCount,
    totalRequiredPayments,
    verifiedPayments: verifiedPaymentsCount,
    totalRequiredPayouts,
    paidRounds,
    isFullyCollected,
    isFullyDistributed,
    isComplete: isFullyCollected && isFullyDistributed,
  };
}
