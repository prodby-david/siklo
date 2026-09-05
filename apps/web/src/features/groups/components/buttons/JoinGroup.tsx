import { LogIn } from "lucide-react";
import { JoinGroupProps } from "@/features/groups/types/group.types";

export default function JoinGroupButton({ onClick }: JoinGroupProps) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-brand-accent/30 bg-brand-accent/15 px-4 py-2 text-xs font-semibold text-brand-accent transition-all duration-150 hover:bg-brand-accent/25 active:scale-95 shadow-xs"
    >
      <LogIn size={14} />
      Join Group
    </button>
  );
}
