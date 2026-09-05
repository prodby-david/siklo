"use client";

import { useState } from "react";
import CycleCards from "../components/cards/CycleCards";
import { Layers } from "lucide-react";

export default function ActiveCycleSection() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              Paluwagan Circles
            </h3>
            <span className="text-[11px] text-neutral-subtext">
              Quick access to your savings groups
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center p-1 bg-neutral-table-stripe rounded-2xl border border-neutral-border/60 text-xs">
            <button
              onClick={() => setSelectedStatus("ALL")}
              className={`px-3 py-1 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                selectedStatus === "ALL"
                  ? "bg-brand-accent text-brand-accent-foreground shadow-2xs"
                  : "text-neutral-subtext hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus("ACTIVE")}
              className={`px-3 py-1 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                selectedStatus === "ACTIVE"
                  ? "bg-brand-accent text-brand-accent-foreground shadow-2xs"
                  : "text-neutral-subtext hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setSelectedStatus("PENDING")}
              className={`px-3 py-1 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                selectedStatus === "PENDING"
                  ? "bg-brand-accent text-brand-accent-foreground shadow-2xs"
                  : "text-neutral-subtext hover:text-foreground"
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      <CycleCards statusFilter={selectedStatus} />
    </div>
  );
}
