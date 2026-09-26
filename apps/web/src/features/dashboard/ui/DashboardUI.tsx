"use client";

import TotalSavingsCard from "../components/cards/TotalSavingsCard";
import NextPayoutCard from "../components/cards/NextPayoutCard";
import ActiveGroupsCard from "../components/cards/ActiveGroupsCard";
import ActiveCycleSection from "../sections/ActiveCycleSection";
import Loader from "@/shared/components/loader/Loader";
import { useDashboardData } from "../hooks/useDashboardData";
import DashboardWelcomeBanner from "../components/DashboardWelcomeBanner";
import ActionRequiredBanner from "../components/ActionRequiredBanner";
import OrganizerActionCenter from "../components/organizer/OrganizerActionCenter";
import RotationAgendaList from "../components/agenda/RotationAgendaList";
import SavingsFlowCard from "../components/cards/SavingsFlowCard";
import DashboardActivityFeed from "../components/activity/DashboardActivityFeed";
import DashboardOnboardingCard from "../components/onboarding/DashboardOnboardingCard";

export default function DashboardUI() {
  const {
    firstName,
    isLoading,
    stats,
    alerts,
    organizerTasks,
    agenda,
    healthStats,
    activities,
  } = useDashboardData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      <DashboardWelcomeBanner firstName={firstName} />

      <ActionRequiredBanner alerts={alerts} />

      <OrganizerActionCenter tasks={organizerTasks} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        <ActiveGroupsCard
          count={stats.activeGroupsCount}
          nextContributionAmount={stats.nextContributionAmount}
          groupName={stats.dueGroupName}
          groupId={stats.dueGroupId}
          nearestDueDate={stats.nearestDueDate}
          paymentStatus={stats.dueContributionStatus}
          daysOverdue={stats.dueDaysOverdue}
        />
        <NextPayoutCard
          expectedAmount={stats.nextPayoutAmount}
          expectedDate={stats.nextPayoutDate}
          groupName={stats.nextPayoutGroupName}
          groupId={stats.nextPayoutGroupId}
        />
        <TotalSavingsCard
          totalPayoutPool={stats.totalPayoutPool}
          totalMonthlyContributions={stats.totalMonthlyContributions}
          perTurnContribution={stats.perTurnContribution}
          primaryBillingCycle={stats.primaryBillingCycle}
          activeGroupsCount={stats.activeGroupsCount}
        />
      </div>

      {stats.activeGroupsCount === 0 ? (
        <DashboardOnboardingCard />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <RotationAgendaList agenda={agenda} />
            <ActiveCycleSection />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <SavingsFlowCard stats={healthStats} />
            <DashboardActivityFeed activities={activities} />
          </div>
        </div>
      )}
    </div>
  );
}

