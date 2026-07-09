import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function CreateNewGroup() {
  return (
    <Link
      href={"/group/create"}
      className="w-full bg-brand-primary hover:opacity-90 text-background py-3 rounded-2xl font-semibold active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 text-sm cursor-pointer"
    >
      <PlusCircle className="w-4 h-4 text-brand-accent" />
      New Group
    </Link>
  );
}
