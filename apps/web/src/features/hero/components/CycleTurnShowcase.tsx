"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { defaultMembers } from "@/features/hero/constants/hero.mocks";
import ShowcaseTurnCard from "./ShowcaseTurnCard";
import ShowcaseMemberDetail from "./ShowcaseMemberDetail";

export default function CycleTurnShowcase() {
  const [selectedTurn, setSelectedTurn] = useState<number>(3);

  const handleSelectTurn = useCallback((turn: number) => {
    setSelectedTurn(turn);
  }, []);

  const selectedMember =
    defaultMembers.find((m) => m.payoutTurn === selectedTurn) ||
    defaultMembers[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl border border-brand-accent/30 bg-background/80 backdrop-blur-xl relative z-10 p-4 sm:p-8 overflow-hidden"
    >
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
            {defaultMembers.map((member) => (
              <ShowcaseTurnCard
                key={member.id}
                member={member}
                isSelected={selectedTurn === member.payoutTurn}
                onSelect={handleSelectTurn}
              />
            ))}
          </div>
        </div>

        <ShowcaseMemberDetail member={selectedMember} />
      </div>
    </motion.div>
  );
}
