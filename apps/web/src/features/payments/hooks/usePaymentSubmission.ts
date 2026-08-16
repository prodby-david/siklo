"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitPayment } from "../api/submitPayment";
import { SubmitPaymentDTO } from "@siklo/shared-schemas";
import { getApiErrorMessage } from "../utils/error.helper";

export function usePaymentSubmission(groupId: string) {
  const queryClient = useQueryClient();

  const submissionMutation = useMutation({
    mutationFn: (dto: SubmitPaymentDTO) => submitPayment(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["activities", groupId],
      });
      toast.success("Payment submitted successfully! Awaiting verification.");
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(
        err,
        "Failed to submit payment. Please try again.",
      );
      toast.error(message);
    },
  });

  return {
    submitPayment: submissionMutation.mutateAsync,
    isSubmitting: submissionMutation.isPending,
  };
}
