import { useQuery } from "@tanstack/react-query";
import type { NotificationDTO } from "@siklo/shared-schemas";
import { fetchNotifications } from "../api/fetchNotifications";
import { useNotificationSocket } from "./useNotificationSocket";

export function useFetchNotifications() {
  useNotificationSocket();

  const { data: rawNotifications = [], isLoading } = useQuery<
    NotificationDTO[]
  >({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const unreadCount = rawNotifications.filter((item) => !item.isRead).length;

  return {
    rawNotifications,
    unreadCount,
    isLoading,
  };
}
