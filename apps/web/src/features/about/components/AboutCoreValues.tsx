"use client";

import React from "react";
import { motion } from "framer-motion";
import { coreValues } from "../constants/about.constants";
import CoreValueCardItem from "./CoreValueCardItem";
import { Target } from "lucide-react";

export default function AboutCoreValues() {
  return (
    <div className="w-full flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold">
          <Target className="w-3.5 h-3.5" />
          <span>Our Core Pillars</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Built on Trust, Fairness & Clarity
        </h3>

        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
          The guiding principles behind Siklo to ensure every savings circle runs smoothly without stress.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreValues.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
          >
            <CoreValueCardItem item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
