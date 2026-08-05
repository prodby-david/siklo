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
import { Membership } from "../types/group.types";

export function useGroupPageController() {
  const router = useRouter();
  const { data, isLoading, copied, handleCopyInviteCode, timeline } =
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

  const isCycleDone = useMemo(() => {
    if (!data?.startDate || !data?.memberships || data.memberships.length === 0)
      return false;
    const duration = data.cycleDuration || 1;
    const map: Record<number, Set<string>> = {};
    (activities as ApiActivity[]).forEach((act: ApiActivity) => {
      if (act.activity === "PAYMENT_VERIFIED") {
        const desc = act.description || "";
        const cycleMatch = desc.match(/\(Cycle (\d+)\)/);
        const cycleNum = cycleMatch ? parseInt(cycleMatch[1], 10) : 1;
        const matchedMember = data.memberships?.find(
          (m: Membership) =>
            desc.includes(m.user.name) || desc.includes(`Turn #${m.position}`)
        );
        if (matchedMember) {
          if (!map[cycleNum]) map[cycleNum] = new Set();
          map[cycleNum].add(matchedMember.userId);
        }
      }
    });
    const finalCount = map[duration]?.size || 0;
    return finalCount >= data.memberships.length;
  }, [data, activities]);

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
    handleStartCycle,
    isStarting,
    handleDeleteGroup,
    isDeleting,
    currentUserId: currentUser?.id,
  };
}
