"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useSignOut } from "@/features/auth/signout/hooks/useSignOut";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import { useSidebarContext } from "./SidebarContext";
import NotificationSheet from "@/features/notifications/components/NotificationSheet";
import { useFetchNotifications } from "@/features/notifications/hooks/useFetchNotifications";
import { NAV_ITEMS } from "../../constants/sidebar.constants";
import SidebarNavItem from "./SidebarNavItem";
import SidebarMobileDrawer from "./SidebarMobileDrawer";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { mutateAsync: signOut } = useSignOut();
  const { unreadCount } = useFetchNotifications();
  const { isCollapsed, collapseSidebar } = useSidebarContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex flex-col p-3 border-r border-neutral-border h-screen fixed inset-y-0 left-0 top-0 shrink-0 bg-background text-foreground z-30 select-none w-60">
        <div className="flex items-center justify-center mb-6 px-1 h-14">
          <Link href="/dashboard" className="flex items-center justify-center">
            <Image
              src="/images/logo.svg"
              width={64}
              height={64}
              alt="Logo"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              pathname={pathname}
              isCollapsed={false}
              unreadCount={unreadCount}
              isNotificationOpen={isNotificationOpen}
              onOpenNotifications={() => setIsNotificationOpen(true)}
            />
          ))}
        </nav>

        <div className="pt-3 border-t border-neutral-border/60 space-y-1 w-full">
          <ThemeToggle showLabel />
          <button
            type="button"
            onClick={() => signOut()}
            title="Sign out"
            className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-neutral-subtext transition-all duration-150 hover:bg-danger-bg hover:text-danger active:scale-95"
          >
            <LogOut className="h-5 w-5 text-neutral-subtext transition-colors group-hover:text-danger" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <SidebarMobileDrawer
        isOpen={!isCollapsed}
        pathname={pathname}
        unreadCount={unreadCount}
        onClose={collapseSidebar}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onSignOut={() => signOut()}
      />

      <NotificationSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
