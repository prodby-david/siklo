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
  onNavigate,
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
        onClick={() => {
          onOpenNotifications();
          onNavigate?.();
        }}
        title={item.label}
        className={`w-full group flex items-center rounded-2xl transition-all duration-150 active:scale-98 cursor-pointer ${
          isCollapsed ? "justify-center p-2.5" : "justify-between px-3.5 py-2.5"
        } ${
          isNotificationOpen
            ? "bg-brand-accent/10 text-brand-accent font-bold border border-brand-accent/25 shadow-2xs"
            : "text-neutral-subtext hover:bg-neutral-subtext/10 hover:text-foreground font-medium border border-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <IconComponent
              className={`w-5 h-5 transition-colors ${
                isNotificationOpen
                  ? "text-brand-accent"
                  : "text-neutral-subtext group-hover:text-foreground"
              }`}
            />
            {isCollapsed && (
              <SidebarCollapsedDot unreadCount={unreadCount} />
            )}
          </div>
          {!isCollapsed && (
            <span className="text-xs sm:text-sm">{item.label}</span>
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
      onClick={onNavigate}
      title={item.label}
      className={`w-full group flex items-center rounded-2xl transition-all duration-150 active:scale-98 cursor-pointer ${
        isCollapsed ? "justify-center p-2.5" : "justify-between px-3.5 py-2.5"
      } ${
        isActive
          ? "bg-brand-accent/10 text-brand-accent font-bold border border-brand-accent/25 shadow-2xs"
          : "text-neutral-subtext hover:bg-neutral-subtext/10 hover:text-foreground font-medium border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <IconComponent
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive
              ? "text-brand-accent"
              : "text-neutral-subtext group-hover:text-foreground"
          }`}
        />
        {!isCollapsed && (
          <span className="text-xs sm:text-sm truncate">{item.label}</span>
        )}
      </div>
      {!isCollapsed && item.badge && (
        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 shrink-0">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
