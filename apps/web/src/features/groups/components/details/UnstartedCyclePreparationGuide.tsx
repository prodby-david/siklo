"use client";

import {
  Rocket,
  Users,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Wallet,
  ShieldAlert,
} from "lucide-react";
import { UnstartedCyclePreparationGuideProps } from "../../types/group.types";

export default function UnstartedCyclePreparationGuide({
  isOrganizer,
  membershipsCount,
  maxMembers,
  inviteCode,
  copied,
  onCopyInviteCode,
  payoutSequence,
}: UnstartedCyclePreparationGuideProps) {
  const minRequiredMembers = Math.min(3, maxMembers);
  const isReadyToStart = membershipsCount >= minRequiredMembers;
  const progressPercent = Math.min(
    100,
    Math.round((membershipsCount / maxMembers) * 100)
  );

  return (
    <div className="w-full flex flex-col gap-5 p-6 rounded-3xl border border-brand-accent/20 bg-background/80 backdrop-blur-sm shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center shrink-0">
            <Rocket className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-foreground tracking-tight">
              Getting Ready to Start
            </h3>
            <p className="text-xs text-neutral-subtext">
              Simple steps to complete before starting your group cycle
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto bg-neutral-subtext/5 border border-neutral-border text-foreground">
          <Users className="w-3.5 h-3.5 text-brand-accent" />
          <span>
            {membershipsCount} / {maxMembers} Members Joined
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-foreground">
            Group Member Progress
          </span>
          <span className="font-semibold text-neutral-subtext">
            {progressPercent}% Complete
          </span>
        </div>
        <progress
          className="siklo-progress h-2.5 block border border-neutral-border/50"
          value={progressPercent}
          max={100}
          aria-label={`${membershipsCount} of ${maxMembers} member slots filled`}
        />
        {!isReadyToStart && (
          <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-warning">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Need at least {minRequiredMembers} members to start. ({minRequiredMembers - membershipsCount} more needed)
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="h-full p-4 rounded-2xl border border-neutral-border bg-neutral-table-stripe/50 hover:border-brand-accent/40 transition-all flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className={`w-4 h-4 shrink-0 ${
                membershipsCount >= minRequiredMembers
                  ? "text-success"
                  : "text-neutral-subtext/50"
              }`}
            />
            <span className="text-xs font-bold text-foreground">
              1. Required Members
            </span>
          </div>
          <p className="text-[11px] text-neutral-subtext leading-relaxed">
            {membershipsCount >= minRequiredMembers
              ? `Ready! ${membershipsCount} members have joined.`
              : `Invite members until at least ${minRequiredMembers} members join your group.`}
          </p>
        </div>

        <div className="h-full p-4 rounded-2xl border border-neutral-border bg-neutral-table-stripe/50 hover:border-brand-accent/40 transition-all flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-accent shrink-0" />
            <span className="text-xs font-bold text-foreground">
              2. Turn Slot Selection
            </span>
          </div>
          <p className="text-[11px] text-neutral-subtext leading-relaxed">
            {payoutSequence === "MANUAL"
              ? "Members can choose their turn position in the Turn Queue below."
              : "Turn order will be assigned automatically when starting."}
          </p>
        </div>

        <div className="h-full p-4 rounded-2xl border border-neutral-border bg-neutral-table-stripe/50 hover:border-brand-accent/40 transition-all flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 shrink-0 text-winner-payout" />
            <span className="text-xs font-bold text-foreground">
              3. Payout Details Setup
            </span>
          </div>
          <p className="text-[11px] text-neutral-subtext leading-relaxed">
            Set up your payment receiving account (GCash, Maya, or Bank) so others can pay you when it is your turn.
          </p>
        </div>

        <div className="h-full p-4 rounded-2xl border border-neutral-border bg-neutral-table-stripe/50 hover:border-brand-accent/40 transition-all flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 text-warning" />
            <span className="text-xs font-bold text-foreground">
              4. Starting the Group
            </span>
          </div>
          <p className="text-[11px] text-neutral-subtext leading-relaxed">
            {isOrganizer
              ? "When ready, click 'Start Group Cycle' in the settings card."
              : "The organizer will start the group cycle once all members are ready."}
          </p>
        </div>
      </div>

      {isOrganizer && inviteCode && !isReadyToStart && (
        <div className="p-4 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-brand-accent shrink-0" />
            <div>
              <span className="text-xs font-bold text-foreground block">
                Share Group Code
              </span>
              <span className="text-[11px] text-neutral-subtext">
                Share this code with friends so they can join your group
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <code className="font-mono text-xs font-bold bg-background px-3 py-1.5 rounded-xl border border-brand-accent/30 text-foreground select-all">
              {inviteCode}
            </code>
            <button
              type="button"
              onClick={onCopyInviteCode}
              className="p-2 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground transition-all active:scale-95 cursor-pointer shrink-0"
              title="Copy Code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-brand-accent-foreground" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
