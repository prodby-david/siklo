import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import type { InviteStatus } from "../types/invite.types";

export const INVITE_STATUS_CONFIG: Record<
  InviteStatus,
  {
    label: string;
    icon: typeof Clock;
    badgeClass: string;
  }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    badgeClass: "border-warning/30 bg-warning-bg text-warning",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    badgeClass: "border-success/30 bg-success-bg text-success",
  },
  DECLINED: {
    label: "Declined",
    icon: XCircle,
    badgeClass: "border-danger-border bg-danger-bg text-danger",
  },
  EXPIRED: {
    label: "Expired",
    icon: AlertCircle,
    badgeClass: "border-neutral-border bg-neutral-table-stripe text-neutral-subtext",
  },
};
