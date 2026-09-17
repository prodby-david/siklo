"use client";

import NextPayoutCard from "../components/cards/NextPayoutCard";
import ActiveGroupsCard from "../components/cards/ActiveGroupsCard";
import ActiveCycleSection from "../sections/ActiveCycleSection";
import Loader from "@/shared/components/loader/Loader";
import { useDashboardData } from "../hooks/useDashboardData";
import DashboardWelcomeBanner from "../components/DashboardWelcomeBanner";
import ActionRequiredBanner from "../components/ActionRequiredBanner";
import OrganizerActionCenter from "../components/organizer/OrganizerActionCenter";
import RotationAgendaList from "../components/agenda/RotationAgendaList";
import DashboardActivityFeed from "../components/activity/DashboardActivityFeed";

export default function DashboardUI() {
  const {
    firstName,
    isLoading,
    stats,
    alerts,
    organizerTasks,
    agenda,
    activities,
  } = useDashboardData();

  if (isLoading) {
    return <Loader text="Loading your dashboard..." />;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      <DashboardWelcomeBanner firstName={firstName} />

      <ActionRequiredBanner alerts={alerts} />

      <OrganizerActionCenter tasks={organizerTasks} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NextPayoutCard
          expectedAmount={stats.nextPayoutAmount}
          expectedDate={stats.nextPayoutDate}
          groupName={stats.nextPayoutGroupName}
          groupId={stats.nextPayoutGroupId}
        />
        <ActiveGroupsCard
          count={stats.activeGroupsCount}
          nextContributionAmount={stats.nextContributionAmount}
          groupName={stats.dueGroupName}
          groupId={stats.dueGroupId}
          nearestDueDate={stats.nearestDueDate}
          paymentStatus={stats.dueContributionStatus}
          daysOverdue={stats.dueDaysOverdue}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <RotationAgendaList agenda={agenda} />
          <ActiveCycleSection />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <DashboardActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}

