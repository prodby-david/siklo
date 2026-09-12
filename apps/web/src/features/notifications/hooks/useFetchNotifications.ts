import { useQuery } from "@tanstack/react-query";
import type { NotificationDTO } from "@siklo/shared-schemas";
import { fetchNotifications } from "../api/fetchNotifications";

export function useFetchNotifications() {
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
