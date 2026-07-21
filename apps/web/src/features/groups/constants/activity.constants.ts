import {
  Banknote,
  AlertTriangle,
  CheckCircle2,
  Wallet,
  ShieldAlert,
  Play,
  XCircle,
  RefreshCw,
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
    iconColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    label: "Payment",
  },
  PAYMENT_OVERDUE: {
    icon: AlertTriangle,
    iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    label: "Payment Overdue",
  },
  PAYMENT_VERIFIED: {
    icon: CheckCircle2,
    iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    label: "Payment Verified",
  },
  PAYOUT_DISBURSED: {
    icon: Wallet,
    iconColor: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    label: "Payout Disbursed",
  },
  PENALTY_APPLIED: {
    icon: ShieldAlert,
    iconColor: "text-red-500 bg-red-500/10 border-red-500/20",
    label: "Penalty Applied",
  },
  CYCLE_STARTED: {
    icon: Play,
    iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    label: "Cycle Started",
  },
  CYCLE_CLOSED: {
    icon: XCircle,
    iconColor: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20",
    label: "Cycle Closed",
  },
  ROTATED: {
    icon: RefreshCw,
    iconColor: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    label: "Rotated",
  },
} as const;

export const ACTIVITY_QUERY_KEY = "group-activities";
