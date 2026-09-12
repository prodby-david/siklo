import { Users, Check, Copy } from "lucide-react";
import type { PreparationGuideInviteBoxProps } from "../../../types/group.types";

export default function PreparationGuideInviteBox({
  inviteCode,
  copied,
  onCopyInviteCode,
}: PreparationGuideInviteBoxProps) {
  return (
    <div className="p-4 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
      <div className="flex items-center gap-2.5">
        <Users className="w-4 h-4 text-brand-accent shrink-0" />
        <div>
          <span className="text-xs font-bold text-foreground block">
            Share Group Code
          </span>
          <span className="text-[11px] text-neutral-subtext">
            Share this code with friends so they can join your group
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <code className="font-mono text-xs font-bold bg-background px-3 py-1.5 rounded-xl border border-brand-accent/30 text-foreground select-all">
          {inviteCode}
        </code>
        <button
          type="button"
          onClick={onCopyInviteCode}
          className="p-2 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground transition-all active:scale-95 cursor-pointer shrink-0"
          title="Copy Code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-brand-accent-foreground" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
