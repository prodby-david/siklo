import { api } from "@/shared/lib/axios";

export const getGroups = async (status?: string) => {
  const res = await api.get("/groups/my-groups", {
    params: status ? { status } : undefined,
  });
  return res.data;
};

export const getGroupById = async (id: string) => {
  const res = await api.get(`/groups/${id}`);
  return res.data;
};
