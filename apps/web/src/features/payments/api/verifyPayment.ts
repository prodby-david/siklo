import { api } from "@/shared/lib/axios";

export async function verifyPayment(paymentId: string) {
  const response = await api.patch(`/payments/${paymentId}/verification`);
  return response.data;
}

