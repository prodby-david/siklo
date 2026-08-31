"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Scale,
  UserCheck,
  FileCheck,
  History,
  Lock,
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
      id: "shared-transparency",
      icon: Eye,
      label: "Shared Transparency",
      value: "100% Open Ledger",
      accent: "text-brand-accent",
      startAngle: 0,
    },
    {
      id: "fair-rotation",
      icon: Scale,
      label: "Fair Rotation",
      value: "Equal Turn Order",
      accent: "text-brand-accent",
      startAngle: 60,
    },
    {
      id: "trusted-members",
      icon: UserCheck,
      label: "Trusted Members",
      value: `${stats.activeMembersCount} in Circle`,
      accent: "text-brand-accent",
      startAngle: 120,
    },
    {
      id: "payment-proof",
      icon: FileCheck,
      label: "Payment Proof",
      value: "Receipt Verified",
      accent: "text-brand-accent",
      startAngle: 180,
    },
    {
      id: "audit-trail",
      icon: History,
      label: "Audit Trail",
      value: "Real-Time Logs",
      accent: "text-brand-accent",
      startAngle: 240,
    },
    {
      id: "private-circle",
      icon: Lock,
      label: "Private Circle",
      value: "Invite-Only Access",
      accent: "text-brand-accent",
      startAngle: 300,
    },
  ];

  const rx = 460;
  const ry = 230;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const keyframes = getOvalKeyframes(item.startAngle, rx, ry);
        const entranceDelay = 0.6 + index * 0.15;

        return (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              scale: 0.6,
              x: keyframes.x[0],
              y: keyframes.y[0],
            }}
            animate={{
              opacity: 0.5,
              scale: 1,
              x: keyframes.x,
              y: keyframes.y,
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: entranceDelay,
                ease: "easeOut",
              },
              scale: {
                duration: 0.8,
                delay: entranceDelay,
                ease: "easeOut",
              },
              x: {
                duration: 65,
                ease: "linear",
                repeat: Infinity,
                delay: entranceDelay,
              },
              y: {
                duration: 65,
                ease: "linear",
                repeat: Infinity,
                delay: entranceDelay,
              },
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
