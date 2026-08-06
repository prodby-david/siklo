import React from "react";
import { Check, X, PhilippinePeso, Users } from "lucide-react";
import { ReceivedInviteCardProps } from "../types/invites.types";

export default function ReceivedInviteCard({
  item,
  onAccept,
  onDecline,
}: ReceivedInviteCardProps) {
  return (
    <div className="p-6 bg-background border border-neutral-border rounded-2xl shadow-sm flex flex-col justify-between gap-4 hover:border-brand-accent/30 transition-all group">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-accent">
            {item.billingCycle} Cycle
          </span>
          <span className="text-[10px] text-neutral-subtext font-medium bg-neutral-subtext/5 px-2 py-0.5 rounded-2xl border border-neutral-border/50">
            Invite Received
          </span>
        </div>

        <div>
          <p className="font-extrabold text-base text-foreground group-hover:text-brand-accent transition-colors">
            {item.name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-border/50">
          <div>
            <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
              Contribution
            </span>
            <p className="flex items-center gap-0.5 font-bold text-sm text-foreground mt-0.5">
              <PhilippinePeso className="w-3.5 h-3.5" />
              {item.contributionAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
              Slots
            </span>
            <p className="flex items-center gap-1 font-bold text-sm text-foreground mt-0.5">
              <Users className="w-3.5 h-3.5 text-neutral-subtext" />
              {item._count?.memberships ?? 0} / {item.maxMembers}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-neutral-border/50">
        <button
          type="button"
          onClick={() => onAccept(item.id)}
          className="flex-1 flex items-center justify-center gap-1 text-xs font-bold text-background bg-brand-accent hover:bg-brand-accent-hover py-2.5 px-4 rounded-2xl transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <Check className="w-4 h-4" /> Accept & Join Group
        </button>
        <button
          type="button"
          onClick={() => onDecline(item.id)}
          className="flex items-center justify-center gap-1 text-xs font-bold text-neutral-subtext hover:text-foreground bg-neutral-table-stripe hover:bg-neutral-subtext/10 py-2.5 px-4 rounded-2xl transition-all active:scale-95 cursor-pointer border border-neutral-border/50"
        >
          <X className="w-4 h-4" /> Decline
        </button>
      </div>
    </div>
  );
}
