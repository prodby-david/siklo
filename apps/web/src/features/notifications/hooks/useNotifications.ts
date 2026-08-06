"use client";

import { useNotificationContext } from "../context/NotificationContext";
import { UseNotificationsReturn } from "../types/notification.types";

export function useNotifications(): UseNotificationsReturn {
  return useNotificationContext();
}
