"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/shared/lib/axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: SigninFormData) => {
    try {
      await api.post("/auth/signin", data);
      reset();
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      setIsRedirecting(false);
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
    isRedirecting,
    isSubmitting,
    showPassword,
    setShowPassword,
    handleSubmit: handleSubmit(onSubmit),
  };
}
