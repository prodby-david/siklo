import { api } from "@/shared/lib/axios";

export const getUserNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};
