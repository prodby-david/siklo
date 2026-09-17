import Image from "next/image";
import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";
import JoinGroupModal from "@/features/groups/components/modals/JoinGroupModal";
import type { GroupFilterStatus } from "@/features/groups/types/group.types";
import type { EmptyGroupStateProps } from "../types/dashboard.types";

const EMPTY_STATE_CONTENT: Record<
  GroupFilterStatus,
  { title: string; description: string }
> = {
  ALL: {
    title: "No savings groups",
    description:
      "You haven't joined any Paluwagan cycles yet. Create a new one or join using an invite code.",
  },
  ACTIVE: {
    title: "No active groups",
    description:
      "You don't have any ongoing Paluwagan cycles right now. Start a pending cycle or join one.",
  },
  PENDING: {
    title: "No pending groups",
    description:
      "You don't have any groups waiting to start right now. Create a new group to invite members.",
  },
  COMPLETED: {
    title: "No completed groups",
    description: "You don't have any completed Paluwagan cycles yet.",
  },
};

export default function EmptyGroupState({
  filter = "ALL",
  title,
  description,
}: EmptyGroupStateProps) {
  const content = EMPTY_STATE_CONTENT[filter] || EMPTY_STATE_CONTENT.ALL;
  const displayTitle = title || content.title;
  const displayDescription = description || content.description;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-neutral-border border-dashed rounded-3xl bg-card/60 mt-3 shadow-xs">
      <div className="mb-4">
        <Image
          src="/images/siklo-looking.png"
          alt="Siklo Mascot"
          width={180}
          height={180}
          className="mx-auto"
          priority
        />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-foreground">
        {displayTitle}
      </h3>
      <p className="text-xs text-neutral-subtext mt-1 max-w-xs leading-relaxed">
        {displayDescription}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <CreateGroupButton />
        <JoinGroupModal />
      </div>
    </div>
  );
}
