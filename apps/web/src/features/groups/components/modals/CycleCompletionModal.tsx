"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Trophy, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { CycleCompletionModalProps } from "../../types/group.types";

export default function CycleCompletionModal({
  isOpen,
  onClose,
  groupName,
  totalPayout,
  membersCount,
  cycleDuration,
}: CycleCompletionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-6 overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg relative z-10">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1 text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-xl font-extrabold text-foreground tracking-tight">
              Cycle Completed!
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext leading-relaxed">
                Congratulations! All turns and payout rounds for{" "}
                <strong className="text-foreground">{groupName}</strong> have been
                successfully verified and disbursed.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="w-full grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-neutral-subtext/5 border border-neutral-border/60">
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-background/80 border border-neutral-border/40">
              <span className="text-[10px] text-neutral-subtext font-semibold uppercase">
                Total Pool
              </span>
              <span className="text-xs sm:text-sm font-black text-brand-accent mt-0.5">
                ₱{totalPayout.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-background/80 border border-neutral-border/40">
              <span className="text-[10px] text-neutral-subtext font-semibold uppercase">
                Members
              </span>
              <span className="text-xs sm:text-sm font-black text-foreground mt-0.5">
                {membersCount}
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-background/80 border border-neutral-border/40">
              <span className="text-[10px] text-neutral-subtext font-semibold uppercase">
                Cycles Done
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {cycleDuration} of {cycleDuration}
              </span>
            </div>
          </div>

          <div className="w-full flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Smart ledger validated. 100% on-time payout track record achieved!</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover text-background font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <span>View Final Ledger</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
