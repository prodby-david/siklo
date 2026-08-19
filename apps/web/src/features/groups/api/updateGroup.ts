import { api } from "@/shared/lib/axios";
import { UpdateGroupDTO } from "@siklo/shared-schemas";

export async function updateGroup(groupId: string, data: UpdateGroupDTO) {
  const response = await api.patch(`/groups/${groupId}`, data);
  return response.data;
}
