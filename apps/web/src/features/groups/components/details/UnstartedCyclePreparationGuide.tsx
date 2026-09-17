"use client";

import {
  Rocket,
  Users,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Wallet,
  ShieldAlert,
} from "lucide-react";
import type { UnstartedCyclePreparationGuideProps } from "../../types/group.types";
import PreparationGuideStepItem from "./elements/PreparationGuideStepItem";
import PreparationGuideInviteBox from "./elements/PreparationGuideInviteBox";

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
    <div className="w-full flex flex-col gap-5 p-6 rounded-3xl border border-brand-accent/20 bg-card/80 backdrop-blur-sm shadow-xs">
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
        <PreparationGuideStepItem
          stepNumber={1}
          title="Required Members"
          description={
            membershipsCount >= minRequiredMembers
              ? `Ready! ${membershipsCount} members have joined.`
              : `Invite members until at least ${minRequiredMembers} members join your group.`
          }
          icon={
            <CheckCircle2
              className={`w-4 h-4 shrink-0 ${
                membershipsCount >= minRequiredMembers
                  ? "text-success"
                  : "text-neutral-subtext/50"
              }`}
            />
          }
        />

        <PreparationGuideStepItem
          stepNumber={2}
          title="Turn Slot Selection"
          description={
            payoutSequence === "MANUAL"
              ? "Members can choose their turn position in the Turn Queue below."
              : "Turn order will be assigned automatically when starting."
          }
          icon={<Calendar className="w-4 h-4 text-brand-accent shrink-0" />}
        />

        <PreparationGuideStepItem
          stepNumber={3}
          title="Payout Details Setup"
          description="Set up your payment receiving account (GCash, Maya, or Bank) so others can pay you when it is your turn."
          icon={<Wallet className="h-4 w-4 shrink-0 text-winner-payout" />}
        />

        <PreparationGuideStepItem
          stepNumber={4}
          title="Starting the Group"
          description={
            isOrganizer
              ? "When ready, click 'Start Group Cycle' in the settings card."
              : "The organizer will start the group cycle once all members are ready."
          }
          icon={<ShieldAlert className="h-4 w-4 shrink-0 text-warning" />}
        />
      </div>

      {isOrganizer && inviteCode && !isReadyToStart && (
        <PreparationGuideInviteBox
          inviteCode={inviteCode}
          copied={copied}
          onCopyInviteCode={onCopyInviteCode}
        />
      )}
    </div>
  );
}
