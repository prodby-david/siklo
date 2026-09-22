import { api } from "@/shared/lib/axios";

export async function acceptInvite(inviteId: string) {
  const response = await api.patch(`/invites/${inviteId}/accept`);
  return response.data;
}
