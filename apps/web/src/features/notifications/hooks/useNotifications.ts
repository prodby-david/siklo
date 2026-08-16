import { useState } from "react";
import { useFetchNotifications } from "./useFetchNotifications";
import { useMarkNotificationsRead } from "./useMarkNotificationsRead";
import { mapNotificationDtoToItem } from "../utils/notification.mapper";
import type {
  NotificationFilter,
  NotificationItem,
  UseNotificationsReturn,
} from "../types/notification.types";

export function useNotifications(): UseNotificationsReturn {
  const [filter, setFilter] = useState<NotificationFilter>("ALL");
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const { rawNotifications } = useFetchNotifications();
  const { markAsRead, markAllAsRead } = useMarkNotificationsRead();

  const uniqueRawNotifications = Array.from(
    new Map(rawNotifications.map((item) => [item.id, item])).values(),
  );

  const allItems: NotificationItem[] = uniqueRawNotifications
    .filter((dto) => !dismissedIds.includes(dto.id))
    .map(mapNotificationDtoToItem);

  const unreadCount = allItems.filter((item) => !item.isRead).length;

  const filteredNotifications = allItems.filter((item) => {
    if (filter === "UNREAD") return !item.isRead;
    if (filter === "PAYMENT") return item.category === "PAYMENT";
    if (filter === "ANNOUNCEMENT") return item.category === "ANNOUNCEMENT";
    return true;
  });

  const deleteNotification = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  return {
    notifications: filteredNotifications,
    filter,
    setFilter,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
