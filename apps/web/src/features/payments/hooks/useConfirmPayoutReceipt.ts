"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ConfirmPayoutReceiptDTO } from "@siklo/shared-schemas";
import { confirmPayoutReceipt } from "../api/confirmPayoutReceipt";
import { getApiErrorMessage } from "@/shared/utils/error.helper";
import { ACTIVITY_QUERY_KEY } from "@/features/groups/constants/activity.constants";

export function useConfirmPayoutReceipt(groupId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: ConfirmPayoutReceiptDTO) => confirmPayoutReceipt(dto),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ACTIVITY_QUERY_KEY, groupId],
        }),
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
      toast.success("Payout receipt confirmed successfully!");
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(
        err,
        "Failed to confirm payout receipt",
      );
      toast.error(message);
    },
  });

  return {
    confirmReceipt: mutation.mutateAsync,
    isConfirmingReceipt: mutation.isPending,
  };
}
