import { useState, useCallback, useMemo } from "react";
import useGetGroupActivities from "./useGetGroupActivities";
import { Membership, PaymentRecord, GroupRound } from "../types/group.types";
import { ApiActivity } from "../types/group.activity.types";

export function useGroupTurnShowcaseState(
  groupId: string,
  memberships: Membership[] = [],
  organizerId: string,
  startDate?: string | Date | null,
  cycleDuration: number = 1,
  payments: PaymentRecord[] = [],
  rounds: GroupRound[] = [],
) {
  const [selectedTurn, setSelectedTurn] = useState<number>(1);
  const { data: activities = [] } = useGetGroupActivities(groupId);

  const hasStarted = !!startDate;

  const sortedMemberships = useMemo(() => {
    return [...memberships].sort((a, b) => a.position - b.position);
  }, [memberships]);

  const {
    paidUserIdsByTurn,
    pendingUserIdsByTurn,
    rejectedUserIdsByTurn,
    disbursedTurns,
    confirmedTurns,
    completedDisbursementDates,
    currentCycle,
    currentTurn,
    isCycleDone,
  } = useMemo(() => {
    const totalMembers = sortedMemberships.length;
    const paidMap: Record<string, Set<string>> = {};
    const pendingMap: Record<string, Set<string>> = {};
    const rejectedMap: Record<string, Set<string>> = {};
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
            } else if (p.status === "PENDING") {
              pendingMap[key].add(p.userId);
            } else if (p.status === "REJECTED") {
              rejectedMap[key].add(p.userId);
            }
          });
        }
        if (rnd.status === "PAID") {
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
        } else if (p.status === "PENDING") {
          pendingMap[key].add(p.userId);
        } else if (p.status === "REJECTED") {
          rejectedMap[key].add(p.userId);
        }
      });
    }

    (activities as ApiActivity[]).forEach((act: ApiActivity) => {
      const desc = act.description || "";
      const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
      const turnMatch =
        desc.match(/Turn #(\d+)/) || desc.match(/Round #(\d+)/);
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

      if (act.activity === "PAYOUT_DISBURSED") {
        disbursedSet.add(key);
        if (act.createdAt) {
          disbursementDates[turnNum] = new Date(act.createdAt);
        }
        if (desc.includes("confirmed receipt") || desc.includes("confirmed")) {
          confirmedSet.add(key);
        }
      }
    });

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
        allFinished =
          hasStarted && confirmedSet.size >= totalMembers * cycleDuration;
      }
    }

    return {
      paidUserIdsByTurn: paidMap,
      pendingUserIdsByTurn: pendingMap,
      rejectedUserIdsByTurn: rejectedMap,
      disbursedTurns: disbursedSet,
      confirmedTurns: confirmedSet,
      completedDisbursementDates: disbursementDates,
      currentCycle: activeCycle,
      currentTurn: activeTurn,
      isCycleDone: allFinished,
    };
  }, [activities, payments, rounds, sortedMemberships, cycleDuration, hasStarted]);

  const activeKey = `${currentCycle}-${selectedTurn}`;

  const paidMemberUserIds = useMemo(() => {
    return paidUserIdsByTurn[activeKey] || new Set<string>();
  }, [paidUserIdsByTurn, activeKey]);

  const pendingMemberUserIds = useMemo(() => {
    return pendingUserIdsByTurn[activeKey] || new Set<string>();
  }, [pendingUserIdsByTurn, activeKey]);

  const rejectedMemberUserIds = useMemo(() => {
    return rejectedUserIdsByTurn[activeKey] || new Set<string>();
  }, [rejectedUserIdsByTurn, activeKey]);

  const handleSelectTurn = useCallback((turn: number) => {
    setSelectedTurn(turn);
  }, []);

  return {
    selectedTurn,
    setSelectedTurn: handleSelectTurn,
    currentCycle,
    currentTurn,
    paidMemberUserIds,
    pendingMemberUserIds,
    rejectedMemberUserIds,
    paidUserIdsByTurn,
    pendingUserIdsByTurn,
    rejectedUserIdsByTurn,
    disbursedTurns,
    confirmedTurns,
    completedDisbursementDates,
    sortedMemberships,
    isCycleDone,
  };
}
