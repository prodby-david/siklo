import { api } from "@/shared/lib/axios";

export async function selectSlot(groupId: string, position: number) {
  const { data } = await api.patch(`/groups/${groupId}/members/me/slot`, {
    position,
  });
  return data;
}
