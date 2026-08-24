"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import useGetGroupById from "./useGetGroupById";
import useStartGroupCycle from "./useStartGroupCycle";
import useDeleteGroup from "./useDeleteGroup";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { calculateCycleDetails } from "../utils/group.calculations";
import { GroupRound, PaymentRecord } from "../types/group.types";

export function useGroupPageController() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;

  const { data, isLoading, refetch } = useGetGroupById(groupId);
  const { data: currentUser } = useGetCurrentName();
  const { mutateAsync: startCycle, isPending: isStarting } = useStartGroupCycle();
  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  const [copied, setCopied] = useState(false);

  const hasStarted = Boolean(data?.startDate);
  const isOrganizer = Boolean(
    currentUser?.id && data?.organizerId && currentUser.id === data.organizerId
  );
  const isMembersFull = (data?.memberships?.length ?? 0) >= (data?.maxMembers ?? 0);

  const { isCycleDone, currentCycle, currentTurn, isCurrentUserPaid, isCurrentUserPending } = useMemo(() => {
    if (!data?.memberships) {
      return {
        isCycleDone: false,
        currentCycle: 1,
        currentTurn: 1,
        isCurrentUserPaid: false,
        isCurrentUserPending: false,
      };
    }
    const duration = data.cycleDuration || 1;
    const totalMembers = data.memberships.length;

    const paidByRound: Record<string, Set<string>> = {};
    const pendingByRound: Record<string, Set<string>> = {};
    const completedKeys = new Set<string>();

    for (let c = 1; c <= duration; c++) {
      for (let t = 1; t <= Math.max(totalMembers, 1); t++) {
        paidByRound[`${c}-${t}`] = new Set<string>();
        pendingByRound[`${c}-${t}`] = new Set<string>();
      }
    }

    (data.rounds ?? []).forEach((rnd: GroupRound) => {
      const key = `${rnd.cycleNumber}-${rnd.roundNumber}`;
      if (!paidByRound[key]) paidByRound[key] = new Set<string>();
      if (!pendingByRound[key]) pendingByRound[key] = new Set<string>();
      if (rnd.status === "PAID") completedKeys.add(key);

      rnd.payments?.forEach((p: PaymentRecord) => {
        if (p.status === "VERIFIED") paidByRound[key].add(p.userId);
        if (p.status === "PENDING") pendingByRound[key].add(p.userId);
      });
    });

    data.payments?.forEach((p: PaymentRecord) => {
      const matchedRound = data.rounds?.find((r: GroupRound) => r.id === p.roundId);
      if (!matchedRound) return;
      const key = `${matchedRound.cycleNumber}-${matchedRound.roundNumber}`;
      if (!paidByRound[key]) paidByRound[key] = new Set<string>();
      if (!pendingByRound[key]) pendingByRound[key] = new Set<string>();
      if (p.status === "VERIFIED") paidByRound[key].add(p.userId);
      if (p.status === "PENDING") pendingByRound[key].add(p.userId);
    });

    const nextRound = [...(data.rounds ?? [])]
      .filter((r: GroupRound) => r.status !== "PAID")
      .sort(
        (a: GroupRound, b: GroupRound) =>
          a.cycleNumber !== b.cycleNumber
            ? a.cycleNumber - b.cycleNumber
            : a.roundNumber - b.roundNumber
      )[0];

    const allFinished =
      hasStarted && completedKeys.size >= totalMembers * duration;

    const activeCycle = nextRound ? nextRound.cycleNumber : duration;
    const activeTurn = nextRound ? nextRound.roundNumber : totalMembers;

    const activeKey = `${activeCycle}-${activeTurn}`;
    const currentMemberPaid = currentUser?.id && nextRound
      ? Boolean(paidByRound[activeKey]?.has(currentUser.id))
      : false;
    const currentMemberPending = currentUser?.id && nextRound
      ? Boolean(pendingByRound[activeKey]?.has(currentUser.id))
      : false;

    return {
      isCycleDone: allFinished,
      currentCycle: activeCycle,
      currentTurn: activeTurn,
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
      data.billingCycle
    );

    const startDateObj = data.startDate ? new Date(data.startDate) : new Date();
    const endDateObj = new Date(
      startDateObj.getTime() + details.totalDays * 24 * 60 * 60 * 1000
    );

    return {
      ...details,
      startDate: startDateObj,
      endDate: endDateObj,
    };
  }, [data]);

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
