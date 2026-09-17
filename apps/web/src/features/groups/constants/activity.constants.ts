import {
  Banknote,
  AlertTriangle,
  CheckCircle2,
  Wallet,
  ShieldAlert,
  Play,
  XCircle,
  RefreshCw,
  Megaphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ActivityConfig {
  icon: LucideIcon;
  iconColor: string;
  label: string;
}

export const ACTIVITY_TYPE_CONFIG: Record<string, ActivityConfig> = {
  PAYMENT: {
    icon: Banknote,
    iconColor: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
    label: "Payment",
  },
  PAYMENT_OVERDUE: {
    icon: AlertTriangle,
    iconColor: "text-warning bg-warning-bg border-warning/20",
    label: "Payment Overdue",
  },
  PAYMENT_VERIFIED: {
    icon: CheckCircle2,
    iconColor: "text-success bg-success-bg border-success/20",
    label: "Payment Verified",
  },
  PAYOUT_DISBURSED: {
    icon: Wallet,
    iconColor: "text-winner-payout bg-winner-payout-bg border-winner-payout/20",
    label: "Payout Disbursed",
  },
  PAYOUT_RECEIVED: {
    icon: CheckCircle2,
    iconColor: "text-success bg-success-bg border-success/20",
    label: "Payout Received",
  },
  PENALTY_APPLIED: {
    icon: ShieldAlert,
    iconColor: "text-danger bg-danger-bg border-danger/20",
    label: "Penalty Applied",
  },
  CYCLE_STARTED: {
    icon: Play,
    iconColor: "text-success bg-success-bg border-success/20",
    label: "Cycle Started",
  },
  CYCLE_CLOSED: {
    icon: XCircle,
    iconColor: "text-neutral-subtext bg-neutral-subtext/10 border-neutral-border",
    label: "Cycle Closed",
  },
  ROTATED: {
    icon: RefreshCw,
    iconColor: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
    label: "Rotated",
  },
  ANNOUNCEMENT: {
    icon: Megaphone,
    iconColor: "text-brand-accent bg-brand-accent/10 border-brand-accent/30",
    label: "Organizer Announcement",
  },
} as const;

export const ACTIVITY_QUERY_KEY = "group-activities";
