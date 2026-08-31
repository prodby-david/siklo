import { api } from "@/shared/lib/axios";

export async function getGroupActivities(groupId: string) {
  const res = await api.get(`/activities/group/${groupId}`);
  return res.data;
}
