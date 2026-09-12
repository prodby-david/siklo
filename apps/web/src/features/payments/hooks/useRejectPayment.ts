"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { rejectPayment } from "../api/rejectPayment";
import type { RejectPaymentDTO } from "@siklo/shared-schemas";
import { PAYMENT_QUERY_KEYS } from "../constants/payment.constants";
import { ACTIVITY_QUERY_KEY } from "@/features/groups/constants/activity.constants";
import { getApiErrorMessage } from "@/shared/utils/error.helper";

interface RejectPaymentVariables {
  paymentId: string;
  data: RejectPaymentDTO;
}

export function useRejectPayment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ paymentId, data }: RejectPaymentVariables) =>
      rejectPayment(paymentId, data),
    onSuccess: async () => {
      toast.success("Payment marked as rejected.");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [PAYMENT_QUERY_KEYS.PENDING_PAYMENTS],
        }),
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({ queryKey: [ACTIVITY_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
    },
    onError: (err: unknown) => {
      toast.error(getApiErrorMessage(err, "Failed to reject payment"));
    },
  });

  return {
    reject: mutation.mutateAsync,
    isRejecting: mutation.isPending,
  };
}

export default useRejectPayment;
