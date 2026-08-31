import { Copy, Check } from "lucide-react";
import { GroupHeroInviteCodeCardProps } from "@/features/groups/types/group.types";

export default function GroupHeroInviteCodeCard({
  inviteCode,
  copied,
  onCopyInviteCode,
}: GroupHeroInviteCodeCardProps) {
  if (!inviteCode) return null;

  return (
    <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm border border-neutral-border p-4 rounded-2xl w-[250px] shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
        Organizer Invite Code
      </span>
      <div className="flex items-center justify-between bg-neutral-subtext/5 rounded-2xl p-2.5 border border-neutral-border/50">
        <code className="font-mono text-sm font-bold tracking-wider text-foreground select-all">
          {inviteCode}
        </code>
        <button
          onClick={onCopyInviteCode}
          className="p-1.5 rounded-2xl hover:bg-neutral-subtext/10 text-brand-accent hover:text-brand-accent-hover transition-all duration-150 active:scale-95 cursor-pointer"
          title="Copy Code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <span className="text-[10px] text-neutral-subtext leading-relaxed">
        Share this invite code with members. Once the cycle starts, inviting new
        members will be disabled.
      </span>
    </div>
  );
}
