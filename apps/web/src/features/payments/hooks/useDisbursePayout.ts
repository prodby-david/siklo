"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DisbursePayoutDTO } from "@siklo/shared-schemas";
import { disbursePayout } from "../api/disbursePayout";
import { getApiErrorMessage } from "../utils/error.helper";

export function useDisbursePayout(groupId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: DisbursePayoutDTO) => disbursePayout(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
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
