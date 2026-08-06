import React from "react";
import { SidebarUnreadBadgeProps } from "../../types/sidebar.types";

export default function SidebarUnreadBadge({
  unreadCount,
  isNotificationOpen,
}: SidebarUnreadBadgeProps) {
  if (unreadCount <= 0) return null;

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
        isNotificationOpen
          ? "bg-white text-brand-accent"
          : "bg-brand-accent text-white"
      }`}
    >
      {unreadCount}
    </span>
  );
}
