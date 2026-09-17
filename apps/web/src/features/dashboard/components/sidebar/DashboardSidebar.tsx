"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useSignOut } from "@/features/auth/signout/hooks/useSignOut";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import { useSidebarContext } from "./SidebarContext";
import NotificationSheet from "@/features/notifications/components/NotificationSheet";
import { useFetchNotifications } from "@/features/notifications/hooks/useFetchNotifications";
import { SIDEBAR_SECTIONS } from "../../constants/sidebar.constants";
import SidebarBrandHeader from "./SidebarBrandHeader";
import SidebarNavItem from "./SidebarNavItem";
import SidebarUserProfile from "./SidebarUserProfile";
import SidebarMobileDrawer from "./SidebarMobileDrawer";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { mutateAsync: signOut } = useSignOut();
  const { unreadCount } = useFetchNotifications();
  const { isCollapsed, collapseSidebar } = useSidebarContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex flex-col justify-between p-3 border-r border-neutral-border/80 h-screen fixed inset-y-0 left-0 top-0 shrink-0 bg-card text-foreground z-30 select-none w-60">
        <div className="flex flex-col min-h-0 flex-1">
          <SidebarBrandHeader />

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-5 pr-0.5">
            {SIDEBAR_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1">
                <p className="px-3 text-[10px] font-black uppercase tracking-wider text-neutral-subtext/70">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => (
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
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-border/60 space-y-2 shrink-0">
          <ThemeToggle variant="segmented" />

          <div className="space-y-1.5">
            <SidebarUserProfile />
            <button
              type="button"
              onClick={() => signOut()}
              title="Sign out"
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold text-neutral-subtext transition-all duration-150 border border-neutral-border/60 bg-neutral-table-stripe/40 hover:bg-danger-bg hover:text-danger hover:border-danger-border/60 active:scale-98"
            >
              <LogOut className="h-3.5 w-3.5 text-neutral-subtext transition-colors group-hover:text-danger group-hover:-translate-x-0.5" />
              <span>Sign out</span>
            </button>
          </div>
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
