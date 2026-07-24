"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  BookOpen,
  Users,
  MessageSquare,
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
      className="group relative flex flex-col justify-between gap-5 p-6 sm:p-7 bg-background/90 backdrop-blur-xl border border-brand-accent/15 rounded-3xl hover:border-brand-accent/40 shadow-sm hover:shadow-lg hover:shadow-brand-accent/5 transition-colors duration-300 overflow-hidden h-full min-h-[240px] flex-1"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-accent/10 transition-colors duration-300" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-brand-accent/15 border border-brand-accent/25 text-brand-accent group-hover:scale-110 transition-transform duration-300 shrink-0">
            <IconComponent className="h-5 w-5" />
          </div>

          {feature.highlightBadge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
              {feature.highlightBadge}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 mt-1">
          <span className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
            {feature.subtitle}
          </span>
          <h4 className="text-base sm:text-lg font-extrabold text-foreground group-hover:text-brand-accent transition-colors duration-200">
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
