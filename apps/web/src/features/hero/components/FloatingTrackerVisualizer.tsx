"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HandCoins,
  Wallet,
  ShieldCheck,
  Coins,
  Users,
  BellRing,
} from "lucide-react";
import { Member, CycleStats } from "../types/hero.types";
import { defaultStats } from "@/shared/constants/sampleData";

interface FloatingTrackerVisualizerProps {
  members?: Member[];
  stats?: CycleStats;
}

const getOvalKeyframes = (startAngleDeg: number, rx: number, ry: number) => {
  const steps = 48;
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = ((startAngleDeg + (i * 360) / steps) * Math.PI) / 180;
    x.push(Math.round(Math.cos(angle) * rx * 10) / 10);
    y.push(Math.round(Math.sin(angle) * ry * 10) / 10);
  }
  return { x, y };
};

export const FloatingTrackerVisualizer = ({
  stats = defaultStats,
}: FloatingTrackerVisualizerProps) => {
  const items = [
    {
      id: "instant-payout",
      icon: HandCoins,
      label: "Instant Payout",
      value: "₱180,000 Total",
      accent: "text-brand-accent",
      startAngle: 0,
    },
    {
      id: "protection",
      icon: ShieldCheck,
      label: "Protection",
      value: "100% Guaranteed",
      accent: "text-brand-accent",
      startAngle: 60,
    },
    {
      id: "active-circle",
      icon: Users,
      label: "Active Circle",
      value: `${stats.activeMembersCount} Members`,
      accent: "text-brand-accent",
      startAngle: 120,
    },
    {
      id: "auto-reminders",
      icon: BellRing,
      label: "Auto Reminders",
      value: "Instant Logs",
      accent: "text-brand-accent",
      startAngle: 180,
    },
    {
      id: "rotation-mode",
      icon: Wallet,
      label: "Rotation Mode",
      value: "Auto Turn Order",
      accent: "text-brand-accent",
      startAngle: 240,
    },
    {
      id: "pot-status",
      icon: Coins,
      label: "Pot Status",
      value: `₱${stats.totalPool.toLocaleString()} Total`,
      accent: "text-brand-accent",
      startAngle: 300,
    },
  ];

  const rx = 460;
  const ry = 230;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-visible">
      {items.map((item) => {
        const IconComponent = item.icon;
        const keyframes = getOvalKeyframes(item.startAngle, rx, ry);

        return (
          <motion.div
            key={item.id}
            animate={{
              x: keyframes.x,
              y: keyframes.y,
            }}
            transition={{
              duration: 65,
              ease: "linear",
              repeat: Infinity,
            }}
            className="absolute pointer-events-auto shrink-0 flex"
          >
            <div className="group flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-card/90 border border-neutral-border/70 backdrop-blur-md shadow-xs hover:border-brand-accent/50 hover:scale-105 transition-all duration-300 cursor-pointer select-none whitespace-nowrap">
              <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25 shrink-0">
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="text-[9px] text-neutral-subtext block font-semibold">
                  {item.label}
                </span>
                <span className={`text-[11px] font-extrabold ${item.accent}`}>
                  {item.value}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingTrackerVisualizer;
