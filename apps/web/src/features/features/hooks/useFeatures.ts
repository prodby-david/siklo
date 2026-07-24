"use client";

import { useState, useMemo } from "react";
import { FeatureCategory, FeatureItem } from "../types/features.types";
import { defaultFeatures } from "../constants/features.constants";

export function useFeatures(initialFeatures: FeatureItem[] = defaultFeatures) {
  const [activeCategory, setActiveCategory] = useState<FeatureCategory>("all");

  const filteredFeatures = useMemo(() => {
    if (activeCategory === "all") return initialFeatures;
    return initialFeatures.filter(
      (feature) => feature.category === activeCategory
    );
  }, [activeCategory, initialFeatures]);

  return {
    activeCategory,
    setActiveCategory,
    filteredFeatures,
  };
}

export default useFeatures;
