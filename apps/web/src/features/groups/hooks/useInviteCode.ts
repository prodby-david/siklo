import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type JoinGroupBodyDTO,
  joinGroupBodySchema,
} from "@siklo/shared-schemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useJoinGroup from "./useJoinGroup";
import type { GroupPreviewResponse } from "../api/getGroupInvitePreview";
import { toast } from "sonner";
import axios from "axios";

export default function useInviteCode() {
  const router = useRouter();
  const joinGroup = useJoinGroup();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JoinGroupBodyDTO>({
    resolver: zodResolver(joinGroupBodySchema) as Resolver<JoinGroupBodyDTO>,
    defaultValues: {
      inviteCode: "",
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"code" | "slots">("code");
  const [preview, setPreview] = useState<GroupPreviewResponse | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const inviteCodeValue = watch("inviteCode");

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
    if (showModal) {
      handleReset();
    }
  };

  const handleReset = () => {
    reset();
    setStep("code");
    setPreview(null);
    setSelectedSlot(null);
  };

  const handleJoin = async (code: string, slot?: number) => {
    try {
      const res = await joinGroup.mutateAsync({
        inviteCode: code,
        position: slot,
      });
      toast.success("Group joined successfully");
      if (res?.groupId) {
        router.push(`/group/${res.groupId}`);
      }
      setTimeout(() => {
        handleReset();
        setShowModal(false);
      }, 500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to join group");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const onSubmit = async (data: JoinGroupBodyDTO) => {
    await handleJoin(data.inviteCode);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || loadingPreview || joinGroup.isPending,
    showModal,
    setShowModal,
    reset: handleReset,
    handleShowModal,
    step,
    setStep,
    preview,
    selectedSlot,
    setSelectedSlot,
    inviteCodeValue,
  };
}
