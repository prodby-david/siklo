"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  BookOpen,
  Users,
  MessageSquare,
  History,
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  SunMoon,
  FileCheck,
  Shuffle,
  BellRing,
  FileText,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import { FeatureItem } from "../types/features.types";

const iconMap: Record<string, LucideIcon> = {
  RotateCcw,
  BookOpen,
  Users,
  MessageSquare,
  History,
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  SunMoon,
  FileCheck,
  Shuffle,
  BellRing,
  FileText,
};

export default function FeatureCard({ feature }: { feature: FeatureItem }) {
  const IconComponent = iconMap[feature.iconName] || HelpCircle;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative z-10 flex flex-col justify-between gap-5 p-5 sm:p-6 bg-background border border-neutral-border rounded-2xl hover:border-brand-accent/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full min-h-[220px] flex-1"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-accent/10 transition-colors duration-300" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-brand-accent/15 border border-brand-accent/25 text-brand-accent group-hover:scale-105 transition-transform duration-300 shrink-0">
            <IconComponent className="h-5 w-5" />
          </div>

          {feature.highlightBadge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
              {feature.highlightBadge}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
            {feature.subtitle}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-brand-accent transition-colors duration-200">
            {feature.title}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed mt-1">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
