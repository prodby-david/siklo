import { api } from "@/shared/lib/axios";

export const getCurrentUserName = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
