import { LucideIcon } from "lucide-react";

export type SettingsTabId = "profile" | "security" | "notifications";

export interface SettingsTab {
  id: SettingsTabId;
  label: string;
  icon: LucideIcon;
}

export interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  currency: string;
}

export interface SecurityFormValues {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  twoFactorEnabled: boolean;
}

export interface NotificationFormValues {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushAlerts: boolean;
  marketingEmails: boolean;
}
