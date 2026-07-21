import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type JoinGroupBodyDTO,
  joinGroupBodySchema,
} from "@siklo/shared-schemas";
import { useState } from "react";
import useJoinGroup from "./useJoinGroup";
import {
  getGroupInvitePreview,
  type GroupPreviewResponse,
} from "../api/getGroupInvitePreview";
import { toast } from "sonner";
import axios from "axios";

export default function useInviteCode() {
  const joinGroup = useJoinGroup();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JoinGroupBodyDTO>({
    resolver: zodResolver(joinGroupBodySchema) as any,
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
      await joinGroup.mutateAsync({
        inviteCode: code,
        position: slot,
      });
      toast.success("Group joined successfully");
      handleReset();
      setShowModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to join group");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const onSubmit = async (data: JoinGroupBodyDTO) => {
    if (step === "code") {
      setLoadingPreview(true);
      try {
        const previewData = await getGroupInvitePreview(data.inviteCode);
        setPreview(previewData);
        if (previewData.payoutSequence === "FREECHOOSING") {
          setStep("slots");
        } else {
          await handleJoin(data.inviteCode);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Failed to find group");
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoadingPreview(false);
      }
    } else if (step === "slots") {
      if (!selectedSlot) {
        toast.error("Please select a payout slot position");
        return;
      }
      await handleJoin(data.inviteCode, selectedSlot);
    }
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
