"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Bell } from "lucide-react";
import { useSidebarContext } from "./SidebarContext";
import { useFetchNotifications } from "@/features/notifications/hooks/useFetchNotifications";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import NotificationSheet from "@/features/notifications/components/NotificationSheet";

export default function DashboardMobileHeader() {
  const { expandSidebar } = useSidebarContext();
  const { unreadCount } = useFetchNotifications();
  const { data: user } = useGetCurrentName();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const displayName = user?.name || "Member";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <>
      <header className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-background border-b border-neutral-border shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={expandSidebar}
            className="w-9 h-9 rounded-xl border border-neutral-border/80 flex items-center justify-center text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsNotificationOpen(true)}
            className="relative w-9 h-9 rounded-xl border border-neutral-border/80 flex items-center justify-center text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
            aria-label="Open notifications"
          >
            <Bell className="w-5 h-5 text-neutral-subtext" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-accent border border-background" />
            )}
          </button>

          <Link
            href="/settings"
            className="w-9 h-9 rounded-xl overflow-hidden bg-brand-accent/15 text-brand-accent font-extrabold text-xs border border-brand-accent/25 flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Profile settings"
          >
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={displayName}
                width={36}
                height={36}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              initials
            )}
          </Link>
        </div>
      </header>

      <NotificationSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
