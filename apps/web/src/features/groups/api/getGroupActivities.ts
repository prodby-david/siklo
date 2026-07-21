import { api } from "@/shared/lib/axios";

export async function getGroupActivities(groupId: string) {
  const res = await api.get(`/activity/${groupId}`);
  return res.data;
}
