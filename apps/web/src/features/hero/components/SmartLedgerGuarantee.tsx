"use client";

import React from "react";
import {
  Notebook,
  BellRing,
  Lock,
  Zap,
  CheckCircle,
  FileCheck2,
} from "lucide-react";

export const SmartLedgerGuarantee = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="rounded-3xl border border-brand-accent/20 bg-background backdrop-blur-xl p-5 sm:p-6 flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 hover:border-brand-accent/50 h-full">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/30">
          <Notebook className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-extrabold text-foreground mb-1">
            Digital Paluwagan Notebook
          </h4>
          <p className="text-xs text-neutral-subtext leading-relaxed">
            Ditch lost notebooks and messy spreadsheets. Keep member turns, payouts, and balances cleanly organized in one simple place.
          </p>
        </div>
        <div className="mt-auto pt-3 border-t border-neutral-border/50 flex items-center gap-1.5 text-xs font-bold text-brand-accent">
          <CheckCircle className="w-4 h-4" /> Always In Sync
        </div>
      </div>

      <div className="rounded-3xl border border-brand-accent/20 bg-background backdrop-blur-xl p-5 sm:p-6 flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 hover:border-brand-accent/50 h-full">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/30">
          <BellRing className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-extrabold text-foreground mb-1">
            Automated Reminders
          </h4>
          <p className="text-xs text-neutral-subtext leading-relaxed">
            Send friendly automated notifications to group members before payment due dates, keeping payments 99.4% on-time.
          </p>
        </div>
        <div className="mt-auto pt-3 border-t border-neutral-border/50 flex items-center gap-1.5 text-xs font-bold text-brand-accent">
          <Zap className="w-4 h-4" /> Zero Awkward Reminders
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-500/20 bg-background backdrop-blur-xl p-5 sm:p-6 flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 hover:border-emerald-500/50 h-full sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-extrabold text-foreground mb-1">
            Transparent & Tamper-Proof
          </h4>
          <p className="text-xs text-neutral-subtext leading-relaxed">
            Every payment record and payout collection is locked with group verification so everyone enjoys total peace of mind.
          </p>
        </div>
        <div className="mt-auto pt-3 border-t border-neutral-border/50 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <FileCheck2 className="w-4 h-4" /> 100% Honest Records
        </div>
      </div>
    </div>
  );
};

export default SmartLedgerGuarantee;
