"use client";

import Image from "next/image";
import TotalSavingsCard from "../components/cards/TotalSavingsCard";
import NextPayoutCard from "../components/cards/NextPayoutCard";
import ActiveCycleSection from "../sections/ActiveCycleSection";
import CycleCards from "../components/cards/CycleCards";
import Loader from "@/shared/components/loader/Loader";
import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";
import { Users, Coins } from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";
import { timeGreeting } from "@/shared/utils/greetings";
import JoinGroupModal from "@/features/groups/components/modal/JoinGroupModal";

export default function DashboardUI() {
  const { firstName, isLoading, stats } = useDashboardData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative rounded-2xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-indigo-500/10 p-6 md:p-8 backdrop-blur-md dark:from-brand-accent/10 dark:to-indigo-500/5 shadow-sm">
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5">
            <Coins className="w-24 h-24 text-brand-accent" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0 select-none -my-2 md:-my-4">
              <div className="relative w-35 h-35">
                <Image
                  src="/images/siklo-waving.png"
                  alt="Siklo Mascot"
                  fill
                  sizes="140px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {timeGreeting()},
                <span className="text-brand-accent"> {firstName}!</span>
              </h2>
              <p className="text-sm text-neutral-subtext">
                Here&apos;s what&apos;s happening with your paluwagan groups
                today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <CreateGroupButton />
            <JoinGroupModal />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TotalSavingsCard
          totalPayoutPool={stats.totalPayoutPool}
          totalMonthlyContributions={stats.totalMonthlyContributions}
        />
        <NextPayoutCard
          expectedAmount={stats.nextPayoutAmount}
          expectedDate={stats.nextPayoutDate}
          groupName={stats.nearestGroupName}
        />
        <div className="p-6 border border-neutral-border rounded-2xl w-full bg-background shadow-sm hover:border-brand-accent/30 transition-all duration-300 flex items-center justify-between">
          <div className="flex flex-col gap-1 items-start">
            <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
              Active Groups
            </span>
            <p className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
              {stats.activeGroupsCount}
            </p>
            <span className="text-[11px] text-neutral-subtext mt-2 font-semibold bg-neutral-subtext/5 px-2.5 py-0.5 rounded-2xl border border-neutral-border/50">
              Joined Paluwagans
            </span>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-sky-500/10 rounded-full shrink-0">
            <Users className="w-6 h-6 text-sky-600" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <ActiveCycleSection />
        <CycleCards />
      </div>
    </div>
  );
}
