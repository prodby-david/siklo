import {
  User,
  Lock,
  Bell,
  CreditCard,
  Wallet,
  Landmark,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  BellRing,
} from "lucide-react";
import type {
  NotificationPreferenceKey,
  SettingsTab,
} from "../types/settings.types";
import type { PaymentAccountSectionConfig } from "../types/payment-settings.types";

export const SETTINGS_TABS: SettingsTab[] = [
  {
    id: "profile",
    label: "Profile Settings",
    icon: User,
  },
  {
    id: "security",
    label: "Login & Security",
    icon: Lock,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "payments",
    label: "Payment & Payout",
    icon: CreditCard,
  },
];

export const PAYMENT_ACCOUNT_SECTIONS: PaymentAccountSectionConfig[] = [
  {
    id: "gcash",
    title: "GCash Account",
    icon: Wallet,
    fields: [
      {
        name: "gcashName",
        label: "Account Holder Name",
        placeholder: "e.g. Juan Dela Cruz",
        icon: User,
      },
      {
        name: "gcashNumber",
        label: "GCash Mobile Number (11 digits)",
        placeholder: "e.g. 09171234567",
        maxLength: 11,
        inputMode: "numeric",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "maya",
    title: "Maya Account",
    icon: Wallet,
    fields: [
      {
        name: "mayaName",
        label: "Account Holder Name",
        placeholder: "e.g. Juan Dela Cruz",
        icon: User,
      },
      {
        name: "mayaNumber",
        label: "Maya Mobile Number (11 digits)",
        placeholder: "e.g. 09187654321",
        maxLength: 11,
        inputMode: "numeric",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "bank",
    title: "Bank Transfer",
    icon: Landmark,
    fields: [
      {
        name: "bankName",
        label: "Bank Name",
        placeholder: "e.g. BDO, BPI, UnionBank",
        icon: Building2,
      },
      {
        name: "bankAccountNumber",
        label: "Bank Account Number",
        placeholder: "e.g. 123456789012",
        maxLength: 20,
        inputMode: "numeric",
        icon: CreditCard,
      },
    ],
  },
];

export const NOTIFICATION_PREFERENCE_OPTIONS: Array<{
  key: NotificationPreferenceKey;
  title: string;
  description: string;
  icon: typeof Mail;
}> = [
  {
    key: "emailAlerts",
    title: "Email Notifications",
    description:
      "Receive contribution invoices, rotation schedule updates, and payment receipts.",
    icon: Mail,
  },
  {
    key: "smsAlerts",
    title: "SMS Alerts",
    description:
      "Receive instant payout availability notifications and urgent cycle payment reminders.",
    icon: Phone,
  },
  {
    key: "pushAlerts",
    title: "Push Notifications",
    description:
      "Get notifications on your dashboard when it is your rotation payout round.",
    icon: BellRing,
  },
];
