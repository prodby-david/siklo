"use client";

import { Mail, Clock, UserCheck } from "lucide-react";
import Loader from "@/shared/components/loader/Loader";
import useInvitesView from "../hooks/useInvitesView";
import EmptyInvitesState from "./EmptyInvitesState";
import InvitesFilterBar from "./InvitesFilterBar";
import ReceivedInviteCard from "./ReceivedInviteCard";
import SentRequestCard from "./SentRequestCard";

export default function InvitesRequestsView() {
  const {
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
  } = useInvitesView();

  if (isLoading) {
    return <Loader text="Loading your invitations and requests..." />;
  }

  return (
    <main className="flex-1 bg-neutral-subtext/5 p-4 sm:p-6 md:p-10 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              <Mail className="w-7 h-7 text-brand-accent" /> Invites & Requests
            </h1>
            <p className="text-sm text-neutral-subtext">
              Manage your group invitations and track pending join requests.
            </p>
          </div>
        </div>

        <InvitesFilterBar
          tab={tab}
          totalCount={totalCount}
          receivedCount={receivedInvites.length}
          sentCount={sentRequests.length}
          onTabChange={setTab}
        />

        {totalCount === 0 ? (
          <EmptyInvitesState />
        ) : (
          <div className="space-y-6">
            {showInvites && receivedInvites.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-brand-accent" /> Received Group Invitations
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {receivedInvites.map((item) => (
                    <ReceivedInviteCard
                      key={item.id}
                      item={item}
                      onAccept={handleAcceptInvite}
                      onDecline={handleDeclineInvite}
                    />
                  ))}
                </div>
              </div>
            )}

            {showRequests && sentRequests.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-neutral-subtext uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" /> Pending Join Requests
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sentRequests.map((item) => (
                    <SentRequestCard
                      key={item.id}
                      item={item}
                      onCancel={handleCancelRequest}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
