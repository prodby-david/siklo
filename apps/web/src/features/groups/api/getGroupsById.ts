import { api } from "@/shared/lib/axios";

export async function getGroupById(id: string) {
  if (!id || id === "undefined") {
    throw new Error("Group ID is required");
  }
  const res = await api.get(`/groups/${id}`);
  return res.data;
}
