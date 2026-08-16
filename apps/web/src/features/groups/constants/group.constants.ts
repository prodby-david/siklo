import { Wallet, Building2, Banknote } from "lucide-react";
import { PaymentMethodKey } from "../types/group.types";

export const PAYMENT_METHOD_OPTIONS: {
  key: PaymentMethodKey;
  label: string;
  icon: typeof Wallet;
}[] = [
  { key: "E_WALLET", label: "E-Wallet", icon: Wallet },
  { key: "BANK_TRANSFER", label: "Bank Transfer", icon: Building2 },
  { key: "CASH", label: "Cash on Hand", icon: Banknote },
];

export const GROUP_QUERY_KEYS = {
  GROUP_DETAILS: "group",
  GROUP_ACTIVITIES: "activities",
  GROUPS_LIST: "groups",
} as const;
