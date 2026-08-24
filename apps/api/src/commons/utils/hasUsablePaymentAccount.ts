interface PaymentAccountsInput {
  gcashNumber?: string | null;
  mayaNumber?: string | null;
  bankAccountNumber?: string | null;
}

export function hasUsablePaymentAccount(
  accounts: unknown,
): accounts is PaymentAccountsInput {
  if (!accounts || typeof accounts !== 'object') return false;

  const { gcashNumber, mayaNumber, bankAccountNumber } = accounts as Record<
    string,
    unknown
  >;

  return [gcashNumber, mayaNumber, bankAccountNumber].some(
    (number) => typeof number === 'string' && number.trim().length > 0,
  );
}
