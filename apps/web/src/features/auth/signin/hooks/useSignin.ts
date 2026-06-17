import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/shared/lib/axios";
import { useForm } from "react-hook-form";
import { SigninFormData, signinSchema } from "../types/signin.type";
import { zodResolver } from "@hookform/resolvers/zod";

const initialData: SigninFormData = {
  email: "",
  password: "",
};

export function useSignin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: initialData,
  });

  const router = useRouter();

  const onSubmit = async (data: SigninFormData) => {
    try {
      await api.post("/auth/signin", data);
      reset();
      toast.success("Login success, redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data.message;

        toast.error(message);
        return;
      }

      toast.error((err as Error).message);
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
  };
}
