import { api } from "@/shared/lib/axios";

export async function markMemberPaid(
  groupId: string,
  memberUserId: string,
  cycleNumber?: number,
  referenceNumber?: string,
  proofUrl?: string,
) {
  const response = await api.post("/payments/manual", {
    groupId,
    memberUserId,
    cycleNumber,
    referenceNumber,
    proofUrl,
  });
  return response.data;
}

