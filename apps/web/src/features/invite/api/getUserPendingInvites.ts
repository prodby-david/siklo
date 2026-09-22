import { api } from "@/shared/lib/axios";

export async function getUserPendingInvites() {
  const response = await api.get("/invites");
  return response.data;
}
