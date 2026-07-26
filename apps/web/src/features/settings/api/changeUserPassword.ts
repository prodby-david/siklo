import { api } from "@/shared/lib/axios";
import type { ChangePasswordDTO } from "@siklo/shared-schemas";

export const changeUserPassword = async (data: ChangePasswordDTO) => {
  const response = await api.put("/users/change-password", data);
  return response.data;
};
