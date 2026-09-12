"use client";

import {
  UserPlus,
  Copy,
  Check,
  Users,
  Link2,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import useOrganizerInvite from "../hooks/useOrganizerInvite";
import type { OrganizerInviteSectionProps } from "../types/invite.types";

export default function OrganizerInviteSection({
  groupId,
  inviteCode,
  maxMembers,
  membershipsCount,
  isOrganizer = true,
}: OrganizerInviteSectionProps) {
  const {
    copied,
    email,
    setEmail,
    localError,
    setLocalError,
    isPending,
    isMembersFull,
    handleCopyCode,
    handleSendInvite,
  } = useOrganizerInvite({
    groupId,
    inviteCode,
    maxMembers,
    membershipsCount,
  });

  return (
    <div className="w-full lg:col-span-7 border border-neutral-border/80 rounded-3xl p-5 sm:p-7 bg-card flex flex-col justify-between gap-5 shadow-xs">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/25 shrink-0">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Invite Members
              </h3>
              <p className="text-xs text-neutral-subtext">
                Invite members before the group cycle starts
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-subtext/5 border border-neutral-border text-foreground">
            <Users className="w-3.5 h-3.5 text-brand-accent" />
            <span>
              {membershipsCount} / {maxMembers} Slots Filled
            </span>
          </div>
        </div>

        {inviteCode && (
          <div className="flex flex-col gap-2 p-4 rounded-2xl border border-neutral-border bg-neutral-table-stripe/50">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-brand-accent" />
                <span className="text-xs font-bold text-foreground">
                  Group Invite Code
                </span>
              </div>
              <span className="text-[11px] text-neutral-subtext">
                Share with friends to join
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <code className="font-mono text-xs font-bold bg-background px-3 py-2 rounded-xl border border-brand-accent/30 text-foreground flex-1 tracking-wider select-all">
                {inviteCode}
              </code>
              <button
                type="button"
                onClick={handleCopyCode}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-brand-accent px-4 py-2 text-xs font-bold text-brand-accent-foreground transition-all hover:bg-brand-accent-hover active:scale-95 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {isOrganizer ? (
          <form
            onSubmit={handleSendInvite}
            className="flex flex-col gap-2 pt-1"
          >
            <div>
              <span className="text-xs font-bold text-foreground block">
                Direct User Invite
              </span>
              <span className="text-[11px] text-neutral-subtext">
                Send an invite directly to a user using their email address
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (localError) setLocalError(null);
                }}
                disabled={isPending || isMembersFull}
                placeholder="Enter user email address"
                className="w-full rounded-2xl border border-neutral-border bg-background py-2.5 px-3.5 text-xs text-foreground placeholder:text-neutral-subtext focus:border-brand-accent focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isPending || isMembersFull || !email.trim()}
                className="w-full sm:w-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-accent px-5 py-2.5 text-xs font-bold text-brand-accent-foreground transition-all hover:bg-brand-accent-hover active:scale-95 disabled:opacity-50 shrink-0"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>

            {localError && (
              <p className="flex items-center gap-1 text-xs text-danger font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{localError}</span>
              </p>
            )}

            {isMembersFull && (
              <p className="text-[11px] text-warning font-medium mt-1">
                Group has reached maximum member capacity.
              </p>
            )}
          </form>
        ) : (
          <div className="p-4 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe/30 text-xs text-neutral-subtext">
            Once all member slots are filled, the organizer will start the group
            cycle.
          </div>
        )}
      </div>
    </div>
  );
}
