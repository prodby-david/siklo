import { api } from "@/shared/lib/axios";
import type { NotificationDTO } from "@siklo/shared-schemas";

export async function fetchNotifications(): Promise<NotificationDTO[]> {
  const response = await api.get("/notifications");
  return response.data;
}
