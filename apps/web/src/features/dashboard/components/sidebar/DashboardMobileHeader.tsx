"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Bell } from "lucide-react";
import { useSidebarContext } from "./SidebarContext";
import NotificationSheet from "@/features/notifications/components/NotificationSheet";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

export default function DashboardMobileHeader() {
  const { toggleCollapse } = useSidebarContext();
  const { unreadCount } = useNotifications();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <header className="flex md:hidden items-center justify-between px-4 py-2.5 bg-background border-b border-neutral-border sticky top-0 z-30 shadow-xs">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/images/logo.svg" width={52} height={52} alt="Siklo Logo" priority />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative w-9 h-9 rounded-2xl border border-neutral-border/80 bg-background flex items-center justify-center text-neutral-subtext hover:text-foreground transition-colors cursor-pointer shadow-xs active:scale-95"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-accent text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleCollapse}
            className="w-9 h-9 rounded-2xl border border-neutral-border/80 bg-background flex items-center justify-center text-neutral-subtext hover:text-foreground transition-colors cursor-pointer shadow-xs active:scale-95"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-brand-accent" />
          </button>
        </div>
      </header>

      <NotificationSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
