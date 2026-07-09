import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type JoinGroupBodyDTO,
  joinGroupBodySchema,
} from "@siklo/shared-schemas";
import { useState } from "react";
import useJoinGroup from "./useJoinGroup";
import { toast } from "sonner";
import axios from "axios";

export default function useInviteCode() {
  const joinGroup = useJoinGroup();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinGroupBodyDTO>({
    resolver: zodResolver(joinGroupBodySchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const onSubmit = async (data: JoinGroupBodyDTO) => {
    try {
      await joinGroup.mutateAsync(data);
      toast.success("Group joined successfully");
      reset();
      setShowModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    showModal,
    setShowModal,
    reset,
    handleShowModal,
  };
}
