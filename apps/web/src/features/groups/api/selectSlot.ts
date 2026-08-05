import { api } from "@/shared/lib/axios";

export async function selectSlot(groupId: string, position: number) {
  const { data } = await api.post(`/groups/${groupId}/select-slot`, {
    position,
  });
  return data;
}
