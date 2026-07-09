import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ViewAllButtonProps = {
  href: string;
};

export default function ViewAllButton({ href }: ViewAllButtonProps) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium">View All</span>
        <ChevronRight className="w-3 h-3 text-brand-accent" />
      </div>
    </Link>
  );
}
