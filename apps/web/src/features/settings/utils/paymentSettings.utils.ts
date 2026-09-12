import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import { PAYMENT_ACCOUNT_SECTIONS } from "../constants/settings.constants";
import type { PaymentAccountId } from "../types/payment-settings.types";

export function hasSavedAccountValue(
  accountId: PaymentAccountId,
  userAccounts?: PaymentAccountDetailsDTO | null,
): boolean {
  if (accountId === "gcash") {
    return Boolean(userAccounts?.gcashNumber || userAccounts?.gcashName);
  }
  if (accountId === "maya") {
    return Boolean(userAccounts?.mayaNumber || userAccounts?.mayaName);
  }
  return Boolean(userAccounts?.bankAccountNumber || userAccounts?.bankName);
}

export function restoreSavedAccount(
  accountId: PaymentAccountId,
  userAccounts: PaymentAccountDetailsDTO | null | undefined,
  onChange: (field: keyof PaymentAccountDetailsDTO, value: string) => void,
): void {
  const section = PAYMENT_ACCOUNT_SECTIONS.find(
    (account) => account.id === accountId,
  );
  section?.fields.forEach((field) => {
    onChange(field.name, userAccounts?.[field.name] || "");
  });
}
