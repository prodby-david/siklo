import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { SidebarMobileDrawerProps } from "../../types/sidebar.types";
import { NAV_ITEMS } from "../../constants/sidebar.constants";
import SidebarUnreadBadge from "./SidebarUnreadBadge";

export default function SidebarMobileDrawer({
  isOpen,
  pathname,
  unreadCount,
  onClose,
  onOpenNotifications,
  onSignOut,
}: SidebarMobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
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
                <Image
                  src="/images/logo.svg"
                  width={65}
                  height={65}
                  alt="Logo"
                  priority
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
                  aria-label="Close menu drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {NAV_ITEMS.map((item) => {
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
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenNotifications();
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-medium text-neutral-subtext hover:bg-neutral-subtext/5 hover:text-foreground transition-all duration-150 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-neutral-subtext" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <SidebarUnreadBadge
                          unreadCount={unreadCount}
                          isNotificationOpen={false}
                        />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={`/${item.id}`}
                      onClick={onClose}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-150 ${
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
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <Button
              variant="outline"
              onClick={onSignOut}
              className="w-full flex items-center gap-2 cursor-pointer hover:text-danger hover:bg-danger-bg hover:border-danger-border rounded-2xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs font-medium">Sign out</span>
            </Button>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
