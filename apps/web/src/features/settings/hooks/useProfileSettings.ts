"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userProfileSettingSchema,
  type UserProfileSettingDTO,
} from "@siklo/shared-schemas";
import { updateProfileSettings } from "../api/userProfileSettings";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";

export default function useProfileSettings() {
  const { data: user } = useGetCurrentName();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileSettingDTO>({
    resolver: zodResolver(userProfileSettingSchema),
    values: {
      name: user?.name || "",
      email: user?.email || "",
      contactNumber: user?.contactNumber || "",
    },
  });

  const [isAbleToEdit, setIsAbleToEdit] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleEdit = () => {
    setIsAbleToEdit((prev) => !prev);
    setShowSaveButton((prev) => !prev);
  };

  const handleCancel = () => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
      contactNumber: user?.contactNumber || "",
    });
    setIsAbleToEdit(false);
    setShowSaveButton(false);
  };

  const onSubmit = async (data: UserProfileSettingDTO) => {
    try {
      await updateProfileSettings(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.message || "Failed to update profile";
        toast.error(message);
        return;
      }

      toast.error((error as Error).message);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isSubmitting,
    isAbleToEdit,
    handleEdit,
    showSaveButton,
    handleCancel,
  };
}
