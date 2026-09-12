"use client";

import { useState, type FormEvent } from "react";
import useCreateInvite from "./useCreateInvite";

interface UseOrganizerInviteOptions {
  groupId: string;
  inviteCode?: string | null;
  maxMembers: number;
  membershipsCount: number;
}

export default function useOrganizerInvite({
  groupId,
  inviteCode,
  maxMembers,
  membershipsCount,
}: UseOrganizerInviteOptions) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { mutate, isPending } = useCreateInvite(groupId);

  const isMembersFull = membershipsCount >= maxMembers;

  const handleCopyCode = async () => {
    if (!inviteCode) return;
    await navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setLocalError("Please enter an email address.");
      return;
    }

    mutate(
      { groupId, email: trimmed },
      {
        onSuccess: () => {
          setEmail("");
        },
      },
    );
  };

  return {
    copied,
    email,
    setEmail,
    localError,
    setLocalError,
    isPending,
    isMembersFull,
    handleCopyCode,
    handleSendInvite,
  };
}
