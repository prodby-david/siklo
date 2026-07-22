"use client";

import React, { useState } from "react";
import { Parallax } from "react-scroll-parallax";
import {
  Calculator,
  History,
  TrendingUp,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import useCalculator from "../hooks/useCalculator";
import { mockActivities } from "../constants/hero.constants";

export const SavingsRotationHub = () => {
  const {
    contribution,
    setContribution,
    membersCount,
    setMembersCount,
    interval,
    setInterval,
    totalPool,
    durationText,
    simulatedTurns,
  } = useCalculator();

  const [activeTab, setActiveTab] = useState<"all" | "payment" | "payout">("all");

  const filteredLogs = mockActivities.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <Parallax speed={-3} className="lg:col-span-7 w-full">
          <div className="rounded-3xl border border-neutral-border/80 bg-background/90 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex items-center justify-between border-b border-neutral-border/60 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 text-brand-accent">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                    Interactive Savings Rotation Simulator
                  </h3>
                  <p className="text-xs text-neutral-subtext">
                    Simulate group contributions, turn payouts, and schedules.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5" /> Instant Projection
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-subtext">
                    <span>Contribution per Member</span>
                    <span className="text-brand-accent font-black text-sm">
                      ₱{contribution.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-table-stripe rounded-full appearance-none cursor-pointer accent-brand-accent"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-subtext font-semibold">
                    <span>₱500</span>
                    <span>₱5,000</span>
                    <span>₱10,000</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-subtext">
                    <span>Group Size</span>
                    <span className="text-brand-accent font-black text-sm">
                      {membersCount} Members
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="15"
                    step="1"
                    value={membersCount}
                    onChange={(e) => setMembersCount(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-table-stripe rounded-full appearance-none cursor-pointer accent-brand-accent"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-subtext font-semibold">
                    <span>4 Members</span>
                    <span>10 Members</span>
                    <span>15 Members</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-neutral-subtext">
                    Contribution Cycle
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["weekly", "semi-monthly", "monthly"] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setInterval(freq)}
                        className={`py-2 text-xs font-bold border rounded-2xl transition-all ${
                          interval === freq
                            ? "bg-brand-accent text-white border-brand-accent"
                            : "bg-background border-neutral-border text-neutral-subtext hover:bg-neutral-table-stripe"
                        }`}
                      >
                        {freq === "semi-monthly"
                          ? "Semi-Monthly"
                          : freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-3xl bg-neutral-table-stripe/80 p-5 border border-neutral-border/70">
                <div className="grid grid-cols-2 gap-3 border-b border-neutral-border/50 pb-4">
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-subtext block uppercase tracking-wider">
                      Turn Lump Sum
                    </span>
                    <span className="text-xl font-black text-brand-accent block mt-0.5">
                      ₱{totalPool.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-subtext block uppercase tracking-wider">
                      Full Duration
                    </span>
                    <span className="text-sm font-bold text-foreground block mt-1.5">
                      {durationText}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-extrabold text-foreground">
                    Rotation Schedule Preview
                  </span>
                  <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto pr-1">
                    {simulatedTurns.map((turn) => (
                      <div
                        key={turn.turn}
                        className="flex items-center justify-between p-2.5 rounded-2xl bg-background border border-neutral-border/60 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent font-extrabold text-[10px]">
                            {turn.turn}
                          </span>
                          <span className="font-semibold text-foreground">
                            Turn {turn.turn} Payout
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-neutral-subtext">
                            {turn.date}
                          </span>
                          <span className="font-bold text-brand-accent">
                            ₱{turn.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Parallax>

        <Parallax speed={3} className="lg:col-span-5 w-full">
          <div className="rounded-3xl border border-neutral-border/80 bg-background/90 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex items-center justify-between border-b border-neutral-border/60 pb-5 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                    Live Audit Ledger
                  </h3>
                  <p className="text-xs text-neutral-subtext">
                    Transparent activity tracking for group members.
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              {(["all", "payment", "payout"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeTab === tab
                      ? "bg-foreground text-background"
                      : "bg-neutral-table-stripe text-neutral-subtext hover:bg-neutral-border/50"
                  }`}
                >
                  {tab === "all"
                    ? "All Activity"
                    : tab === "payment"
                    ? "Payments"
                    : "Payouts"}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredLogs.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-table-stripe/60 border border-neutral-border/50 hover:border-neutral-border transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-xs font-bold ${
                        item.type === "payment"
                          ? "bg-success-bg text-success border border-success/30"
                          : item.type === "payout"
                          ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/30"
                          : "bg-neutral-border/50 text-neutral-subtext"
                      }`}
                    >
                      {item.type === "payment" ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-foreground block">
                        {item.user}
                      </span>
                      <span className="text-[11px] text-neutral-subtext block">
                        {item.action}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {item.amount && (
                      <span className="text-xs font-black text-foreground block">
                        ₱{item.amount.toLocaleString()}
                      </span>
                    )}
                    <span className="text-[10px] text-neutral-subtext font-medium block">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Parallax>
      </div>
    </div>
  );
};

export default SavingsRotationHub;
