import { api } from "@/shared/lib/axios";
import type { UserProfileSettingDTO } from "@siklo/shared-schemas";

export async function updateProfileSettings(data: UserProfileSettingDTO) {
  return api.patch("/users/profile/settings", data);
}
