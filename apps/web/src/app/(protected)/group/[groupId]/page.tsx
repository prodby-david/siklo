"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GroupHero from "@/features/groups/components/details/GroupHero";
import GroupStatsGrid from "@/features/groups/components/details/GroupStatsGrid";
import GroupInfoCard from "@/features/groups/components/details/GroupInfoCard";
import GroupPayoutProgress from "@/features/groups/components/details/GroupPayoutProgress";
import GroupActivityLogs from "@/features/groups/components/details/GroupActivityLogs";
import GroupTurnShowcase from "@/features/groups/components/details/GroupTurnShowcase";
import Loader from "@/shared/components/loader/Loader";
import { useGroupPageController } from "@/features/groups/hooks/useGroupPageController";

export default function GroupPage() {
  const {
    data,
    isLoading,
    copied,
    handleCopyInviteCode,
    timeline,
    isOrganizer,
    hasStarted,
    isMembersFull,
    isCycleDone,
    handleStartCycle,
    isStarting,
    handleDeleteGroup,
    isDeleting,
    currentUserId,
  } = useGroupPageController();

  if (isLoading) {
    return (
      <main className="flex-1 bg-neutral-subtext/5 p-6 md:p-10 min-h-screen flex items-center justify-center">
        <Loader text="Loading group details..." />
      </main>
    );
  }

  if (!data || !timeline) {
    return (
      <main className="flex-1 bg-neutral-subtext/5 p-6 md:p-10 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3 bg-background p-8 rounded-2xl border border-neutral-border shadow-sm max-w-md">
          <p className="text-lg font-bold text-foreground">Group not found</p>
          <p className="text-sm text-neutral-subtext">
            The group you are looking for does not exist or you do not have
            permission to view it.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-background px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-neutral-subtext/5 p-6 md:p-10 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Link
            href="/group"
            className="flex items-center justify-center p-2 rounded-2xl border border-neutral-border bg-background hover:bg-neutral-subtext/5 text-neutral-subtext hover:text-foreground transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-xs text-neutral-subtext font-medium">
            Back to Groups
          </span>
        </div>

        <GroupHero
          groupId={data.id}
          name={data.name}
          description={data.description}
          billingCycle={data.billingCycle}
          inviteCode={data.inviteCode}
          copied={copied}
          onCopyInviteCode={handleCopyInviteCode}
          hasStarted={hasStarted}
          isCycleDone={isCycleDone}
          isOrganizer={isOrganizer}
        />

        <GroupStatsGrid
          contributionAmount={data.contributionAmount}
          maxMembers={data.maxMembers}
          cycleDuration={data.cycleDuration}
          billingCycle={data.billingCycle}
          membershipsCount={data._count?.memberships ?? 0}
          totalPayout={timeline.totalPayout}
          totalRounds={timeline.totalRounds}
        />

        <GroupTurnShowcase
          groupId={data.id}
          name={data.name}
          memberships={data.memberships}
          organizerId={data.organizerId}
          contributionAmount={data.contributionAmount}
          maxMembers={data.maxMembers}
          cycleDuration={data.cycleDuration}
          billingCycle={data.billingCycle}
          payoutSequence={data.payoutSequence}
          startDate={data.startDate}
          isOrganizer={isOrganizer}
          hasStarted={hasStarted}
          currentUserId={currentUserId}
          isCycleDone={isCycleDone}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-6">
            {hasStarted && (
              <div>
                <GroupActivityLogs
                  group={data}
                  memberships={data.memberships}
                  isCycleDone={isCycleDone}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <GroupInfoCard
              startDate={data.startDate}
              endDate={timeline.endDate}
              totalDays={timeline.totalDays}
              billingCycle={data.billingCycle}
              payoutSequence={data.payoutSequence}
              organizerId={data.organizerId}
              organizerName={data.organizer?.name}
              organizerContact={data.organizer?.contactNumber}
              isOrganizer={isOrganizer}
              hasStarted={hasStarted}
              onStartCycle={handleStartCycle}
              isStarting={isStarting}
              isMembersFull={isMembersFull}
              onDeleteGroup={handleDeleteGroup}
              isDeleting={isDeleting}
              membershipsCount={data._count?.memberships ?? 0}
              isCycleDone={isCycleDone}
            />
            {hasStarted && (
              <GroupPayoutProgress
                groupId={data.id}
                memberships={data.memberships}
                maxMembers={data.maxMembers}
                contributionAmount={data.contributionAmount}
                startDate={data.startDate}
                billingCycle={data.billingCycle}
                currentCycle={data.currentCycle}
                cycleDuration={data.cycleDuration}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
