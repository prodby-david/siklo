import React from "react";
import Link from "next/link";
import { SidebarNavItemProps } from "../../types/sidebar.types";
import SidebarUnreadBadge from "./SidebarUnreadBadge";
import SidebarCollapsedDot from "./SidebarCollapsedDot";

export default function SidebarNavItem({
  item,
  pathname,
  isCollapsed,
  unreadCount,
  isNotificationOpen,
  onOpenNotifications,
}: SidebarNavItemProps) {
  const IconComponent = item.icon;
  const isNotification = item.id === "notification";
  const isActive =
    !isNotification &&
    (pathname === `/${item.id}` ||
      pathname.startsWith(`/${item.id}/`) ||
      (item.id === "dashboard" && pathname === "/"));

  if (isNotification) {
    return (
      <button
        type="button"
        onClick={onOpenNotifications}
        title={item.label}
        className={`w-full flex items-center rounded-2xl font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
          isCollapsed ? "justify-center p-2.5" : "justify-between px-3.5 py-2.5"
        } ${
          isNotificationOpen
            ? "bg-brand-accent text-white shadow-sm"
            : "text-neutral-subtext hover:bg-neutral-subtext/5 hover:text-foreground"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <IconComponent
              className={`w-5 h-5 ${
                isNotificationOpen ? "text-white" : "text-neutral-subtext"
              }`}
            />
            {isCollapsed && (
              <SidebarCollapsedDot unreadCount={unreadCount} />
            )}
          </div>
          {!isCollapsed && (
            <span className="text-sm font-medium">{item.label}</span>
          )}
        </div>
        {!isCollapsed && (
          <SidebarUnreadBadge
            unreadCount={unreadCount}
            isNotificationOpen={isNotificationOpen}
          />
        )}
      </button>
    );
  }

  return (
    <Link
      href={`/${item.id}`}
      title={item.label}
      className={`w-full flex items-center rounded-2xl font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
        isCollapsed ? "justify-center p-2.5" : "gap-3 px-3.5 py-2.5"
      } ${
        isActive
          ? "bg-brand-accent text-white shadow-sm"
          : "text-neutral-subtext hover:bg-neutral-subtext/5 hover:text-foreground"
      }`}
    >
      <IconComponent
        className={`w-5 h-5 ${
          isActive ? "text-white" : "text-neutral-subtext"
        }`}
      />
      {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
    </Link>
  );
}
