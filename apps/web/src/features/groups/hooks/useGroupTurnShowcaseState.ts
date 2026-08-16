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

  const { paidUserIdsByCycle, currentCycle, isCycleDone } = useMemo(() => {
    const map: Record<number, Set<string>> = {};
    for (let c = 1; c <= cycleDuration; c++) {
      map[c] = new Set<string>();
    }

    if (rounds && rounds.length > 0) {
      rounds.forEach((rnd) => {
        if (rnd.payments && map[rnd.cycleNumber]) {
          rnd.payments.forEach((p) => {
            if (p.status === "VERIFIED") {
              map[rnd.cycleNumber].add(p.userId);
            }
          });
        }
      });
    }

    if (payments && payments.length > 0) {
      payments.forEach((p) => {
        if (p.status === "VERIFIED") {
          const matchedRound = rounds?.find((r) => r.id === p.roundId);
          const cycleNum = matchedRound ? matchedRound.cycleNumber : 1;
          if (map[cycleNum]) {
            map[cycleNum].add(p.userId);
          }
        }
      });
    }

    (activities as ApiActivity[]).forEach((act: ApiActivity) => {
      if (act.activity === "PAYMENT_VERIFIED") {
        const desc = act.description || "";
        const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
        const cycleNum = cycleMatch ? parseInt(cycleMatch[1], 10) : 1;

        const matchedMember = sortedMemberships.find(
          (m) =>
            desc.includes(m.user.name) ||
            desc.includes(`Turn #${m.position}`),
        );

        if (matchedMember && map[cycleNum]) {
          map[cycleNum].add(matchedMember.userId);
        }
      }
    });

    let activeCycle = 1;
    const numMembers = sortedMemberships.length;

    if (numMembers > 0) {
      for (let c = 1; c <= cycleDuration; c++) {
        activeCycle = c;
        const count = map[c]?.size || 0;
        if (count < numMembers) {
          break;
        }
      }
    }

    const finalCyclePaidCount = map[cycleDuration]?.size || 0;
    const done =
      hasStarted &&
      numMembers > 0 &&
      activeCycle >= cycleDuration &&
      finalCyclePaidCount >= numMembers;

    return {
      paidUserIdsByCycle: map,
      currentCycle: activeCycle,
      isCycleDone: done,
    };
  }, [activities, payments, rounds, sortedMemberships, cycleDuration, hasStarted]);

  const paidMemberUserIds = useMemo(() => {
    return paidUserIdsByCycle[currentCycle] || new Set<string>();
  }, [paidUserIdsByCycle, currentCycle]);

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
    paidMemberUserIds,
    handleMarkPaid,
    isMarkingPaid,
    sortedMemberships,
    isCycleDone,
  };
}
