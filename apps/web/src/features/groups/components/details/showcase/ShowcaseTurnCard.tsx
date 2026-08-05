"use client";

import formatDate from "@/shared/utils/formatDate";
import { Check, Clock, User, ShieldCheck, Crown } from "lucide-react";
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
      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer ${
        isSelected
          ? "border-brand-accent bg-brand-accent/10 shadow-sm"
          : isPaid
          ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
          : isOrganizerSlot
          ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50"
          : "border-neutral-border hover:border-neutral-border/80 bg-background"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
            isPaid
              ? "bg-emerald-500 text-white"
              : isOrganizerSlot
              ? "bg-amber-500 text-white shadow-xs"
              : isCurrent
              ? "bg-brand-accent text-white shadow-xs"
              : "bg-neutral-subtext/10 text-neutral-subtext"
          }`}
        >
          #{position}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground truncate flex items-center gap-1.5">
            {membership?.user?.name || "Available Slot"}
          </p>
          <p className="text-[10px] text-neutral-subtext font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-subtext" />
            {calculatedDate ? formatDate(calculatedDate) : "Not started"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {isOrganizerSlot ? (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3 text-amber-500" /> Organizer
          </span>
        ) : isPaid ? (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Paid
          </span>
        ) : membership ? (
          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext bg-neutral-subtext/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <User className="w-3 h-3" /> Member
          </span>
        ) : (
          <span className="text-[9px] font-semibold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">
            Available
          </span>
        )}
      </div>
    </button>
  );
}
