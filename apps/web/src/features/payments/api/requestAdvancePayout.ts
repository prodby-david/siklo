import { api } from "@/shared/lib/axios";
import { RequestAdvancePayoutDTO } from "@siklo/shared-schemas";

export async function requestAdvancePayout(dto: RequestAdvancePayoutDTO) {
  const response = await api.post("/payments/payout-requests", dto);
  return response.data;
}
