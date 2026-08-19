import { api } from "@/shared/lib/axios";
import { ConfirmPayoutReceiptDTO } from "@siklo/shared-schemas";

export async function confirmPayoutReceipt(dto: ConfirmPayoutReceiptDTO) {
  const response = await api.post("/payments/receipts", dto);
  return response.data;
}

