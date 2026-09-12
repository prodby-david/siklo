"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DisbursePayoutDTO } from "@siklo/shared-schemas";
import { disbursePayout } from "../api/disbursePayout";
import { getApiErrorMessage } from "@/shared/utils/error.helper";
import { ACTIVITY_QUERY_KEY } from "@/features/groups/constants/activity.constants";

export function useDisbursePayout(groupId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: DisbursePayoutDTO) => disbursePayout(dto),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ACTIVITY_QUERY_KEY, groupId],
        }),
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
      toast.success("Payout marked as disbursed successfully!");
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(err, "Failed to disburse payout");
      toast.error(message);
    },
  });

  return {
    disburse: mutation.mutateAsync,
    isDisbursing: mutation.isPending,
  };
}
