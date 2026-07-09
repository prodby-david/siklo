import { api } from "@/shared/lib/axios";
import type { JoinGroupBodyDTO } from "@siklo/shared-schemas";

export const joinGroup = async (data: JoinGroupBodyDTO) => {
  const response = await api.post("/groups/join", data);
  return response.data;
};
