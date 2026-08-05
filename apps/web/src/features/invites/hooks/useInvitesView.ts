"use client";

import { useState } from "react";
import useGetGroup from "@/features/groups/hooks/useGetGroup";
import { GroupInvite, InviteTabFilter, UseInvitesViewReturn } from "../types/invite.types";

export default function useInvitesView(): UseInvitesViewReturn {
  const [tab, setTab] = useState<InviteTabFilter>("ALL");
  const { isLoading } = useGetGroup();

  const [receivedInvites, setReceivedInvites] = useState<GroupInvite[]>([]);
  const [sentRequests, setSentRequests] = useState<GroupInvite[]>([]);

  const handleAcceptInvite = (id: string) => {
    setReceivedInvites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeclineInvite = (id: string) => {
    setReceivedInvites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancelRequest = (id: string) => {
    setSentRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const showInvites = tab === "ALL" || tab === "INVITES";
  const showRequests = tab === "ALL" || tab === "REQUESTS";
  const totalCount = receivedInvites.length + sentRequests.length;

  return {
    tab,
    setTab,
    isLoading,
    receivedInvites,
    sentRequests,
    handleAcceptInvite,
    handleDeclineInvite,
    handleCancelRequest,
    showInvites,
    showRequests,
    totalCount,
  };
}
