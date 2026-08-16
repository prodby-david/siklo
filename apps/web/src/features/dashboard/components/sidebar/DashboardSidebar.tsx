"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
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

        <div className="space-y-2 w-full">
          <div className="flex items-center w-full">
            <ThemeToggle showLabel />
          </div>
          <Button
            variant="outline"
            onClick={() => signOut()}
            title="Sign out"
            className="w-full cursor-pointer hover:text-danger hover:bg-danger-bg hover:border-danger-border rounded-2xl border border-neutral-border transition-all duration-200 flex items-center justify-center gap-2.5 px-3 py-2.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-medium">Sign out</span>
          </Button>
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
