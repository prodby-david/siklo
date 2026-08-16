"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { markMemberPaid } from "../api/markMemberPaid";
import { markMemberRejected } from "../api/markMemberRejected";
import { getApiErrorMessage } from "../utils/error.helper";

export function useMarkMemberPaid(groupId: string) {
  const queryClient = useQueryClient();

  const markPaidMutation = useMutation({
    mutationFn: ({
      memberUserId,
      cycleNumber,
      referenceNumber,
      proofUrl,
    }: {
      memberUserId: string;
      cycleNumber?: number;
      referenceNumber?: string;
      proofUrl?: string;
    }) =>
      markMemberPaid(
        groupId,
        memberUserId,
        cycleNumber,
        referenceNumber,
        proofUrl,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
      toast.success("Member marked as paid successfully");
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(err, "Failed to mark member as paid");
      toast.error(message);
    },
  });

  const markRejectedMutation = useMutation({
    mutationFn: ({
      memberUserId,
      reason,
      cycleNumber,
      rejectionProofUrl,
    }: {
      memberUserId: string;
      reason?: string;
      cycleNumber?: number;
      rejectionProofUrl?: string;
    }) =>
      markMemberRejected(
        groupId,
        memberUserId,
        reason,
        cycleNumber,
        rejectionProofUrl,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
      toast.info("Payment marked as rejected. Member remains unpaid.");
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(err, "Failed to reject payment");
      toast.error(message);
    },
  });

  return {
    markPaid: markPaidMutation.mutateAsync,
    isMarkingPaid: markPaidMutation.isPending,
    markRejected: markRejectedMutation.mutateAsync,
    isRejecting: markRejectedMutation.isPending,
  };
}
