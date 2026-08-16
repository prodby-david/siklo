import { Lock } from "lucide-react";

export default function GroupHeroCompletedBadge() {
  return (
    <div className="flex flex-col gap-1.5 bg-neutral-table-stripe/80 border border-neutral-border/80 p-4 rounded-2xl min-w-[260px] shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext flex items-center gap-1">
        <Lock className="w-3 h-3 text-neutral-subtext" /> Group Completed
      </span>
      <span className="text-xs font-bold text-foreground">
        Cycle Finished
      </span>
      <span className="text-[10px] text-neutral-subtext leading-relaxed">
        All turns across this group&apos;s cycles have been completed.
      </span>
    </div>
  );
}
