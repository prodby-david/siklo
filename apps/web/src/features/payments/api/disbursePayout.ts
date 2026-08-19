import { api } from "@/shared/lib/axios";
import { DisbursePayoutDTO } from "@siklo/shared-schemas";

export async function disbursePayout(dto: DisbursePayoutDTO) {
  const response = await api.post("/payments/disbursements", dto);
  return response.data;
}

