"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitPayment } from "../api/submitPayment";
import type { SubmitPaymentDTO } from "@siklo/shared-schemas";
import { PAYMENT_QUERY_KEYS } from "../constants/payment.constants";
import { ACTIVITY_QUERY_KEY } from "@/features/groups/constants/activity.constants";
import { getApiErrorMessage } from "@/shared/utils/error.helper";

export function useSubmitPayment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: SubmitPaymentDTO) => submitPayment(dto),
    onSuccess: async () => {
      toast.success("Payment submitted successfully!");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [PAYMENT_QUERY_KEYS.PENDING_PAYMENTS],
        }),
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({ queryKey: ["group"] }),
        queryClient.invalidateQueries({ queryKey: [ACTIVITY_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
    },
    onError: (err: unknown) => {
      toast.error(getApiErrorMessage(err, "Failed to submit payment"));
    },
  });

  return {
    submit: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
  };
}

export default useSubmitPayment;
