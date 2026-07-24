"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/shared/lib/axios";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../types/forgotPassword.type";

const initialData: ForgotPasswordFormData = {
  email: "",
};

export function useForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await api.post("/auth/forgot-password", data);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setSubmittedEmail(data.email);
          setIsSubmitted(true);
          toast.success("Password reset instructions sent!");
          return;
        }
        const message = err.response?.data?.message || "Failed to send reset link";
        toast.error(message);
        return;
      }
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent!");
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedEmail("");
    reset();
  };

  return {
    register,
    errors,
    isSubmitting,
    isSubmitted,
    submittedEmail,
    handleResetForm,
    handleSubmit: handleSubmit(onSubmit),
  };
}

export default useForgotPassword;
