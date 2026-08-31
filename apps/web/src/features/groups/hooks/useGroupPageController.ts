"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import useGetGroupById from "./useGetGroupById";
import useStartGroupCycle from "./useStartGroupCycle";
import useDeleteGroup from "./useDeleteGroup";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { calculateGroupTurnState } from "../utils/groupTurnCalculator";
import { calculateCycleDetails } from "../utils/groupCalculations";
import { GroupRound } from "../types/group.types";

export function useGroupPageController() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;

  const { data, isLoading, refetch } = useGetGroupById(groupId);
  const { data: currentUser } = useGetCurrentName();
  const { mutateAsync: startCycle, isPending: isStarting } =
    useStartGroupCycle();
  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  const [copied, setCopied] = useState(false);

  const hasStarted = Boolean(data?.startDate);
  const isOrganizer = Boolean(
    currentUser?.id && data?.organizerId && currentUser.id === data.organizerId,
  );
  const isMembersFull =
    (data?.memberships?.length ?? 0) >= (data?.maxMembers ?? 0);

  const {
    isCycleDone,
    currentCycle,
    currentTurn,
    isCurrentUserPaid,
    isCurrentUserPending,
  } = useMemo(() => {
    if (!data?.memberships) {
      return {
        isCycleDone: false,
        currentCycle: 1,
        currentTurn: 1,
        isCurrentUserPaid: false,
        isCurrentUserPending: false,
      };
    }

    const state = calculateGroupTurnState(
      data.memberships,
      data.rounds ?? [],
      data.payments ?? [],
      [],
      data.cycleDuration || 1,
      hasStarted,
    );

    const activeKey = `${state.currentCycle}-${state.currentTurn}`;
    const currentMemberPaid =
      currentUser?.id && !state.isCycleDone
        ? Boolean(state.paidUserIdsByTurn[activeKey]?.has(currentUser.id))
        : false;
    const currentMemberPending =
      currentUser?.id && !state.isCycleDone
        ? Boolean(state.pendingUserIdsByTurn[activeKey]?.has(currentUser.id))
        : false;

    return {
      isCycleDone: state.isCycleDone,
      currentCycle: state.currentCycle,
      currentTurn: state.currentTurn,
      isCurrentUserPaid: currentMemberPaid,
      isCurrentUserPending: currentMemberPending,
    };
  }, [data, hasStarted, currentUser]);

  const handleStartCycle = async () => {
    if (!data?.id) return;
    try {
      await startCycle(data.id);
      toast.success("Group cycle started successfully!");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
          ? err.message
          : "Failed to start cycle";
      toast.error(message);
    }
  };

  const handleDeleteGroup = async () => {
    if (!data?.id) return;
    try {
      await deleteGroup(data.id);
      toast.success("Group deleted successfully");
      router.push("/group");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
          ? err.message
          : "Failed to delete group";
      toast.error(message);
    }
  };

  const handleCopyInviteCode = () => {
    if (!data?.inviteCode) return;
    navigator.clipboard.writeText(data.inviteCode);
    setCopied(true);
    toast.success("Invite code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const timeline = useMemo(() => {
    if (!data) return null;
    const details = calculateCycleDetails(
      data.contributionAmount,
      data.maxMembers,
      data.cycleDuration,
      data.billingCycle,
    );

    const startDateObj = data.startDate ? new Date(data.startDate) : new Date();
    const endDateObj = new Date(
      startDateObj.getTime() + details.totalDays * 24 * 60 * 60 * 1000,
    );

    return {
      ...details,
      startDate: startDateObj,
      endDate: endDateObj,
    };
  }, [data]);

  const currentRoundId = useMemo(
    () =>
      data?.rounds?.find(
        (round: GroupRound) =>
          round.cycleNumber === currentCycle &&
          round.roundNumber === currentTurn,
      )?.id,
    [data?.rounds, currentCycle, currentTurn],
  );

  return {
    data,
    isLoading,
    copied,
    handleCopyInviteCode,
    timeline,
    isOrganizer,
    hasStarted,
    isMembersFull,
    isCycleDone,
    currentCycle,
    currentTurn,
    currentRoundId,
    isCurrentUserPaid,
    isCurrentUserPending,
    handleStartCycle,
    isStarting,
    handleDeleteGroup,
    isDeleting,
    refetch,
    currentUserId: currentUser?.id,
  };
}
