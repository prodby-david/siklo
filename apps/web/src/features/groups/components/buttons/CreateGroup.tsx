import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateGroupButton() {
  return (
    <Link
      href="/group/create"
      className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover px-4 py-2 text-xs font-semibold text-brand-accent-foreground shadow-sm transition-all duration-150 active:scale-95"
    >
      <Plus size={14} />
      Create Group
    </Link>
  );
}
