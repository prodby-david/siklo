import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Award, ChevronRight } from "lucide-react";
import { ShowcaseTurnCardProps } from "../types/hero.types";

export default function ShowcaseTurnCard({
  member,
  isSelected,
  onSelect,
}: ShowcaseTurnCardProps) {
  const isPaid = member.status === "paid";
  const isCurrent = member.status === "current";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onSelect(member.payoutTurn)}
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer gap-2.5 sm:gap-0 ${
        isSelected
          ? "bg-brand-accent/10 border-brand-accent scale-[1.01]"
          : "bg-background border-neutral-border/60 hover:border-brand-accent/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-xl font-extrabold text-xs shrink-0 ${
            isCurrent
              ? "bg-brand-accent text-white"
              : isPaid
              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
              : "bg-neutral-subtext/10 text-neutral-subtext"
          }`}
        >
          #{member.payoutTurn}
        </div>

        <div>
          <h4 className="text-xs sm:text-sm font-bold text-foreground">
            {member.name}
          </h4>
          <span className="text-[11px] text-neutral-subtext font-medium">
            Turn #{member.payoutTurn} • ₱
            {member.contributionAmount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2.5">
        <div className="flex items-center gap-1.5">
          {isPaid && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> Paid
            </span>
          )}
          {isCurrent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-accent text-white text-[10px] font-extrabold shadow-xs">
              <Award className="w-3 h-3" /> Receiving Now
            </span>
          )}
          {!isPaid && !isCurrent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-subtext/10 text-neutral-subtext text-[10px] font-bold">
              <Clock className="w-3 h-3" /> Upcoming
            </span>
          )}
        </div>

        <ChevronRight className="w-4 h-4 text-neutral-subtext shrink-0" />
      </div>
    </motion.div>
  );
}
