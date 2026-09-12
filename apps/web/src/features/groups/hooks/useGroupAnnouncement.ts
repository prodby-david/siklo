"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/utils/error.helper";
import { useSendAnnouncement } from "./useSendAnnouncement";

export function useGroupAnnouncement(groupId: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { mutateAsync: sendAnnouncement, isPending } =
    useSendAnnouncement(groupId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendAnnouncement(message.trim());
      toast.success("Announcement posted to group!");
      setMessage("");
      setIsOpen(false);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to send announcement"));
    }
  };

  return {
    isOpen,
    setIsOpen,
    message,
    setMessage,
    isPending,
    handleSubmit,
  };
}
