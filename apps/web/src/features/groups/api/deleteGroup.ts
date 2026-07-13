import { api } from "@/shared/lib/axios";

export const deleteGroup = async (groupId: string) => {
  const response = await api.delete(`/groups/${groupId}`);
  return response.data;
};
