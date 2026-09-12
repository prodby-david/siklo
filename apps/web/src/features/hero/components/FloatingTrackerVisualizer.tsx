"use client";

import React from "react";
import { motion } from "framer-motion";
import type { FloatingTrackerVisualizerProps } from "../types/hero.types";
import { defaultStats } from "@/shared/constants/sampleData";
import { TRACKER_ITEMS } from "../constants/hero.constants";
import { getOvalKeyframes } from "../utils/hero.utils";

export const FloatingTrackerVisualizer = ({
  stats = defaultStats,
}: FloatingTrackerVisualizerProps) => {
  const rx = 460;
  const ry = 230;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
      {TRACKER_ITEMS.map((item, index) => {
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
                  {item.value(stats)}
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
