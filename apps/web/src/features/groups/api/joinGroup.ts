import { api } from "@/shared/lib/axios";
import type { JoinGroupBodyDTO } from "@siklo/shared-schemas";

export const joinGroup = async (data: JoinGroupBodyDTO) => {
  const response = await api.post("/groups/memberships", data);
  return response.data;
};
