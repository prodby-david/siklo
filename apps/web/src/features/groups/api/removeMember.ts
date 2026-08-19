import { api } from "@/shared/lib/axios";

export async function removeMember(groupId: string, memberUserId: string) {
  const res = await api.delete(`/groups/${groupId}/members/${memberUserId}`);
  return res.data;
}
