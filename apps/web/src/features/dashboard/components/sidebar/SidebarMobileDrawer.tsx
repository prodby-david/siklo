import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut } from "lucide-react";
import { SidebarMobileDrawerProps } from "../../types/sidebar.types";
import { SIDEBAR_SECTIONS } from "../../constants/sidebar.constants";
import SidebarBrandHeader from "./SidebarBrandHeader";
import SidebarNavItem from "./SidebarNavItem";
import SidebarUserProfile from "./SidebarUserProfile";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";

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
            className="relative z-10 w-72 max-w-[85vw] h-full bg-card border-r border-neutral-border/80 p-4 flex flex-col justify-between shadow-2xl overflow-y-auto no-scrollbar select-none"
          >
            <div className="flex flex-col min-h-0 flex-1">
              <SidebarBrandHeader
                onNavigate={onClose}
                action={
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer shrink-0"
                    aria-label="Close menu drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                }
              />

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
                          isNotificationOpen={false}
                          onOpenNotifications={() => {
                            onClose();
                            onOpenNotifications();
                          }}
                          onNavigate={onClose}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-border/60 space-y-2 shrink-0">
              <SidebarUserProfile onNavigate={onClose} />
              <div className="space-y-1.5">
                <ThemeToggle variant="segmented" />
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSignOut();
                  }}
                  title="Sign out"
                  className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold text-neutral-subtext transition-all duration-150 border border-neutral-border/60 bg-neutral-table-stripe/40 hover:bg-danger-bg hover:text-danger hover:border-danger-border/60 active:scale-98"
                >
                  <LogOut className="h-3.5 w-3.5 text-neutral-subtext transition-colors group-hover:text-danger group-hover:-translate-x-0.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
