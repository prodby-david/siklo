"use client";

import React from "react";
import { Member, CycleStats } from "../types/hero.types";
import { defaultMembers, defaultStats } from "@/shared/constants/sampleData";
import { FloatingTrackerVisualizer } from "./FloatingTrackerVisualizer";

interface CycleVisualizerProps {
  members?: Member[];
  stats?: CycleStats;
}

export const CycleVisualizer = ({
  members = defaultMembers,
  stats = defaultStats,
}: CycleVisualizerProps) => {
<<<<<<< HEAD
  return <FloatingTrackerVisualizer members={members} stats={stats} />;
=======
  const sortedMembers = [...members].sort(
    (a, b) => a.payoutTurn - b.payoutTurn,
  );

  return (
    <div className="rounded-2xl border border-neutral-border bg-background p-5 w-full">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            Payment & Payout Tracker
          </h3>
          <p className="text-xs text-neutral-subtext">
            Monthly Savings • Round {stats.activeMembersCount - 3} of{" "}
            {stats.activeMembersCount}
          </p>
        </div>
        <div className="rounded-2xl bg-brand-accent/10 px-2 py-0.5 text-xs font-bold text-brand-accent">
          Collected: ₱{stats.totalPool.toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-neutral-subtext">
          Turn Order & Status
        </span>
        <div className="flex flex-col divide-y divide-neutral-border">
          {sortedMembers.map((member) => {
            const isCurrent = member.status === "current";
            const isPaid = member.status === "paid";

            return (
              <div
                key={member.id}
                className={`flex items-center justify-between py-2.5 ${
                  isCurrent
                    ? "bg-neutral-table-stripe/50 px-2 -mx-2 rounded-2xl"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 px-1.5 shrink-0 items-center justify-center rounded-2xl text-xs font-bold ${
                      isCurrent
                        ? "bg-brand-accent text-white"
                        : isPaid
                          ? "bg-brand-accent/15 text-brand-accent"
                          : "bg-neutral-table-stripe text-neutral-subtext"
                    }`}
                  >
                    Turn {member.payoutTurn}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground">
                      {member.name}
                    </span>
                    <span className="text-xs text-neutral-subtext font-normal">
                      Receives ₱
                      {(
                        member.contributionAmount * stats.activeMembersCount
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-2xl flex items-center gap-1 ${
                      isPaid
                        ? "text-brand-accent bg-brand-accent/10 border border-brand-accent/30"
                        : isCurrent
                          ? "text-brand-accent bg-brand-accent/10 border border-brand-accent/30"
                          : "text-neutral-subtext bg-neutral-table-stripe border border-neutral-border"
                    }`}
                  >
                    {isPaid ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-brand-accent" />
                        <span>Paid</span>
                      </>
                    ) : isCurrent ? (
                      <>
                        <BellRing className="h-3 w-3 text-brand-accent animate-pulse" />
                        <span>Receiving Now</span>
                      </>
                    ) : (
                      <>
                        <Hourglass className="h-3 w-3 text-neutral-subtext" />
                        <span>Waiting Turn</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
>>>>>>> master
};

export default CycleVisualizer;
