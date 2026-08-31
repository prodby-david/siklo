"use client";

import TotalSavingsCard from "../components/cards/TotalSavingsCard";
import NextPayoutCard from "../components/cards/NextPayoutCard";
import ActiveGroupsCard from "../components/cards/ActiveGroupsCard";
import ActiveCycleSection from "../sections/ActiveCycleSection";
import Loader from "@/shared/components/loader/Loader";
import { useDashboardData } from "../hooks/useDashboardData";
import DashboardWelcomeBanner from "../components/DashboardWelcomeBanner";
import ActionRequiredBanner from "../components/ActionRequiredBanner";
import RotationAgendaList from "../components/agenda/RotationAgendaList";
import SaverHealthTrackerCard from "../components/cards/SaverHealthTrackerCard";
import DashboardActivityFeed from "../components/activity/DashboardActivityFeed";

export default function DashboardUI() {
  const {
    firstName,
    isLoading,
    stats,
    alerts,
    agenda,
    healthStats,
    activities,
  } = useDashboardData();

  if (isLoading) {
    return <Loader text="Loading your dashboard..." />;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      <DashboardWelcomeBanner firstName={firstName} />

      <ActionRequiredBanner alerts={alerts} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TotalSavingsCard
          totalPayoutPool={stats.totalPayoutPool}
          totalMonthlyContributions={stats.totalMonthlyContributions}
          perTurnContribution={stats.perTurnContribution}
          primaryBillingCycle={stats.primaryBillingCycle}
          activeGroupsCount={stats.activeGroupsCount}
        />
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
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <RotationAgendaList agenda={agenda} />
          <ActiveCycleSection />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <SaverHealthTrackerCard stats={healthStats} />
          <DashboardActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
