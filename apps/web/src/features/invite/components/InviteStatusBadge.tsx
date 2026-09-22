import { INVITE_STATUS_CONFIG } from "../constants/invite.constants";
import type { InviteStatusBadgeProps } from "../types/invite.types";

export default function InviteStatusBadge({
  status,
  className = "",
}: InviteStatusBadgeProps) {
  const config = INVITE_STATUS_CONFIG[status] || INVITE_STATUS_CONFIG.PENDING;
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-2xs ${config.badgeClass} ${className}`}
    >
      <IconComponent className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
}
