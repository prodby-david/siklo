"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ConfirmPayoutReceiptDTO } from "@siklo/shared-schemas";
import { confirmPayoutReceipt } from "../api/confirmPayoutReceipt";
import { getApiErrorMessage } from "../utils/error.helper";

export function useConfirmPayoutReceipt(groupId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: ConfirmPayoutReceiptDTO) => confirmPayoutReceipt(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
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
