import { api } from "@/shared/lib/axios";
import { RejectPaymentDTO } from "@siklo/shared-schemas";

export async function rejectPayment(paymentId: string, dto: RejectPaymentDTO) {
  const response = await api.post(`/payments/${paymentId}/reject`, dto);
  return response.data;
}
