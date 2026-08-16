import { api } from "@/shared/lib/axios";

export async function markMemberRejected(
  groupId: string,
  memberUserId: string,
  reason?: string,
  cycleNumber?: number,
  rejectionProofUrl?: string,
) {
  const response = await api.post("/payments/mark-rejected", {
    groupId,
    memberUserId,
    reason,
    cycleNumber,
    rejectionProofUrl,
  });
  return response.data;
}
