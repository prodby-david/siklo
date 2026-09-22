"use client";

import { useState } from "react";
import { Inbox, Send } from "lucide-react";
import InvitesHeader from "./InvitesHeader";
import InvitesEmptyState from "./InvitesEmptyState";
import InviteCard from "./cards/InviteCard";
import { useGetUserPendingInvites } from "../hooks/useGetUserPendingInvites";
import useAcceptInvite from "../hooks/useAcceptInvite";
import useDeclineInvite from "../hooks/useDeclineInvite";
import type { InviteType, ReceivedInvite } from "../types/invite.types";

export default function InvitesSection() {
  const [activeTab, setActiveTab] = useState<InviteType>("received");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data: rawInvites, isLoading } = useGetUserPendingInvites();
  const acceptMutation = useAcceptInvite();
  const declineMutation = useDeclineInvite();

  const receivedInvites: ReceivedInvite[] = Array.isArray(rawInvites)
    ? rawInvites.map((item) => ({
        id: item.id,
        groupId: item.groupId,
        groupName: item.group?.name ?? "Savings Circle",
        contributionAmount: item.group?.contributionAmount ?? 0,
        billingCycle: item.group?.billingCycle ?? "MONTHLY",
        invitedBy: {
          id: item.organizer?.id ?? "",
          name: item.organizer?.name ?? "Circle Organizer",
        },
        status: item.status,
        createdAt: item.createdAt,
      }))
    : [];

  const handleAccept = (id: string) => {
    setProcessingId(id);
    acceptMutation.mutate(id, {
      onSettled: () => setProcessingId(null),
    });
  };

  const handleDecline = (id: string) => {
    setProcessingId(id);
    declineMutation.mutate(id, {
      onSettled: () => setProcessingId(null),
    });
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <InvitesHeader />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 p-1 bg-neutral-table-stripe rounded-2xl border border-neutral-border/60">
          <button
            type="button"
            onClick={() => setActiveTab("received")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "received"
                ? "bg-brand-accent text-brand-accent-foreground shadow-xs"
                : "text-neutral-subtext hover:text-foreground hover:bg-neutral-border/30"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Received</span>
            {receivedInvites.length > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                  activeTab === "received"
                    ? "bg-brand-accent-foreground/20 text-brand-accent-foreground"
                    : "bg-brand-accent/15 text-brand-accent"
                }`}
              >
                {receivedInvites.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sent")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "sent"
                ? "bg-brand-accent text-brand-accent-foreground shadow-xs"
                : "text-neutral-subtext hover:text-foreground hover:bg-neutral-border/30"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Sent</span>
          </button>
        </div>
      </div>

      {activeTab === "received" ? (
        isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-neutral-border/70 bg-card p-5 h-44 animate-pulse flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-subtext/10 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-neutral-subtext/15 rounded-md w-3/4" />
                    <div className="h-3 bg-neutral-subtext/10 rounded-md w-1/2" />
                  </div>
                </div>
                <div className="h-8 bg-neutral-subtext/10 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        ) : receivedInvites.length === 0 ? (
          <InvitesEmptyState type="received" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {receivedInvites.map((invite) => (
              <InviteCard
                key={invite.id}
                type="received"
                invite={invite}
                onAccept={handleAccept}
                onDecline={handleDecline}
                isProcessing={processingId === invite.id}
              />
            ))}
          </div>
        )
      ) : (
        <InvitesEmptyState type="sent" />
      )}
    </div>
  );
}
