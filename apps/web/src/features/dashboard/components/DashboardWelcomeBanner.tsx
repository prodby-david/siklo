import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";
import JoinGroupModal from "@/features/groups/components/modals/JoinGroupModal";
import { timeGreeting } from "@/shared/utils/greetings";
import { DashboardWelcomeBannerProps } from "../types/dashboard.types";

export default function DashboardWelcomeBanner({
  firstName,
}: DashboardWelcomeBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-border/50">
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {timeGreeting()}, <span className="text-brand-accent">{firstName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-subtext">
          Overview of your active savings circles, rotation turns, and dues.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
        <JoinGroupModal />
        <CreateGroupButton />
      </div>
    </div>
  );
}
