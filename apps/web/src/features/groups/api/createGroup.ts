import { api } from "@/shared/lib/axios";
import { CreateGroupData } from "../validator/create-group.validator";

export const createGroup = async (data: CreateGroupData) => {
  const res = await api.post("/groups/create", data);
  return res.data;
};
