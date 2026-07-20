"use client";

import { Users, Shield, Calendar, Lock } from "lucide-react";
import formatDate from "@/shared/utils/formatDate";
import { BILLING_CYCLE_DAYS } from "../../constants/billing-cycle.constants";

interface User {
  id: string;
  name: string;
}

interface Membership {
  userId: string;
  position: number;
  joinedAt?: string | Date;
  user: User;
}

interface GroupCycleMembersProps {
  memberships?: Membership[];
  organizerId: string;
  startDate?: string | Date | null;
  billingCycle: string;
}

export default function GroupCycleMembers({
  memberships,
  organizerId,
  startDate,
  billingCycle,
}: GroupCycleMembersProps) {
  const sortedMemberships = memberships
    ? [...memberships].sort((a, b) => a.position - b.position)
    : [];

  const getPayoutDate = (position: number) => {
    if (!startDate) return null;
    const start = new Date(startDate);
    const daysPerCycle = BILLING_CYCLE_DAYS[billingCycle as keyof typeof BILLING_CYCLE_DAYS] || 1;
    const addedDays = (position - 1) * daysPerCycle;
    return new Date(start.getTime() + addedDays * 24 * 60 * 60 * 1000);
  };

  return (
    <div className="p-6 border border-neutral-border rounded-2xl bg-background shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3">
        <h3 className="text-md font-bold text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-accent" /> Cycle Members
        </h3>
        <span className="text-xs text-brand-accent font-medium bg-brand-accent/10 px-2.5 py-1 rounded-2xl border border-brand-accent/20 flex items-center gap-1.5 animate-siklo-float">
          <Lock className="w-3.5 h-3.5" /> Cycle Active
        </span>
      </div>

      <div className="space-y-3">
        {sortedMemberships.map((membership) => {
          const isOrganizer = membership.userId === organizerId;
          const initials = membership.user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
          const payoutDate = getPayoutDate(membership.position);

          return (
            <div
              key={membership.userId}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-neutral-border bg-background hover:bg-neutral-subtext/5 transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-gradient-to-tr from-brand-accent to-brand-accent-hover text-background shadow-sm">
                    {initials}
                  </div>
                  <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] bg-foreground text-background border-2 border-background">
                    {membership.position}
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">
                      {membership.user.name}
                    </span>
                    {isOrganizer ? (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/15 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Shield className="w-2.5 h-2.5" /> Organizer
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext/60 border border-neutral-border px-2 py-0.5 rounded-full">
                        Member
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-subtext flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" /> Joined {membership.joinedAt ? formatDate(membership.joinedAt) : "N/A"}
                  </span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-[10px] font-medium text-neutral-subtext block">
                  Payout Date
                </span>
                <span className="text-xs font-bold text-foreground block">
                  {payoutDate ? formatDate(payoutDate) : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
