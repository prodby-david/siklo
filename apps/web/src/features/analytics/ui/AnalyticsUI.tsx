"use client";

import Loader from "@/shared/components/loader/Loader";
import PayoutTimelineStrip from "@/features/dashboard/components/timeline/PayoutTimelineStrip";
import SavingsFlowCard from "@/features/dashboard/components/cards/SavingsFlowCard";
import TotalSavingsCard from "@/features/dashboard/components/cards/TotalSavingsCard";
import { useAnalyticsData } from "../hooks/useAnalyticsData";
import AnalyticsHeader from "../components/AnalyticsHeader";
import SaverReliabilityCard from "../components/SaverReliabilityCard";

export default function AnalyticsUI() {
  const { stats, payoutTimeline, isLoading } = useAnalyticsData();

  if (isLoading) {
    return <Loader text="Loading financial analytics..." />;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      <AnalyticsHeader stats={stats} />

      <PayoutTimelineStrip milestones={payoutTimeline} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <TotalSavingsCard
          totalPayoutPool={stats.totalPayoutPool}
          totalMonthlyContributions={stats.totalMonthlyContributions}
          perTurnContribution={stats.perTurnContribution}
          primaryBillingCycle={stats.primaryBillingCycle}
          activeGroupsCount={stats.activeGroupsCount}
        />

        <SavingsFlowCard stats={stats} />

        <SaverReliabilityCard stats={stats} />
      </div>
    </div>
  );
}
