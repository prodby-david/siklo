import React from "react";
import { SidebarCollapsedDotProps } from "../../types/sidebar.types";

export default function SidebarCollapsedDot({
  unreadCount,
}: SidebarCollapsedDotProps) {
  if (unreadCount <= 0) return null;

  return (
    <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse border border-background" />
  );
}
