import type { LucideIcon } from "lucide-react";
import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";

export type PaymentAccountId = "gcash" | "maya" | "bank";

export interface PaymentAccountFieldConfig {
  name: keyof PaymentAccountDetailsDTO;
  label: string;
  placeholder: string;
  maxLength?: number;
  inputMode?: "text" | "numeric";
  icon: LucideIcon;
}

export interface PaymentAccountSectionConfig {
  id: PaymentAccountId;
  title: string;
  icon: LucideIcon;
  fields: PaymentAccountFieldConfig[];
}

export interface PaymentAccountSectionProps {
  config: PaymentAccountSectionConfig;
  values: PaymentAccountDetailsDTO;
  hasSavedValue: boolean;
  isEditing: boolean;
  onChange: (field: keyof PaymentAccountDetailsDTO, value: string) => void;
  onToggleEditing: () => void;
}
