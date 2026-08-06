"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSignOut } from "@/features/auth/signout/hooks/useSignOut";
import { useSidebarContext } from "./SidebarContext";
import NotificationSheet from "@/features/notifications/components/NotificationSheet";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { NAV_ITEMS } from "../../constants/sidebar.constants";
import SidebarNavItem from "./SidebarNavItem";
import SidebarMobileDrawer from "./SidebarMobileDrawer";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { mutateAsync: signOut } = useSignOut();
  const { unreadCount } = useNotifications();
  const { isCollapsed, toggleCollapse, collapseSidebar } = useSidebarContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    collapseSidebar();
  }, [pathname]);

  return (
    <>
      <aside
        className={`hidden md:flex flex-col p-3 border-r border-neutral-border h-screen fixed inset-y-0 left-0 top-0 shrink-0 bg-background text-foreground z-30 transition-all duration-300 select-none ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="flex items-center justify-center mb-6 px-1 h-14">
          <Link href="/dashboard" className="flex items-center justify-center">
            <Image
              src="/images/logo.svg"
              width={isCollapsed ? 44 : 64}
              height={isCollapsed ? 44 : 64}
              alt="Logo"
              priority
              className="transition-all duration-300"
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleCollapse}
          className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-brand-accent text-white border-2 border-background flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer z-40"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              pathname={pathname}
              isCollapsed={isCollapsed}
              unreadCount={unreadCount}
              isNotificationOpen={isNotificationOpen}
              onOpenNotifications={() => setIsNotificationOpen(true)}
            />
          ))}
        </nav>

        <Button
          variant="outline"
          onClick={() => signOut()}
          title="Sign out"
          className={`cursor-pointer hover:text-danger hover:bg-danger-bg hover:border-danger-border rounded-2xl transition-all duration-200 ${
            isCollapsed
              ? "p-2.5 flex items-center justify-center"
              : "flex items-center gap-2"
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-xs font-medium">Sign out</span>}
        </Button>
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
