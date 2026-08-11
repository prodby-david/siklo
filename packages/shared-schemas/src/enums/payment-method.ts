import { z } from "zod";

export const PAYMENT_METHODS = ["E_WALLET", "BANK_TRANSFER", "CASH"] as const;

export const PAYMENT_METHOD_LABELS: Record<
  (typeof PAYMENT_METHODS)[number],
  string
> = {
  E_WALLET: "E-Wallet (GCash, Maya)",
  BANK_TRANSFER: "Bank Transfer",
  CASH: "Cash on Hand",
};

export const paymentMethodSchema = z.enum(PAYMENT_METHODS);

export type PaymentMethodType = (typeof PAYMENT_METHODS)[number];
