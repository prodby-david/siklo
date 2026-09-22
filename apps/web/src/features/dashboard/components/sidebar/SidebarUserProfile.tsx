import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";

interface SidebarUserProfileProps {
  onNavigate?: () => void;
}

export default function SidebarUserProfile({ onNavigate }: SidebarUserProfileProps) {
  const { data: user, isLoading } = useGetCurrentName();

  const displayName = user?.name || "Member";
  const displayEmail = user?.email || "";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <Link
      href="/settings"
      onClick={onNavigate}
      className="group flex items-center justify-between p-2.5 rounded-2xl bg-neutral-table-stripe/60 border border-neutral-border/60 hover:border-brand-accent/30 hover:bg-neutral-table-stripe transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative shrink-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-brand-accent/15 text-brand-accent font-extrabold text-xs border border-brand-accent/25 flex items-center justify-center">
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={displayName}
                width={36}
                height={36}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              initials
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-card" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-foreground truncate group-hover:text-brand-accent transition-colors block">
              {displayName}
            </span>
          </div>
          <span className="text-[10px] text-neutral-subtext truncate block">
            {isLoading ? "Loading..." : displayEmail || "Active Saver"}
          </span>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-neutral-subtext group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );
}
