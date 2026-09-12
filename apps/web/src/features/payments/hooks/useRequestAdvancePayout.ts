"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RequestAdvancePayoutDTO } from "@siklo/shared-schemas";
import { requestAdvancePayout } from "../api/requestAdvancePayout";
import { getApiErrorMessage } from "@/shared/utils/error.helper";
import { ACTIVITY_QUERY_KEY } from "@/features/groups/constants/activity.constants";

export function useRequestAdvancePayout(groupId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: RequestAdvancePayoutDTO) => requestAdvancePayout(dto),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ACTIVITY_QUERY_KEY, groupId],
        }),
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
      toast.success("Advance payout request submitted successfully!");
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(
        err,
        "Failed to request advance payout",
      );
      toast.error(message);
    },
  });

  return {
    requestPayout: mutation.mutateAsync,
    isRequesting: mutation.isPending,
  };
}
