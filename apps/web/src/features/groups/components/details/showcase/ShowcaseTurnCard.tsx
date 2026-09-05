"use client";

import formatDate from "@/shared/utils/formatDate";
import { Clock, CheckCircle2, Crown, ChevronRight, Award, HandCoins } from "lucide-react";
import { ShowcaseTurnCardProps } from "@/features/groups/types/showcase.types";

export default function ShowcaseTurnCard({
  position,
  membership,
  isSelected,
  isReceived = false,
  isDisbursed = false,
  isCurrent = false,
  hasStarted = false,
  calculatedDate,
  onSelect,
  organizerId,
}: ShowcaseTurnCardProps) {
  const isOrganizerSlot = membership && organizerId && membership.userId === organizerId;
  const isCurrentActive = Boolean(hasStarted && isCurrent);

  return (
    <button
      onClick={() => onSelect(position)}
      className={`w-full p-2.5 sm:p-3 rounded-2xl border transition-all text-left flex items-center justify-between gap-2.5 cursor-pointer ${
        isSelected
          ? "border-brand-accent bg-brand-accent/10 shadow-2xs"
          : isReceived
          ? "border-success/30 bg-success-bg hover:border-success/50"
          : isDisbursed
          ? "border-winner-payout/30 bg-winner-payout-bg hover:border-winner-payout/50"
          : isOrganizerSlot && !hasStarted
          ? "border-warning/30 bg-warning-bg hover:border-warning/50"
          : "border-neutral-border hover:border-neutral-border/80 bg-background"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
            isReceived
              ? "bg-success text-brand-accent-foreground"
              : isDisbursed
              ? "bg-winner-payout text-brand-accent-foreground shadow-2xs"
              : isCurrentActive
              ? "bg-brand-accent text-brand-accent-foreground shadow-2xs"
              : isOrganizerSlot && !hasStarted
              ? "bg-warning text-brand-accent-foreground shadow-2xs"
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
        {isReceived ? (
          <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-success">
            <CheckCircle2 className="h-2.5 w-2.5 text-success" /> Received
          </span>
        ) : isDisbursed ? (
          <span className="flex items-center gap-1 rounded-full border border-winner-payout/30 bg-winner-payout-bg px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-winner-payout">
            <HandCoins className="h-2.5 w-2.5 text-winner-payout" /> Disbursed
          </span>
        ) : isCurrentActive ? (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-accent bg-brand-accent/15 border border-brand-accent/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Award className="w-2.5 h-2.5 text-brand-accent" /> Receiving Now
          </span>
        ) : isOrganizerSlot && !hasStarted ? (
          <span className="flex items-center gap-1 rounded-full border border-warning/30 bg-warning-bg px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-warning">
            <Crown className="h-2.5 w-2.5 text-warning" /> Organizer
          </span>
        ) : membership ? (
          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext bg-neutral-subtext/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> Upcoming
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
