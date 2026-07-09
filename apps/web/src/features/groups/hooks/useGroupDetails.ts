import { useState } from "react";
import { useParams } from "next/navigation";
import useGetGroupById from "./useGetGroupById";
import { calculateGroupTimeline } from "../utils/calculateGroupTimeline";
import { toast } from "sonner";

export function useGroupDetails() {
  const { groupId } = useParams();
  const { data, isLoading } = useGetGroupById(groupId as string);
  const [copied, setCopied] = useState(false);

  const handleCopyInviteCode = () => {
    if (data?.inviteCode) {
      navigator.clipboard.writeText(data.inviteCode);
      setCopied(true);
      toast.success("Invite code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const timeline = data
    ? calculateGroupTimeline({
        contributionAmount: data.contributionAmount,
        maxMembers: data.maxMembers,
        cycleDuration: data.cycleDuration,
        billingCycle: data.billingCycle,
        startDate: data.startDate,
      })
    : null;

  return {
    data,
    isLoading,
    copied,
    handleCopyInviteCode,
    timeline,
  };
}
