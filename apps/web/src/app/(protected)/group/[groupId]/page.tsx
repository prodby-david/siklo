"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useGroupDetails } from "@/features/groups/hooks/useGroupDetails";
import GroupHero from "@/features/groups/components/details/GroupHero";
import GroupStatsGrid from "@/features/groups/components/details/GroupStatsGrid";
import GroupInfoCard from "@/features/groups/components/details/GroupInfoCard";
import GroupRotationSlots from "@/features/groups/components/details/GroupRotationSlots";
import Loader from "@/shared/components/loader/Loader";
import useGetCurrentName from "@/features/users/hooks/useGetCurrentName";
import useStartGroupCycle from "@/features/groups/hooks/useStartGroupCycle";
import { toast } from "sonner";

export default function GroupPage() {
  const { data, isLoading, copied, handleCopyInviteCode, timeline } =
    useGroupDetails();
  const { data: currentUser } = useGetCurrentName();
  const { mutateAsync: startCycle, isPending: isStarting } =
    useStartGroupCycle();

  const isOrganizer = currentUser?.id === data?.organizerId;
  const hasStarted = !!data?.startDate;

  const handleStartCycle = async () => {
    if (!data?.id) return;
    try {
      await startCycle(data.id);
      toast.success("Group cycle started successfully!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to start cycle",
      );
    }
  };

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
          name={data.name}
          description={data.description}
          billingCycle={data.billingCycle}
          inviteCode={data.inviteCode}
          copied={copied}
          onCopyInviteCode={handleCopyInviteCode}
          isOrganizer={isOrganizer}
          hasStarted={hasStarted}
          isStarting={isStarting}
          onStartCycle={handleStartCycle}
        />

        <GroupStatsGrid
          contributionAmount={data.contributionAmount}
          maxMembers={data.maxMembers}
          cycleDuration={data.cycleDuration}
          billingCycle={data.billingCycle}
          membershipsCount={data._count?.memberships || 1}
          totalPayout={timeline.totalPayout}
          totalRounds={timeline.totalRounds}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <GroupRotationSlots
              maxMembers={data.maxMembers}
              membershipsCount={data._count?.memberships || 1}
              memberships={data.memberships}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <GroupInfoCard
              startDate={data.startDate}
              endDate={timeline.endDate}
              totalDays={timeline.totalDays}
              billingCycle={data.billingCycle}
              payoutSequence={data.payoutSequence}
              organizerId={data.organizerId}
            />
            <button className="w-full text-xs flex items-center justify-center gap-2 bg-brand-accent text-background px-4 py-2.5 rounded-2xl font-semibold active:opacity-90 transition-all shadow-sm cursor-pointer">
              <RefreshCw size={16} />
              Start Cycle
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
