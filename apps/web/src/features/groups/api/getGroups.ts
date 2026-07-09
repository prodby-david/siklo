import { api } from "@/shared/lib/axios";

export const getGroups = async () => {
  const res = await api.get("/groups/my-groups");
  return res.data;
};

export const getGroupById = async (id: string) => {
  const res = await api.get(`/groups/${id}`);
  return res.data;
};
