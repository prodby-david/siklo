import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import type { PaymentMethodKey } from "../types/group.types";

export default function getPaymentMethodDetails(
  paymentMethod: PaymentMethodKey,
  accounts?: PaymentAccountDetailsDTO,
) {
  if (paymentMethod === "E_WALLET") {
    return accounts?.gcashNumber || accounts?.mayaNumber
      ? `GCash: ${accounts?.gcashNumber || "—"} | Maya: ${accounts?.mayaNumber || "—"}`
      : "Default saved mobile wallet";
  }

  if (paymentMethod === "BANK_TRANSFER") {
    return accounts?.bankAccountNumber
      ? `${accounts.bankName || "Bank"}: ${accounts.bankAccountNumber}`
      : "Default saved bank account";
  }

  return "In-person cash handover to organizer";
}
