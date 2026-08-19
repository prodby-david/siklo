import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useGroupDetails } from "./useGroupDetails";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import useGetGroupActivities from "./useGetGroupActivities";
import useStartGroupCycle from "./useStartGroupCycle";
import useDeleteGroup from "./useDeleteGroup";
import useGroupSocket from "./useGroupSocket";
import { ApiActivity } from "../types/group.activity.types";
import { Membership, GroupRound, PaymentRecord } from "../types/group.types";

export function useGroupPageController() {
  const router = useRouter();
  const { data, isLoading, copied, handleCopyInviteCode, timeline, refetch } =
    useGroupDetails();
  const { data: currentUser } = useGetCurrentName();
  const { mutateAsync: startCycle, isPending: isStarting } =
    useStartGroupCycle();
  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  useGroupSocket(data?.id || "");

  const isOrganizer = currentUser?.id === data?.organizerId;
  const hasStarted = !!data?.startDate;
  const memberCount =
    data?.memberships?.length ?? data?._count?.memberships ?? 0;
  const isMembersFull =
    data?.maxMembers && data.maxMembers > 0
      ? memberCount >= data.maxMembers
      : false;

  const { data: activities = [] } = useGetGroupActivities(data?.id || "");

  const { isCycleDone, currentCycle, isCurrentUserPaid } = useMemo(() => {
    if (!data?.startDate || !data?.memberships || data.memberships.length === 0) {
      return { isCycleDone: false, currentCycle: 1, isCurrentUserPaid: false };
    }
    const duration = data.cycleDuration || 1;
    const totalMembers = data.memberships.length;
    const paidMap: Record<string, Set<string>> = {};
    const confirmedSet = new Set<string>();

    for (let c = 1; c <= duration; c++) {
      for (let t = 1; t <= Math.max(totalMembers, 1); t++) {
        paidMap[`${c}-${t}`] = new Set<string>();
      }
    }

    if (data.rounds && data.rounds.length > 0) {
      data.rounds.forEach((rnd: GroupRound) => {
        const key = `${rnd.cycleNumber}-${rnd.roundNumber}`;
        if (!paidMap[key]) {
          paidMap[key] = new Set<string>();
        }
        if (rnd.payments) {
          rnd.payments.forEach((p: PaymentRecord) => {
            if (p.status === "VERIFIED") {
              paidMap[key].add(p.userId);
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
        if (p.status === "VERIFIED") {
          const matchedRound = data.rounds?.find(
            (r: GroupRound) => r.id === p.roundId,
          );
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
        const matchedMember = data.memberships?.find(
          (m: Membership) =>
            desc.includes(m.user.name) || desc.includes(`Turn #${m.position}`),
        );
        if (matchedMember) {
          paidMap[key].add(matchedMember.userId);
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
      ? Boolean(paidMap[`${activeCycle}-${activeTurn}`]?.has(currentUser.id))
      : false;

    return {
      isCycleDone: allFinished,
      currentCycle: activeCycle,
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
      toast.success("Group deleted successfully!");
      setTimeout(() => {
        router.push("/group");
      }, 1000);
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : "Failed to delete group";
      toast.error(message);
    }
  };

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
    isCurrentUserPaid,
    handleStartCycle,
    isStarting,
    handleDeleteGroup,
    isDeleting,
    refetch,
    currentUserId: currentUser?.id,
  };
}
