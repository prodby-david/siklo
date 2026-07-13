import { api } from "@/shared/lib/axios";

export interface GroupPreviewResponse {
  id: string;
  name: string;
  maxMembers: number;
  payoutSequence: "RANDOM" | "MANUAL" | "FREECHOOSING";
  memberships: {
    position: number;
  }[];
}

export const getGroupInvitePreview = async (
  inviteCode: string,
): Promise<GroupPreviewResponse> => {
  const response = await api.get(`/groups/invite/${inviteCode}`);
  return response.data;
};
