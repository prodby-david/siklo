import React from "react";
import { Users } from "lucide-react";

interface ActiveGroupsCardProps {
  count: number;
}

export default function ActiveGroupsCard({ count }: ActiveGroupsCardProps) {
  return (
    <div className="p-5 sm:p-6 border border-neutral-border rounded-2xl w-full bg-background shadow-sm hover:border-brand-accent/30 transition-all duration-300 flex items-center justify-between col-span-1 sm:col-span-2 lg:col-span-1">
      <div className="flex flex-col gap-1 items-start">
        <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
          Active Groups
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
          {count}
        </p>
        <span className="text-[11px] text-neutral-subtext mt-2 font-semibold bg-neutral-subtext/5 px-2.5 py-0.5 rounded-2xl border border-neutral-border/50">
          Joined Paluwagans
        </span>
      </div>
      <div className="flex items-center justify-center w-12 h-12 bg-sky-500/10 rounded-full shrink-0">
        <Users className="w-6 h-6 text-sky-600" />
      </div>
    </div>
  );
}
