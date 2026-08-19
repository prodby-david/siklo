"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RequestAdvancePayoutDTO } from "@siklo/shared-schemas";
import { requestAdvancePayout } from "../api/requestAdvancePayout";
import { getApiErrorMessage } from "../utils/error.helper";

export function useRequestAdvancePayout(groupId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: RequestAdvancePayoutDTO) => requestAdvancePayout(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
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
