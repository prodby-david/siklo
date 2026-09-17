import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface SidebarQuickAssistantProps {
  onNavigate?: () => void;
}

export default function SidebarQuickAssistant({ onNavigate }: SidebarQuickAssistantProps) {
  return (
    <div className="p-3.5 rounded-2xl bg-gradient-to-b from-brand-accent/10 to-brand-accent/5 border border-brand-accent/20 shadow-2xs space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-black text-foreground">
          Siklo Assistant
        </span>
      </div>

      <p className="text-[11px] text-neutral-subtext leading-relaxed">
        Need quick guidance on rotation schedules or group payouts?
      </p>

      <Link
        href="/chat"
        onClick={onNavigate}
        className="inline-flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-card border border-brand-accent/30 text-[11px] font-bold text-brand-accent hover:bg-brand-accent hover:text-brand-accent-foreground hover:border-brand-accent transition-all duration-150 cursor-pointer shadow-2xs group"
      >
        <span>Ask AI Assistant</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
