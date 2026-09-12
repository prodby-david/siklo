import { useMemo } from "react";
import type { GroupRound, Membership, PaymentRecord } from "../types/group.types";

interface UseGroupRoundsStatusParams {
  rounds?: GroupRound[];
  currentCycle: number;
  currentTurn: number;
  memberships?: Membership[];
  organizerId?: string;
  organizerFeeAmount?: number;
  payments?: PaymentRecord[];
  maxMembers: number;
  contributionAmount: number | string;
}

export function useGroupRoundsStatus({
  rounds = [],
  currentCycle,
  currentTurn,
  memberships = [],
  organizerId,
  organizerFeeAmount = 0,
  payments = [],
  maxMembers,
  contributionAmount,
}: UseGroupRoundsStatusParams) {
  const contributionNum = Number(contributionAmount) || 0;
  const poolTotal = contributionNum * maxMembers;
  const organizerFeeNum = organizerFeeAmount || 0;

  const currentRound = useMemo(
    () =>
      rounds.find(
        (r) => r.cycleNumber === currentCycle && r.roundNumber === currentTurn,
      ),
    [rounds, currentCycle, currentTurn],
  );

  const activeBeneficiaryMembership = useMemo(
    () => memberships.find((m) => m.position === currentTurn),
    [memberships, currentTurn],
  );

  const activeBeneficiaryName =
    activeBeneficiaryMembership?.user?.name || `Slot #${currentTurn}`;

  const verifiedPaymentsCount = useMemo(() => {
    if (!currentRound) return 0;
    const currentRoundPayments = payments.filter(
      (p) => p.roundId === currentRound.id && p.status === "VERIFIED",
    );
    const uniqueUserIds = new Set(currentRoundPayments.map((p) => p.userId));
    return uniqueUserIds.size;
  }, [currentRound, payments]);

  const progressPercent = Math.min(
    100,
    Math.round((verifiedPaymentsCount / maxMembers) * 100),
  );

  const nonOrganizerMembers = useMemo(
    () => memberships.filter((m) => m.userId !== organizerId),
    [memberships, organizerId],
  );

  const paidOrganizerFeeCount = useMemo(() => {
    if (organizerFeeNum <= 0) return 0;
    const paidIds = new Set<string>();
    payments.forEach((p) => {
      if (p.status === "VERIFIED" && (p.organizerFeeAmount || 0) > 0) {
        paidIds.add(p.userId);
      }
    });
    return nonOrganizerMembers.filter((m) => paidIds.has(m.userId)).length;
  }, [payments, nonOrganizerMembers, organizerFeeNum]);

  const feeProgressPercent =
    nonOrganizerMembers.length > 0
      ? Math.min(
          100,
          Math.round(
            (paidOrganizerFeeCount / nonOrganizerMembers.length) * 100,
          ),
        )
      : 100;

  const isRoundDisbursed = currentRound?.status === "DISBURSED";
  const isRoundReceived = currentRound?.status === "RECEIVED";
  const isRoundAllPaid = verifiedPaymentsCount >= maxMembers;

  return {
    contributionNum,
    poolTotal,
    organizerFeeNum,
    currentRound,
    activeBeneficiaryMembership,
    activeBeneficiaryName,
    verifiedPaymentsCount,
    progressPercent,
    nonOrganizerMembers,
    paidOrganizerFeeCount,
    feeProgressPercent,
    isRoundDisbursed,
    isRoundReceived,
    isRoundAllPaid,
  };
}
