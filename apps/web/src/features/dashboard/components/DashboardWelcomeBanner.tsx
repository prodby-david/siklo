import React from "react";
import Image from "next/image";
import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";
import JoinGroupModal from "@/features/groups/components/modal/JoinGroupModal";
import { Coins } from "lucide-react";
import { timeGreeting } from "@/shared/utils/greetings";

interface DashboardWelcomeBannerProps {
  firstName: string;
}

export default function DashboardWelcomeBanner({
  firstName,
}: DashboardWelcomeBannerProps) {
  return (
    <div className="relative rounded-2xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-indigo-500/10 p-5 sm:p-6 md:p-8 backdrop-blur-md dark:from-brand-accent/10 dark:to-indigo-500/5 shadow-sm">
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5">
          <Coins className="w-24 h-24 text-brand-accent" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative shrink-0 select-none -my-2 sm:-my-4">
            <div className="relative w-28 h-28 sm:w-35 sm:h-35 mx-auto sm:mx-0">
              <Image
                src="/images/siklo-waving.png"
                alt="Siklo Mascot"
                fill
                sizes="(max-width: 640px) 112px, 140px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {timeGreeting()},
              <span className="text-brand-accent"> {firstName}!</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-subtext">
              Here&apos;s what&apos;s happening with your paluwagan groups today.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-2 shrink-0 flex-wrap">
          <CreateGroupButton />
          <JoinGroupModal />
        </div>
      </div>
    </div>
  );
}
