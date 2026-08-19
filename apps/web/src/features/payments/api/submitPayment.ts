import { api } from "@/shared/lib/axios";
import { SubmitPaymentDTO } from "@siklo/shared-schemas";

export async function submitPayment(dto: SubmitPaymentDTO) {
  const response = await api.post("/payments", dto);
  return response.data;
}

