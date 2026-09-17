import { api } from "@/shared/lib/axios";

export async function markNotificationReadApi(
  notificationId: string,
): Promise<void> {
  await api.patch(`/notifications/${notificationId}/read-status`);
}

export async function markAllNotificationsReadApi(): Promise<void> {
  await api.patch("/notifications/read-status");
}
