"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Mail,
  Bell,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSignOut } from "@/features/auth/signout/hooks/useSignOut";
import { useSidebarContext } from "./SidebarContext";
import NotificationSheet from "@/features/notifications/components/NotificationSheet";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

export default function Sidebar() {
  const pathname = usePathname();
  const { mutateAsync: signOut } = useSignOut();
  const { unreadCount } = useNotifications();
  const { isCollapsed, toggleCollapse, collapseSidebar } = useSidebarContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    collapseSidebar();
  }, [pathname]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "group", label: "Groups", icon: Users },
    { id: "invites", label: "Invites & Requests", icon: Mail },
    { id: "notification", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

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
          {navItems.map((item) => {
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
                  key={item.id}
                  onClick={() => setIsNotificationOpen(true)}
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
                      {isCollapsed && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse border border-background" />
                      )}
                    </div>
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                  {!isCollapsed && unreadCount > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isNotificationOpen
                          ? "bg-white text-brand-accent"
                          : "bg-brand-accent text-white"
                      }`}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
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
                  className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-subtext"}`}
                />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <Button
          variant="outline"
          onClick={() => signOut()}
          title="Sign out"
          className={`cursor-pointer hover:text-danger hover:bg-danger-bg hover:border-danger-border rounded-2xl transition-all duration-200 ${
            isCollapsed ? "p-2.5 flex items-center justify-center" : "flex items-center gap-2"
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-xs font-medium">Sign out</span>}
        </Button>
      </aside>

      <AnimatePresence>
        {!isCollapsed && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={collapseSidebar}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative z-10 w-72 max-w-[85vw] h-full bg-background border-r border-neutral-border p-5 flex flex-col justify-between shadow-2xl overflow-y-auto no-scrollbar"
            >
              <div>
                <div className="flex items-center justify-between mb-6 px-1">
                  <Image src="/images/logo.svg" width={65} height={65} alt="Logo" priority />
                  <button
                    onClick={collapseSidebar}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
                    aria-label="Close menu drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
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
                          key={item.id}
                          onClick={() => {
                            collapseSidebar();
                            setIsNotificationOpen(true);
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-medium text-neutral-subtext hover:bg-neutral-subtext/5 hover:text-foreground transition-all duration-150 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-neutral-subtext" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-accent text-white">
                              {unreadCount}
                            </span>
                          )}
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        onClick={collapseSidebar}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-150 ${
                          isActive
                            ? "bg-brand-accent text-white shadow-sm"
                            : "text-neutral-subtext hover:bg-neutral-subtext/5 hover:text-foreground"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-subtext"}`}
                        />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <Button
                variant="outline"
                onClick={() => signOut()}
                className="mt-6 w-full cursor-pointer hover:text-danger hover:bg-danger-bg hover:border-danger-border rounded-2xl"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-xs font-medium">Sign out</span>
              </Button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <NotificationSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
