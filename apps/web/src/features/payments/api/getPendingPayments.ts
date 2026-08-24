import { api } from "@/shared/lib/axios";
import { IncomingPaymentItem } from "../types/payment.types";

export async function getPendingPayments(
  groupId?: string,
): Promise<IncomingPaymentItem[]> {
  const url = groupId ? `/payments?groupId=${groupId}` : "/payments";
  const response = await api.get<IncomingPaymentItem[]>(url);
  return response.data;
}
