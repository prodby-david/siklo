import { User, Lock, Bell, CreditCard } from "lucide-react";
import { SettingsTab } from "../types/settings.types";

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
