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
        iconBg: "bg-warning-bg text-warning border-warning/20",
      };
    case "PAYOUT":
      return {
        icon: TrendingUp,
        iconBg: "bg-success-bg text-success border-success/20",
      };
    case "ANNOUNCEMENT":
      return {
        icon: Megaphone,
        iconBg: "bg-brand-accent/15 text-brand-accent border-brand-accent/20",
      };
    default:
      return {
        icon: ShieldAlert,
        iconBg: "bg-neutral-subtext/15 text-neutral-subtext border-neutral-border",
      };
  }
}
