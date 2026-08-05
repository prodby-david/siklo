import { api } from "@/shared/lib/axios";

export async function markMemberPaid(
  groupId: string,
  memberUserId: string,
  cycleNumber?: number
) {
  const { data } = await api.post(`/groups/${groupId}/mark-paid`, {
    memberUserId,
    cycleNumber,
  });
  return data;
}
