import { api } from "@/shared/lib/axios";
import type { CreateNotificationDTO } from "@siklo/shared-schemas";

export const createNotification = async (data: CreateNotificationDTO) => {
  const response = await api.post("/notifications", data);
  return response.data;
};
