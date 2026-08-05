import { api } from "@/shared/lib/axios";

export async function sendAnnouncement(groupId: string, message: string) {
  const { data } = await api.post(`/groups/${groupId}/announcement`, {
    message,
  });
  return data;
}
