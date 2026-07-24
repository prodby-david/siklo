"use client";

import React from "react";
import { Member, CycleStats } from "../types/hero.types";
import { defaultMembers, defaultStats } from "@/shared/constants/sampleData";
import { FloatingTrackerVisualizer } from "./FloatingTrackerVisualizer";

interface CycleVisualizerProps {
  members?: Member[];
  stats?: CycleStats;
  isSplashFinished?: boolean;
}

export const CycleVisualizer = ({
  members = defaultMembers,
  stats = defaultStats,
  isSplashFinished = true,
}: CycleVisualizerProps) => {
  return (
    <FloatingTrackerVisualizer
      members={members}
      stats={stats}
      isSplashFinished={isSplashFinished}
    />
  );
};

export default CycleVisualizer;
