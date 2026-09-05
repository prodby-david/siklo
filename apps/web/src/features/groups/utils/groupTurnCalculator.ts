import { Membership, PaymentRecord, GroupRound } from "../types/group.types";
import { ApiActivity } from "../types/group-activity.types";

export interface GroupTurnStateResult {
  paidUserIdsByTurn: Record<string, Set<string>>;
  pendingUserIdsByTurn: Record<string, Set<string>>;
  rejectedUserIdsByTurn: Record<string, Set<string>>;
  paidOrganizerFeeUserIds: Set<string>;
  disbursedTurns: Set<string>;
  confirmedTurns: Set<string>;
  completedDisbursementDates: Record<number, Date>;
  currentCycle: number;
  currentTurn: number;
  isCycleDone: boolean;
}

export function calculateGroupTurnState(
  memberships: Membership[] = [],
  rounds: GroupRound[] = [],
  payments: PaymentRecord[] = [],
  activities: ApiActivity[] = [],
  cycleDuration: number = 1,
  hasStarted: boolean = false,
  organizerId?: string,
  organizerFeeAmount: number = 0,
): GroupTurnStateResult {
  const sortedMemberships = [...memberships].sort(
    (a, b) => a.position - b.position,
  );
  const totalMembers = sortedMemberships.length;
  const paidMap: Record<string, Set<string>> = {};
  const pendingMap: Record<string, Set<string>> = {};
  const rejectedMap: Record<string, Set<string>> = {};
  const paidOrganizerFeeUserIds = new Set<string>();
  const disbursedSet = new Set<string>();
  const confirmedSet = new Set<string>();
  const disbursementDates: Record<number, Date> = {};

  for (let c = 1; c <= cycleDuration; c++) {
    for (let t = 1; t <= Math.max(totalMembers, 1); t++) {
      paidMap[`${c}-${t}`] = new Set<string>();
      pendingMap[`${c}-${t}`] = new Set<string>();
      rejectedMap[`${c}-${t}`] = new Set<string>();
    }
  }

  if (rounds && rounds.length > 0) {
    rounds.forEach((rnd) => {
      const key = `${rnd.cycleNumber}-${rnd.roundNumber}`;
      if (!paidMap[key]) paidMap[key] = new Set<string>();
      if (!pendingMap[key]) pendingMap[key] = new Set<string>();
      if (!rejectedMap[key]) rejectedMap[key] = new Set<string>();

      if (rnd.payments) {
        rnd.payments.forEach((p) => {
          if (p.status === "VERIFIED") {
            paidMap[key].add(p.userId);
            if ((p.organizerFeeAmount || 0) > 0) {
              paidOrganizerFeeUserIds.add(p.userId);
            }
          } else if (p.status === "PENDING") {
            pendingMap[key].add(p.userId);
          } else if (p.status === "REJECTED") {
            rejectedMap[key].add(p.userId);
          }
        });
      }

      if (
        rnd.status === "DISBURSED" ||
        rnd.status === "RECEIVED" ||
        rnd.status === "PAID"
      ) {
        disbursedSet.add(key);
        confirmedSet.add(key);
        if (rnd.targetDate) {
          disbursementDates[rnd.roundNumber] = new Date(rnd.targetDate);
        }
      }
    });
  }

  if (payments && payments.length > 0) {
    payments.forEach((p) => {
      const matchedRound = rounds?.find((r) => r.id === p.roundId);
      const cycleNum = matchedRound ? matchedRound.cycleNumber : 1;
      const turnNum = matchedRound ? matchedRound.roundNumber : 1;
      const key = `${cycleNum}-${turnNum}`;

      if (!paidMap[key]) paidMap[key] = new Set<string>();
      if (!pendingMap[key]) pendingMap[key] = new Set<string>();
      if (!rejectedMap[key]) rejectedMap[key] = new Set<string>();

      if (p.status === "VERIFIED") {
        paidMap[key].add(p.userId);
        if ((p.organizerFeeAmount || 0) > 0) {
          paidOrganizerFeeUserIds.add(p.userId);
        }
      } else if (p.status === "PENDING") {
        pendingMap[key].add(p.userId);
      } else if (p.status === "REJECTED") {
        rejectedMap[key].add(p.userId);
      }
    });
  }

  if (activities && activities.length > 0) {
    activities.forEach((act: ApiActivity) => {
      const desc = act.description || "";
      const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
      const turnMatch = desc.match(/Turn #(\d+)/) || desc.match(/Round #(\d+)/);
      const cycleNum = cycleMatch ? parseInt(cycleMatch[1], 10) : 1;
      const turnNum = turnMatch ? parseInt(turnMatch[1], 10) : 1;
      const key = `${cycleNum}-${turnNum}`;

      if (!paidMap[key]) paidMap[key] = new Set<string>();

      if (act.activity === "PAYMENT_VERIFIED") {
        if (act.userId) {
          paidMap[key].add(act.userId);
        }
        const matchedMember = sortedMemberships.find(
          (m) =>
            desc.includes(m.user.name) ||
            desc.includes(`Turn #${m.position}`) ||
            desc.includes(`Round #${m.position}`),
        );
        if (matchedMember) {
          paidMap[key].add(matchedMember.userId);
        }
      }

      if (
        act.activity === "PAYOUT_DISBURSED" ||
        act.activity === "PAYOUT_RECEIVED"
      ) {
        disbursedSet.add(key);
        confirmedSet.add(key);
        if (act.createdAt) {
          disbursementDates[turnNum] = new Date(act.createdAt);
        }
      }
    });
  }

  let activeCycle = 1;
  let activeTurn = 1;
  let allFinished = false;

  if (totalMembers > 0) {
    let foundIncomplete = false;
    for (let c = 1; c <= cycleDuration; c++) {
      for (let t = 1; t <= totalMembers; t++) {
        const key = `${c}-${t}`;
        const isConfirmed = confirmedSet.has(key);
        if (!isConfirmed && !foundIncomplete) {
          activeCycle = c;
          activeTurn = t;
          foundIncomplete = true;
        }
      }
    }

    if (!foundIncomplete) {
      activeCycle = cycleDuration;
      activeTurn = totalMembers;

      const nonOrganizerMembers = sortedMemberships.filter(
        (m) => m.userId !== organizerId,
      );
      const areOrganizerFeesPaid =
        organizerFeeAmount <= 0 ||
        nonOrganizerMembers.every((m) =>
          paidOrganizerFeeUserIds.has(m.userId),
        );

      allFinished =
        hasStarted &&
        confirmedSet.size >= totalMembers * cycleDuration &&
        areOrganizerFeesPaid;
    }
  }

  return {
    paidUserIdsByTurn: paidMap,
    pendingUserIdsByTurn: pendingMap,
    rejectedUserIdsByTurn: rejectedMap,
    paidOrganizerFeeUserIds,
    disbursedTurns: disbursedSet,
    confirmedTurns: confirmedSet,
    completedDisbursementDates: disbursementDates,
    currentCycle: activeCycle,
    currentTurn: activeTurn,
    isCycleDone: allFinished,
  };
}
