"use client";

import React, { useState } from "react";
import {
  RotateCw,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  ShieldCheck,
  Coins,
} from "lucide-react";
import { defaultMembers } from "@/shared/constants/sampleData";

export const CycleTurnShowcase = () => {
  const [selectedTurn, setSelectedTurn] = useState<number>(3);

  return (
    <div className="w-full rounded-3xl border border-brand-accent/30 bg-background p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-border/60 pb-5 sm:pb-6 mb-6 sm:mb-8 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5 mb-1">
            <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/30">
              <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin-slow" />
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-foreground">
              Seamless Turn Rotations
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-subtext">
            See who gets paid next and track individual turn payouts effortlessly.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-table-stripe p-1.5 rounded-2xl border border-neutral-border/60 self-start md:self-auto">
          <span className="text-[11px] sm:text-xs font-bold text-brand-accent px-2.5 sm:px-3 py-1 bg-background rounded-xl border border-neutral-border/40">
            Round 3 of 6
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-subtext px-1.5 sm:px-2">
            ₱30,000 Payout Pool
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-3">
          <span className="text-[11px] sm:text-xs font-extrabold text-neutral-subtext uppercase tracking-wider">
            Group Member Turn Queue
          </span>

          <div className="flex flex-col gap-2.5">
            {defaultMembers.map((member) => {
              const isSelected = selectedTurn === member.payoutTurn;
              const isPaid = member.status === "paid";
              const isCurrent = member.status === "current";

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedTurn(member.payoutTurn)}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer gap-2.5 sm:gap-0 ${
                    isSelected
                      ? "bg-brand-accent/10 border-brand-accent scale-[1.01]"
                      : "bg-neutral-table-stripe border-neutral-border/80 hover:border-brand-accent/30 hover:bg-neutral-table-stripe/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-2xl text-xs font-black ${
                        isCurrent
                          ? "bg-brand-accent text-white"
                          : isPaid
                          ? "bg-success-bg text-success border border-success/30"
                          : "bg-neutral-border/60 text-neutral-subtext"
                      }`}
                    >
                      #{member.payoutTurn}
                    </span>

                    <div>
                      <span className="text-xs sm:text-sm font-extrabold text-foreground block">
                        {member.name}
                      </span>
                      <span className="text-[11px] sm:text-xs text-neutral-subtext block">
                        Contribution: ₱{member.contributionAmount.toLocaleString()} / cycle
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <span
                      className={`text-[10px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        isPaid
                          ? "text-success bg-success-bg border border-success/30"
                          : isCurrent
                          ? "text-brand-accent bg-brand-accent/15 border border-brand-accent/30"
                          : "text-neutral-subtext bg-neutral-border/40"
                      }`}
                    >
                      {isPaid ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Payout Complete
                        </>
                      ) : isCurrent ? (
                        <>
                          <Coins className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-accent" /> Receiving Now
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Up Next
                        </>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-subtext" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <div className="rounded-3xl bg-neutral-table-stripe p-5 sm:p-6 border border-neutral-border/80 flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between border-b border-neutral-border/60 pb-3.5 sm:pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                <span className="text-[11px] sm:text-xs font-extrabold text-foreground uppercase tracking-wider">
                  Turn #{selectedTurn} Details
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-success bg-success-bg/80 border border-success/30 px-2 sm:px-2.5 py-0.5 rounded-full">
                Verified Turn
              </span>
            </div>

            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-subtext font-medium">Turn Beneficiary</span>
                <span className="font-extrabold text-foreground">
                  {defaultMembers.find((m) => m.payoutTurn === selectedTurn)?.name || "Group Member"}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-subtext font-medium">Total Lump Sum</span>
                <span className="font-black text-brand-accent text-sm sm:text-base">
                  ₱30,000
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-subtext font-medium">Group Trust Guarantee</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Protected
                </span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-background border border-neutral-border/80 text-[11px] sm:text-xs text-neutral-subtext leading-relaxed">
              In Siklo, turns rotate automatically after every member contribution is verified. No manual calculations required.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleTurnShowcase;
