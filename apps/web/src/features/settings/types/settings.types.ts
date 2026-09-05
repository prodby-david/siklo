import type { LucideIcon } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UserProfileSettingDTO } from "@siklo/shared-schemas";

export type SettingsTabId =
  | "profile"
  | "security"
  | "notifications"
  | "payments";

export interface SettingsTab {
  id: SettingsTabId;
  label: string;
  icon: LucideIcon;
}

export type NotificationPreferenceKey =
  | "emailAlerts"
  | "smsAlerts"
  | "pushAlerts";

export interface NotificationPreferences {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushAlerts: boolean;
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

export interface ProfileEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<UserProfileSettingDTO>;
  errors: FieldErrors<UserProfileSettingDTO>;
  isSubmitting: boolean;
}
