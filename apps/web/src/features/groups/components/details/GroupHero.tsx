"use client";

import { useState } from "react";
import { RotateCw, Check, Copy, Lock, Pencil, Save, X } from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { GroupHeroProps } from "../../types/group.types";
import { useUpdateGroupDescription } from "../../hooks/useUpdateGroupDescription";

export default function GroupHero({
  groupId,
  name,
  description,
  billingCycle,
  inviteCode,
  copied,
  onCopyInviteCode,
  hasStarted,
  isCycleDone = false,
  isOrganizer = false,
}: GroupHeroProps) {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState(description || "");
  const updateDescMutation = useUpdateGroupDescription(groupId || "");

  const billingLabel =
    BILLING_CYCLE_LABELS[billingCycle as keyof typeof BILLING_CYCLE_LABELS] ||
    billingCycle;

  const handleSaveDescription = async () => {
    if (!groupId) return;
    await updateDescMutation.mutateAsync(descValue);
    setIsEditingDesc(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-indigo-500/10 p-6 sm:p-8 backdrop-blur-md dark:from-brand-accent/10 dark:to-indigo-500/5 shadow-sm">
      <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 pointer-events-none">
        <RotateCw className="w-32 h-32 text-brand-accent" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                isCycleDone
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  : hasStarted
                  ? "bg-brand-accent/15 text-brand-accent"
                  : "bg-warning/15 text-warning"
              }`}
            >
              {isCycleDone ? (
                "Completed"
              ) : hasStarted ? (
                "Active"
              ) : (
                "Not Yet Started"
              )}
            </span>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
              {billingLabel} Cycle
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {name}
          </h1>

          {isEditingDesc ? (
            <div className="flex flex-col gap-2 mt-2">
              <textarea
                value={descValue}
                onChange={(e) => setDescValue(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Enter group description..."
                className="w-full text-xs p-3 rounded-xl border border-brand-accent/30 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveDescription}
                  disabled={updateDescMutation.isPending}
                  className="inline-flex items-center gap-1 bg-brand-accent hover:bg-brand-accent-hover text-background px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {updateDescMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setIsEditingDesc(false);
                    setDescValue(description || "");
                  }}
                  className="inline-flex items-center gap-1 bg-neutral-table-stripe hover:bg-neutral-border text-foreground px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 group/desc">
              {description ? (
                <p className="text-sm text-neutral-subtext leading-relaxed">
                  {description}
                </p>
              ) : (
                <p className="text-sm text-neutral-subtext italic">
                  No description provided for this group.
                </p>
              )}
              {isOrganizer && !isCycleDone && (
                <button
                  onClick={() => setIsEditingDesc(true)}
                  className="p-1 rounded-lg hover:bg-neutral-subtext/10 text-neutral-subtext hover:text-brand-accent transition-colors cursor-pointer"
                  title="Edit Description (Organizer Admin)"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {isCycleDone ? (
          <div className="flex flex-col gap-1.5 bg-neutral-table-stripe/80 border border-neutral-border/80 p-4 rounded-2xl min-w-[240px] shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext flex items-center gap-1">
              <Lock className="w-3 h-3 text-neutral-subtext" /> Group Invite Closed
            </span>
            <span className="text-xs font-bold text-foreground">
              Invites Disabled
            </span>
            <span className="text-[10px] text-neutral-subtext leading-relaxed">
              This cycle has ended. New members cannot join completed groups.
            </span>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
