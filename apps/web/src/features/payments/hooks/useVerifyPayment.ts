"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyPayment } from "../api/verifyPayment";
import { PAYMENT_QUERY_KEYS } from "../constants/payment.constants";
import { ACTIVITY_QUERY_KEY } from "@/features/groups/constants/activity.constants";
import { getApiErrorMessage } from "@/shared/utils/error.helper";

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (paymentId: string) => verifyPayment(paymentId),
    onSuccess: async () => {
      toast.success("Payment verified and approved!");
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
      toast.error(getApiErrorMessage(err, "Failed to verify payment"));
    },
  });

  return {
    verify: mutation.mutateAsync,
    isVerifying: mutation.isPending,
  };
}

export default useVerifyPayment;
