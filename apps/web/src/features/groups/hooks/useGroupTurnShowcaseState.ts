import { useState, useCallback, useMemo } from "react";
import useGetGroupActivities from "./useGetGroupActivities";
import { Membership, PaymentRecord, GroupRound } from "../types/group.types";
import { ApiActivity } from "../types/group-activity.types";
import { calculateGroupTurnState } from "../utils/groupTurnCalculator";

export function useGroupTurnShowcaseState(
  groupId: string,
  memberships: Membership[] = [],
  organizerId: string,
  startDate?: string | Date | null,
  cycleDuration: number = 1,
  payments: PaymentRecord[] = [],
  rounds: GroupRound[] = [],
  organizerFeeAmount: number = 0,
) {
  const { data: activities = [] } = useGetGroupActivities(groupId);

  const hasStarted = !!startDate;

  const sortedMemberships = useMemo(() => {
    return [...memberships].sort((a, b) => a.position - b.position);
  }, [memberships]);

  const {
    paidUserIdsByTurn,
    pendingUserIdsByTurn,
    rejectedUserIdsByTurn,
    paidOrganizerFeeUserIds,
    disbursedTurns,
    confirmedTurns,
    completedDisbursementDates,
    currentCycle,
    currentTurn,
    isCycleDone,
  } = useMemo(() => {
    return calculateGroupTurnState(
      memberships,
      rounds,
      payments,
      activities as ApiActivity[],
      cycleDuration,
      hasStarted,
      organizerId,
      organizerFeeAmount,
    );
  }, [
    activities,
    payments,
    rounds,
    memberships,
    cycleDuration,
    hasStarted,
    organizerId,
    organizerFeeAmount,
  ]);

  const [selectedTurnOverride, setSelectedTurnOverride] = useState<
    number | null
  >(null);
  const selectedTurn = selectedTurnOverride ?? currentTurn;

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
    setSelectedTurnOverride(turn);
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
    paidOrganizerFeeUserIds,
    disbursedTurns,
    confirmedTurns,
    completedDisbursementDates,
    sortedMemberships,
    isCycleDone,
  };
}
