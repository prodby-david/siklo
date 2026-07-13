import { Users } from "lucide-react";
import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";
import JoinGroupModal from "@/features/groups/components/modal/JoinGroupModal";
import Image from "next/image";

export default function EmptyGroupState() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center border border-neutral-border border-dashed rounded-2xl bg-background mt-3">
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
      <h3 className="text-sm font-bold text-foreground">No active groups</h3>
      <p className="text-xs text-neutral-subtext mt-1 max-w-xs leading-normal">
        You haven&apos;t joined any Paluwagan cycles yet. Create a new one or
        join using an invite code.
      </p>
      <div className="flex gap-3 mt-4">
        <CreateGroupButton />
        <JoinGroupModal />
      </div>
    </div>
  );
}
