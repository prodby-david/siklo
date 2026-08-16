"use client";

import { useQuery } from "@tanstack/react-query";
import { getPendingPayments } from "../api/getPendingPayments";
import { PAYMENT_QUERY_KEYS } from "../constants/payment.constants";

export function usePendingPayments(groupId: string, enabled = true) {
  return useQuery({
    queryKey: [PAYMENT_QUERY_KEYS.PENDING_PAYMENTS, groupId],
    queryFn: () => getPendingPayments(groupId),
    enabled: Boolean(groupId && enabled),
  });
}
