import { api } from "@/shared/lib/axios";
import { IncomingPaymentItem } from "../types/payment.types";

export async function getPendingPayments(
  groupId: string,
): Promise<IncomingPaymentItem[]> {
  const response = await api.get<IncomingPaymentItem[]>(
    `/payments/pending?groupId=${groupId}`,
  );
  return response.data;
}
