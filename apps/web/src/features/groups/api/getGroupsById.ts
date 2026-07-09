import { api } from "@/shared/lib/axios";

export async function getGroupById(id: string) {
  const res = await api.get(`/groups/${id}`);
  return res.data;
}
