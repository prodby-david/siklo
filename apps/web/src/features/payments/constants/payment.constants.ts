import { Wallet, Building2, Banknote } from "lucide-react";
import { PaymentMethod, PaymentMethodMeta } from "../types/payment.types";

export const PAYMENT_METHODS: PaymentMethod[] = [
  "E_WALLET",
  "BANK_TRANSFER",
  "CASH",
];

export const PAYMENT_METHOD_META: Record<PaymentMethod, PaymentMethodMeta> = {
  E_WALLET: {
    label: "E-Wallet",
    icon: Wallet,
  },
  BANK_TRANSFER: {
    label: "Bank Transfer",
    icon: Building2,
  },
  CASH: {
    label: "Cash on Hand",
    icon: Banknote,
  },
};

export const PAYMENT_QUERY_KEYS = {
  PENDING_PAYMENTS: "pending-payments",
  PAYMENT_DETAILS: "payment-details",
} as const;
