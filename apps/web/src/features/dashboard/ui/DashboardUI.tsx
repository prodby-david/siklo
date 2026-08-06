"use client";

import TotalSavingsCard from "../components/cards/TotalSavingsCard";
import NextPayoutCard from "../components/cards/NextPayoutCard";
import ActiveGroupsCard from "../components/cards/ActiveGroupsCard";
import ActiveCycleSection from "../sections/ActiveCycleSection";
import CycleCards from "../components/cards/CycleCards";
import Loader from "@/shared/components/loader/Loader";
import { useDashboardData } from "../hooks/useDashboardData";
import DashboardWelcomeBanner from "../components/DashboardWelcomeBanner";

export default function DashboardUI() {
  const { firstName, isLoading, stats } = useDashboardData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      <DashboardWelcomeBanner firstName={firstName} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TotalSavingsCard
          totalPayoutPool={stats.totalPayoutPool}
          totalMonthlyContributions={stats.totalMonthlyContributions}
        />
        <NextPayoutCard
          expectedAmount={stats.nextPayoutAmount}
          expectedDate={stats.nextPayoutDate}
          groupName={stats.nearestGroupName}
        />
        <ActiveGroupsCard count={stats.activeGroupsCount} />
      </div>

      <div className="space-y-4">
        <ActiveCycleSection />
        <CycleCards />
      </div>
    </div>
  );
}
