import { Sparkles, Check, Copy } from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { GroupHeroProps } from "../../types/group.types";

export default function GroupHero({
  name,
  description,
  billingCycle,
  inviteCode,
  copied,
  onCopyInviteCode,
  hasStarted,
}: GroupHeroProps) {
  const billingLabel =
    BILLING_CYCLE_LABELS[billingCycle as keyof typeof BILLING_CYCLE_LABELS] ||
    billingCycle;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-indigo-500/10 p-6 md:p-8 backdrop-blur-md dark:from-brand-accent/10 dark:to-indigo-500/5 shadow-sm">
      <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 pointer-events-none">
        <Sparkles className="w-32 h-32 text-brand-accent" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                hasStarted
                  ? "bg-brand-accent/15 text-brand-accent"
                  : "bg-warning/15 text-warning"
              }`}
            >
              {hasStarted ? "Active" : "Not Yet Started"}
            </span>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
              {billingLabel} Cycle
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {name}
          </h1>
          {description ? (
            <p className="text-sm text-neutral-subtext leading-relaxed">
              {description}
            </p>
          ) : (
            <p className="text-sm text-neutral-subtext italic">
              No description provided for this group.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm border border-neutral-border p-4 rounded-2xl min-w-[240px] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
            Group Invite Code
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
                <Check className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <span className="text-[10px] text-neutral-subtext leading-normal mb-2">
            Share this code with others to let them join.
          </span>
        </div>
      </div>
    </div>
  );
}
