import { api } from "@/shared/lib/axios";

export async function verifyPayment(paymentId: string) {
  const response = await api.post(`/payments/${paymentId}/verify`);
  return response.data;
}
