"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import useGetGroupById from "./useGetGroupById";
import useGetGroupActivities from "./useGetGroupActivities";
import useStartGroupCycle from "./useStartGroupCycle";
import useDeleteGroup from "./useDeleteGroup";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { calculateCycleDetails } from "../utils/group.calculations";
import { Membership, PaymentRecord, GroupRound } from "../types/group.types";
import { ApiActivity } from "../types/group.activity.types";

export function useGroupPageController() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;

  const { data, isLoading, refetch } = useGetGroupById(groupId);
  const { data: activities = [] } = useGetGroupActivities(groupId);
  const { data: currentUser } = useGetCurrentName();
  const { mutateAsync: startCycle, isPending: isStarting } = useStartGroupCycle();
  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  const [copied, setCopied] = useState(false);

  const hasStarted = Boolean(data?.startDate);
  const isOrganizer = Boolean(
    currentUser?.id && data?.organizerId && currentUser.id === data.organizerId
  );
  const isMembersFull = (data?.memberships?.length ?? 0) >= (data?.maxMembers ?? 0);

  const { isCycleDone, currentCycle, currentTurn, isCurrentUserPaid } = useMemo(() => {
    if (!data?.memberships) {
      return { isCycleDone: false, currentCycle: 1, currentTurn: 1, isCurrentUserPaid: false };
    }
    const duration = data.cycleDuration || 1;
    const totalMembers = data.memberships.length;
    const paidByRound: Record<string, Set<string>> = {};
    const confirmedSet = new Set<string>();

    for (let c = 1; c <= duration; c++) {
      for (let t = 1; t <= Math.max(totalMembers, 1); t++) {
        paidByRound[`${c}-${t}`] = new Set<string>();
      }
    }

    if (data.rounds && data.rounds.length > 0) {
      data.rounds.forEach((rnd: GroupRound) => {
        const key = `${rnd.cycleNumber}-${rnd.roundNumber}`;
        if (!paidByRound[key]) paidByRound[key] = new Set<string>();

        if (rnd.payments) {
          rnd.payments.forEach((p: PaymentRecord) => {
            if (p.status === "VERIFIED") {
              paidByRound[key].add(p.userId);
            }
          });
        }
        if (rnd.status === "PAID") {
          confirmedSet.add(key);
        }
      });
    }

    if (data.payments && data.payments.length > 0) {
      data.payments.forEach((p: PaymentRecord) => {
        const matchedRound = data.rounds?.find(
          (r: GroupRound) => r.id === p.roundId,
        );
        const c = matchedRound ? matchedRound.cycleNumber : 1;
        const t = matchedRound ? matchedRound.roundNumber : 1;
        const key = `${c}-${t}`;
        if (!paidByRound[key]) paidByRound[key] = new Set<string>();

        if (p.status === "VERIFIED") {
          paidByRound[key].add(p.userId);
        }
      });
    }

    (activities as ApiActivity[]).forEach((act: ApiActivity) => {
      const desc = act.description || "";
      const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
      const turnMatch = desc.match(/Turn #(\d+)/) || desc.match(/Round #(\d+)/);
      const c = cycleMatch ? parseInt(cycleMatch[1], 10) : 1;
      const t = turnMatch ? parseInt(turnMatch[1], 10) : 1;
      const key = `${c}-${t}`;
      if (!paidByRound[key]) paidByRound[key] = new Set<string>();

      if (act.activity === "PAYMENT_VERIFIED") {
        if (act.userId) {
          paidByRound[key].add(act.userId);
        }
        const matchedMember = data.memberships?.find(
          (m: Membership) =>
            desc.includes(m.user.name) ||
            desc.includes(`Turn #${m.position}`) ||
            desc.includes(`Round #${m.position}`),
        );
        if (matchedMember) {
          paidByRound[key].add(matchedMember.userId);
        }
      }

      if (act.activity === "PAYOUT_DISBURSED") {
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
      for (let c = 1; c <= duration; c++) {
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
        activeCycle = duration;
        activeTurn = totalMembers;
        allFinished = hasStarted && confirmedSet.size >= totalMembers * duration;
      }
    }

    const currentMemberPaid = currentUser?.id
      ? Boolean(paidByRound[`${activeCycle}-${activeTurn}`]?.has(currentUser.id))
      : false;

    return {
      isCycleDone: allFinished,
      currentCycle: activeCycle,
      currentTurn: activeTurn,
      isCurrentUserPaid: currentMemberPaid,
    };
  }, [data, activities, hasStarted, currentUser]);

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
    handleStartCycle,
    isStarting,
    handleDeleteGroup,
    isDeleting,
    refetch,
    currentUserId: currentUser?.id,
  };
}
