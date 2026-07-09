import { api } from "@/shared/lib/axios";

export const startGroupCycle = async (groupId: string) => {
  const res = await api.post(`/groups/${groupId}/start`);
  return res.data;
};
