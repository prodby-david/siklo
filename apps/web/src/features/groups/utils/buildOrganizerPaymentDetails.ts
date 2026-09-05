import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import type { PaymentMethodKey } from "../types/group.types";

export default function buildOrganizerPaymentDetails(
  selectedMethods: PaymentMethodKey[],
  accounts?: PaymentAccountDetailsDTO,
) {
  const paymentDetails: string[] = [];

  if (selectedMethods.includes("E_WALLET")) {
    if (accounts?.gcashNumber) {
      paymentDetails.push(
        `GCash: ${accounts.gcashNumber} (${accounts.gcashName || "Organizer"})`,
      );
    }
    if (accounts?.mayaNumber) {
      paymentDetails.push(
        `Maya: ${accounts.mayaNumber} (${accounts.mayaName || "Organizer"})`,
      );
    }
  }

  if (
    selectedMethods.includes("BANK_TRANSFER") &&
    accounts?.bankAccountNumber
  ) {
    paymentDetails.push(
      `${accounts.bankName || "Bank"}: ${accounts.bankAccountNumber} (${accounts.gcashName || accounts.mayaName || "Organizer"})`,
    );
  }

  if (selectedMethods.includes("CASH")) {
    paymentDetails.push("Cash on Hand");
  }

  return paymentDetails.join("\n");
}
