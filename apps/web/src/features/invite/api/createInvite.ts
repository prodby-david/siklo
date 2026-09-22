import { api } from "@/shared/lib/axios";
import type { CreateInviteDTO } from "@siklo/shared-schemas";

export const createInvite = async (data: CreateInviteDTO) => {
  const res = await api.post("/invites", data);
  return res.data;
};
