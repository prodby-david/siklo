import { api } from "@/shared/lib/axios";

export async function declineInvite(inviteId: string) {
  const response = await api.patch(`/invites/${inviteId}/decline`);
  return response.data;
}
