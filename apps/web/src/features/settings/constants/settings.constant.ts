import { User, Lock, Bell, Wallet } from "lucide-react";
import { SettingsTab } from "../types/settings.type";

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
];
