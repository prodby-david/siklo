"use client";

import React from "react";
import type { CycleVisualizerProps } from "../types/hero.types";
import { defaultMembers, defaultStats } from "@/shared/constants/sampleData";
import { FloatingTrackerVisualizer } from "./FloatingTrackerVisualizer";

export const CycleVisualizer = ({
  members = defaultMembers,
  stats = defaultStats,
}: CycleVisualizerProps) => {
  return (
    <FloatingTrackerVisualizer
      members={members}
      stats={stats}
    />
  );
};

export default CycleVisualizer;
