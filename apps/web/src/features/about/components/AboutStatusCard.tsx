import React from "react";
import { Notebook } from "lucide-react";

export default function AboutStatusCard() {
  return (
    <div className="border border-brand-accent/25 rounded-3xl p-5 bg-card/80 backdrop-blur-xl flex flex-col gap-3 max-w-md transition-all duration-300 shadow-xs">
      <div className="flex justify-between items-center text-xs font-bold text-neutral-subtext pb-2.5 border-b border-brand-accent/15">
        <div className="flex items-center gap-2">
          <Notebook className="w-4 h-4 text-brand-accent" />
          <span className="text-foreground font-extrabold">Notebook Status</span>
        </div>
        <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-slow-pulse" />
      </div>

      <div className="flex justify-between text-xs font-semibold text-neutral-subtext">
        <span>Record Keeping:</span>
        <span className="text-brand-accent font-bold">Safe & Saved</span>
      </div>

      <div className="flex justify-between text-xs font-semibold text-neutral-subtext">
        <span>Payout Turns:</span>
        <span className="text-foreground font-extrabold">Fixed & Fair</span>
      </div>

      <div className="flex justify-between text-xs font-semibold text-neutral-subtext">
        <span>Group Rules:</span>
        <span className="text-foreground font-extrabold">Clear to Everyone</span>
      </div>
    </div>
  );
}
