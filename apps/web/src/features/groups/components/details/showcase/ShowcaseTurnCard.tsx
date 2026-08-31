"use client";

import formatDate from "@/shared/utils/formatDate";
import { Clock, User, ShieldCheck, Crown, ChevronRight } from "lucide-react";
import { ShowcaseTurnCardProps } from "@/features/groups/types/showcase.types";

export default function ShowcaseTurnCard({
  position,
  membership,
  isSelected,
  isPaid,
  isCurrent,
  calculatedDate,
  onSelect,
  organizerId,
}: ShowcaseTurnCardProps) {
  const isOrganizerSlot = membership && organizerId && membership.userId === organizerId;

  return (
    <button
      onClick={() => onSelect(position)}
      className={`w-full p-2.5 sm:p-3 rounded-2xl border transition-all text-left flex items-center justify-between gap-2.5 cursor-pointer ${
        isSelected
          ? "border-brand-accent bg-brand-accent/10 shadow-2xs"
          : isPaid
          ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
          : isOrganizerSlot
          ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50"
          : "border-neutral-border hover:border-neutral-border/80 bg-background"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
            isPaid
              ? "bg-emerald-500 text-white"
              : isOrganizerSlot
              ? "bg-amber-500 text-white shadow-2xs"
              : isCurrent
              ? "bg-brand-accent text-white shadow-2xs"
              : "bg-neutral-subtext/10 text-neutral-subtext"
          }`}
        >
          #{position}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground truncate flex items-center gap-1">
            {membership?.user?.name || "Available Slot"}
          </p>
          <p className="text-[10px] text-neutral-subtext font-medium flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-neutral-subtext" />
            {calculatedDate ? formatDate(calculatedDate) : "Not started"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {isPaid ? (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5" /> Paid
          </span>
        ) : isCurrent ? (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-accent bg-brand-accent/15 border border-brand-accent/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-brand-accent" /> Active
          </span>
        ) : isOrganizerSlot ? (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Crown className="w-2.5 h-2.5 text-amber-500" /> Organizer
          </span>
        ) : membership ? (
          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext bg-neutral-subtext/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <User className="w-2.5 h-2.5" /> Upcoming
          </span>
        ) : (
          <span className="text-[9px] font-semibold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">
            Available
          </span>
        )}
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform duration-150 ${
            isSelected
              ? "text-brand-accent translate-x-0.5"
              : "text-neutral-subtext/60"
          }`}
        />
      </div>
    </button>
  );
}
