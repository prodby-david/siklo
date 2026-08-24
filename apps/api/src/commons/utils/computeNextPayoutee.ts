import { PAID_ROUND_STATUS } from './computeGroupCompletion';

export interface NextPayoutRoundInput {
  cycleNumber: number;
  roundNumber: number;
  recipientId: string;
  targetDate: Date | string | null;
  status: string;
}

export interface NextPayouteeMemberInput {
  userId: string;
  position: number;
  user?: {
    id: string;
    name: string;
  } | null;
}

export interface NextPayouteeInput {
  rounds?: NextPayoutRoundInput[] | null;
  memberships?: NextPayouteeMemberInput[] | null;
}

export interface NextPayouteeResult {
  userId: string;
  name: string;
  position: number;
  cycleNumber: number;
  roundNumber: number;
  payoutDate: Date | string | null;
}

export function computeNextPayoutee(
  group: NextPayouteeInput,
): NextPayouteeResult | null {
  const nextRound = [...(group.rounds ?? [])]
    .filter((round) => round.status !== PAID_ROUND_STATUS)
    .sort((a, b) =>
      a.cycleNumber !== b.cycleNumber
        ? a.cycleNumber - b.cycleNumber
        : a.roundNumber - b.roundNumber,
    )[0];

  if (!nextRound) return null;

  const recipient = (group.memberships ?? []).find(
    (member) => member.userId === nextRound.recipientId,
  );

  return {
    userId: recipient?.userId ?? nextRound.recipientId,
    name: recipient?.user?.name ?? 'Unknown Member',
    position: recipient?.position ?? nextRound.roundNumber,
    cycleNumber: nextRound.cycleNumber,
    roundNumber: nextRound.roundNumber,
    payoutDate: nextRound.targetDate,
  };
}
