import { CreditCard, TrendingUp, Megaphone, ShieldAlert, LucideIcon } from "lucide-react";
import { NotificationCategory } from "../types/notification.types";

export interface CategoryConfig {
  icon: LucideIcon;
  iconBg: string;
}

export function getCategoryConfig(category: NotificationCategory): CategoryConfig {
  switch (category) {
    case "PAYMENT":
      return {
        icon: CreditCard,
        iconBg: "bg-amber-500/15 text-amber-500 border-amber-500/20",
      };
    case "PAYOUT":
      return {
        icon: TrendingUp,
        iconBg: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
      };
    case "ANNOUNCEMENT":
      return {
        icon: Megaphone,
        iconBg: "bg-indigo-500/15 text-indigo-500 border-indigo-500/20",
      };
    default:
      return {
        icon: ShieldAlert,
        iconBg: "bg-neutral-subtext/15 text-neutral-subtext border-neutral-border",
      };
  }
}
