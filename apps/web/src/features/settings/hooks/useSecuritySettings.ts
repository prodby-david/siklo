import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordDTO,
} from "@siklo/shared-schemas";
import { toast } from "sonner";
import { changeUserPassword } from "../api/changeUserPassword";
import axios from "axios";

export default function useSecuritySettings() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordDTO>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordDTO) => {
    try {
      await changeUserPassword(data);
      toast.success("Password changed successfully");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.message || "Change password failed";

        toast.error(message);
        return;
      }

      toast.error((error as Error).message);
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
  };
}
