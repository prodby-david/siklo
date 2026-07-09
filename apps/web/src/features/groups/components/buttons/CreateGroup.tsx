import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateGroupButton() {
  return (
    <Link
      href="/group/create"
      className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl hover:opacity-90 transition-all cursor-pointer"
    >
      <Plus size={14} />
      Create Group
    </Link>
  );
}
