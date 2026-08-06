"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Bell } from "lucide-react";
import { useSidebarContext } from "./SidebarContext";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import NotificationSheet from "@/features/notifications/components/NotificationSheet";

export default function DashboardMobileHeader() {
  const { expandSidebar } = useSidebarContext();
  const { unreadCount } = useNotifications();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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

          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              width={38}
              height={38}
              alt="Logo"
              priority
            />
            <span className="font-extrabold text-base text-foreground tracking-tight">
              Siklo
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsNotificationOpen(true)}
          className="relative w-9 h-9 rounded-xl border border-neutral-border/80 flex items-center justify-center text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
          aria-label="Open notifications"
        >
          <Bell className="w-5 h-5 text-neutral-subtext" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse border border-background" />
          )}
        </button>
      </header>

      <NotificationSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
