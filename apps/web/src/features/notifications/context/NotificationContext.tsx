"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { NotificationItem, NotificationFilter, UseNotificationsReturn } from "../types/notification.types";
import { INITIAL_NOTIFICATIONS } from "../constants/notification.constants";

const NotificationContext = createContext<UseNotificationsReturn | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<NotificationFilter>("ALL");

  const unreadCount = useMemo(() => {
    return items.filter((n) => !n.isRead).length;
  }, [items]);

  const filteredNotifications = useMemo(() => {
    return items.filter((item) => {
      if (filter === "UNREAD") return !item.isRead;
      if (filter === "PAYMENT") return item.category === "PAYMENT" || item.category === "PAYOUT";
      if (filter === "ANNOUNCEMENT") return item.category === "ANNOUNCEMENT";
      return true;
    });
  }, [items, filter]);

  const markAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const markAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: filteredNotifications,
        filter,
        setFilter,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext(): UseNotificationsReturn {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
}
