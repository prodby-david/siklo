import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordDTO,
} from "@siklo/shared-schemas";
import { toast } from "sonner";
import { changeUserPassword } from "../api/changeUserPassword";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function useSecuritySettings() {
  const router = useRouter();
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
      toast.success("Password changed successfully. Please sign in again.");
      reset();
      router.replace("/signin");
    } catch (error: unknown) {
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
