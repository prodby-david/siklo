"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../hooks/useNotifications";
import NotificationHeader from "./NotificationHeader";
import NotificationItemCard from "./NotificationItemCard";
import NotificationEmptyState from "./NotificationEmptyState";
import NotificationLoadMore from "./NotificationLoadMore";

interface NotificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSheet({ isOpen, onClose }: NotificationSheetProps) {
  const {
    notifications,
    filter,
    setFilter,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [isExpanded, setIsExpanded] = useState(false);

  const visibleNotifications = isExpanded ? notifications : notifications.slice(0, 4);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative z-10 w-full sm:w-[440px] h-full bg-background border-l border-neutral-border shadow-2xl flex flex-col overflow-hidden"
          >
            <NotificationHeader
              unreadCount={unreadCount}
              filter={filter}
              setFilter={setFilter}
              onMarkAllAsRead={markAllAsRead}
              onClose={onClose}
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-5 space-y-3">
              {notifications.length === 0 ? (
                <NotificationEmptyState filter={filter} />
              ) : (
                <>
                  {visibleNotifications.map((item) => (
                    <NotificationItemCard
                      key={item.id}
                      item={item}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                      onCloseDrawer={onClose}
                    />
                  ))}

                  <NotificationLoadMore
                    totalCount={notifications.length}
                    visibleCount={visibleNotifications.length}
                    isExpanded={isExpanded}
                    onToggleExpand={() => setIsExpanded((prev) => !prev)}
                  />
                </>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
