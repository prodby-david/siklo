import { useState, useCallback, useMemo } from "react";
import { useMarkMemberPaid } from "./useMarkMemberPaid";
import useGetGroupActivities from "./useGetGroupActivities";
import { Membership } from "../types/group.types";
import { ApiActivity } from "../types/group.activity.types";
import { toast } from "sonner";
import axios from "axios";

export function useGroupTurnShowcaseState(
  groupId: string,
  memberships: Membership[] = [],
  organizerId: string,
  startDate?: string | Date | null,
  cycleDuration: number = 1
) {
  const [selectedTurn, setSelectedTurn] = useState<number>(1);
  const { data: activities = [] } = useGetGroupActivities(groupId);
  const { mutateAsync: markPaid, isPending: isMarkingPaid } =
    useMarkMemberPaid(groupId);

  const hasStarted = !!startDate;

  const sortedMemberships = useMemo(() => {
    return [...memberships].sort((a, b) => a.position - b.position);
  }, [memberships]);

  const { paidUserIdsByCycle, currentCycle, isCycleDone } = useMemo(() => {
    const map: Record<number, Set<string>> = {};
    for (let c = 1; c <= cycleDuration; c++) {
      map[c] = new Set<string>();
    }

    (activities as ApiActivity[]).forEach((act: ApiActivity) => {
      if (act.activity === "PAYMENT_VERIFIED") {
        const desc = act.description || "";
        const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
        const cycleNum = cycleMatch ? parseInt(cycleMatch[1], 10) : 1;

        const matchedMember = sortedMemberships.find(
          (m) =>
            desc.includes(m.user.name) ||
            desc.includes(`Turn #${m.position}`)
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
  }, [activities, sortedMemberships, cycleDuration, hasStarted]);

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
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : err instanceof Error
          ? err.message
          : "Failed to mark member as paid";
        toast.error(message);
      }
    },
    [markPaid, currentCycle, isCycleDone]
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
