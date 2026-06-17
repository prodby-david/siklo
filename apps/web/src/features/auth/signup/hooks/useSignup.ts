"use client";

import axios from "axios";
import { SignupFormData, signupSchema } from "../types/signup.type";
import { api } from "@/shared/lib/axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function useSignup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    const { confirmPassword, ...updatedData } = data;

    try {
      await api.post("/users", updatedData);
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: "",
      });
      toast.success("Signup success, redirecting to signin...");
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data.message || "Signup failed";

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
