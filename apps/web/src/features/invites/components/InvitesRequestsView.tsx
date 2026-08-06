"use client";

import { Mail, Check, X, Clock, PhilippinePeso, Users, UserCheck } from "lucide-react";
import Loader from "@/shared/components/loader/Loader";
import useInvitesView from "../hooks/useInvitesView";
import EmptyInvitesState from "./EmptyInvitesState";

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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-b border-neutral-border/60 pb-3 w-full">
          <button
            onClick={() => setTab("ALL")}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
              tab === "ALL"
                ? "bg-brand-accent text-background border-brand-accent shadow-sm"
                : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setTab("INVITES")}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
              tab === "INVITES"
                ? "bg-brand-accent text-background border-brand-accent shadow-sm"
                : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
            }`}
          >
            Received Invites ({receivedInvites.length})
          </button>
          <button
            onClick={() => setTab("REQUESTS")}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
              tab === "REQUESTS"
                ? "bg-brand-accent text-background border-brand-accent shadow-sm"
                : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
            }`}
          >
            Sent Requests ({sentRequests.length})
          </button>
        </div>

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
                    <div
                      key={item.id}
                      className="p-6 bg-background border border-neutral-border rounded-2xl shadow-sm flex flex-col justify-between gap-4 hover:border-brand-accent/30 transition-all group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-accent">
                            {item.billingCycle} Cycle
                          </span>
                          <span className="text-[10px] text-neutral-subtext font-medium bg-neutral-subtext/5 px-2 py-0.5 rounded-2xl border border-neutral-border/50">
                            Invite Received
                          </span>
                        </div>

                        <div>
                          <p className="font-extrabold text-base text-foreground group-hover:text-brand-accent transition-colors">
                            {item.name}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-border/50">
                          <div>
                            <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                              Contribution
                            </span>
                            <p className="flex items-center gap-0.5 font-bold text-sm text-foreground mt-0.5">
                              <PhilippinePeso className="w-3.5 h-3.5" />
                              {item.contributionAmount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                              Slots
                            </span>
                            <p className="flex items-center gap-1 font-bold text-sm text-foreground mt-0.5">
                              <Users className="w-3.5 h-3.5 text-neutral-subtext" />
                              {item._count?.memberships ?? 0} / {item.maxMembers}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-neutral-border/50">
                        <button
                          onClick={() => handleAcceptInvite(item.id)}
                          className="flex-1 flex items-center justify-center gap-1 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover py-2.5 px-4 rounded-2xl transition-all active:scale-95 cursor-pointer shadow-sm"
                        >
                          <Check className="w-4 h-4" /> Accept & Join Group
                        </button>
                        <button
                          onClick={() => handleDeclineInvite(item.id)}
                          className="flex items-center justify-center gap-1 text-xs font-bold text-neutral-subtext hover:text-foreground bg-neutral-table-stripe hover:bg-neutral-subtext/10 py-2.5 px-4 rounded-2xl transition-all active:scale-95 cursor-pointer border border-neutral-border/50"
                        >
                          <X className="w-4 h-4" /> Decline
                        </button>
                      </div>
                    </div>
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
                    <div
                      key={item.id}
                      className="p-6 bg-background border border-neutral-border rounded-2xl shadow-sm flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-amber-500/15 text-amber-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Pending Approval
                          </span>
                        </div>
                        <p className="font-extrabold text-base text-foreground">
                          {item.name}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCancelRequest(item.id)}
                        className="text-xs font-bold text-neutral-subtext hover:text-danger bg-neutral-table-stripe hover:bg-danger/10 py-2 px-3 rounded-2xl transition-all active:scale-95 cursor-pointer border border-neutral-border/50 shrink-0"
                      >
                        Cancel Request
                      </button>
                    </div>
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
