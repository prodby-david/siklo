import { useMutation } from "@tanstack/react-query";
import { type ChangePasswordDTO } from "@siklo/shared-schemas";
import { changeUserPassword } from "../../settings/api/changeUserPassword";

export default function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordDTO) => changeUserPassword(data),
  });
}
