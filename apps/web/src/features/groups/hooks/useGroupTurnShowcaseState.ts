import { useState, useCallback, useMemo } from "react";
import { useMarkMemberPaid } from "@/features/payments/hooks/useMarkMemberPaid";
import { getApiErrorMessage } from "@/features/payments/utils/error.helper";
import useGetGroupActivities from "./useGetGroupActivities";
import { Membership, PaymentRecord, GroupRound } from "../types/group.types";
import { ApiActivity } from "../types/group.activity.types";
import { toast } from "sonner";

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
  const { markPaid, isMarkingPaid } = useMarkMemberPaid(groupId);

  const hasStarted = !!startDate;

  const sortedMemberships = useMemo(() => {
    return [...memberships].sort((a, b) => a.position - b.position);
  }, [memberships]);

  const {
    paidUserIdsByTurn,
    disbursedTurns,
    confirmedTurns,
    currentCycle,
    currentTurn,
    isCycleDone,
  } = useMemo(() => {
    const totalMembers = sortedMemberships.length;
    const paidMap: Record<string, Set<string>> = {};
    const disbursedSet = new Set<string>();
    const confirmedSet = new Set<string>();

    for (let c = 1; c <= cycleDuration; c++) {
      for (let t = 1; t <= Math.max(totalMembers, 1); t++) {
        paidMap[`${c}-${t}`] = new Set<string>();
      }
    }

    if (rounds && rounds.length > 0) {
      rounds.forEach((rnd) => {
        const key = `${rnd.cycleNumber}-${rnd.roundNumber}`;
        if (!paidMap[key]) {
          paidMap[key] = new Set<string>();
        }
        if (rnd.payments) {
          rnd.payments.forEach((p) => {
            if (p.status === "VERIFIED") {
              paidMap[key].add(p.userId);
            }
          });
        }
        if (rnd.status === "PAID") {
          disbursedSet.add(key);
          confirmedSet.add(key);
        }
      });
    }

    if (payments && payments.length > 0) {
      payments.forEach((p) => {
        if (p.status === "VERIFIED") {
          const matchedRound = rounds?.find((r) => r.id === p.roundId);
          const cycleNum = matchedRound ? matchedRound.cycleNumber : 1;
          const turnNum = matchedRound ? matchedRound.roundNumber : 1;
          const key = `${cycleNum}-${turnNum}`;
          if (!paidMap[key]) {
            paidMap[key] = new Set<string>();
          }
          paidMap[key].add(p.userId);
        }
      });
    }

    (activities as ApiActivity[]).forEach((act: ApiActivity) => {
      const desc = act.description || "";
      const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
      const turnMatch = desc.match(/Turn #(\d+)/);
      const cycleNum = cycleMatch ? parseInt(cycleMatch[1], 10) : 1;
      const turnNum = turnMatch ? parseInt(turnMatch[1], 10) : 1;
      const key = `${cycleNum}-${turnNum}`;

      if (!paidMap[key]) {
        paidMap[key] = new Set<string>();
      }

      if (act.activity === "PAYMENT_VERIFIED") {
        const matchedMember = sortedMemberships.find(
          (m) =>
            desc.includes(m.user.name) || desc.includes(`Turn #${m.position}`),
        );
        if (matchedMember) {
          paidMap[key].add(matchedMember.userId);
        }
      }

      if (act.activity === "PAYOUT_DISBURSED") {
        disbursedSet.add(key);
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
        allFinished = hasStarted && confirmedSet.size >= totalMembers * cycleDuration;
      }
    }

    return {
      paidUserIdsByTurn: paidMap,
      disbursedTurns: disbursedSet,
      confirmedTurns: confirmedSet,
      currentCycle: activeCycle,
      currentTurn: activeTurn,
      isCycleDone: allFinished,
    };
  }, [activities, payments, rounds, sortedMemberships, cycleDuration, hasStarted]);

  const paidMemberUserIds = useMemo(() => {
    return paidUserIdsByTurn[`${currentCycle}-${selectedTurn}`] || new Set<string>();
  }, [paidUserIdsByTurn, currentCycle, selectedTurn]);

  const handleSelectTurn = useCallback((turn: number) => {
    setSelectedTurn(turn);
  }, []);

  const handleMarkPaid = useCallback(
    async (memberUserId: string) => {
      if (isCycleDone) return;
      try {
        await markPaid({ memberUserId, cycleNumber: currentCycle });
        toast.success("Member marked as paid successfully!");
      } catch (err: unknown) {
        const message = getApiErrorMessage(
          err,
          "Failed to mark member as paid",
        );
        toast.error(message);
      }
    },
    [markPaid, currentCycle, isCycleDone],
  );

  return {
    selectedTurn,
    setSelectedTurn: handleSelectTurn,
    currentCycle,
    currentTurn,
    paidMemberUserIds,
    paidUserIdsByTurn,
    disbursedTurns,
    confirmedTurns,
    handleMarkPaid,
    isMarkingPaid,
    sortedMemberships,
    isCycleDone,
  };
}
