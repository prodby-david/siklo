import { api } from "@/shared/lib/axios";
import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";

export async function updatePaymentSettings(data: PaymentAccountDetailsDTO) {
  return api.patch("/users/me/payment-accounts", data);
}

