"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeatureCard from "../components/FeatureCard";
import FeatureCategoryFilter from "../components/FeatureCategoryFilter";
import { FeaturesSectionProps } from "../types/features.types";
import { defaultFeatures } from "../constants/features.constants";
import { useFeatures } from "../hooks/useFeatures";
import { Sparkles, PiggyBank } from "lucide-react";
import GetStartedButton from "@/shared/components/buttons/GetStartedButton";

export default function FeaturesSection({
  title = "Everything you need to run your savings group",
  subtitle = "Siklo brings transparency, automation, and peace of mind to Paluwagan cycles with powerful features built for Filipino savings circles.",
  features = defaultFeatures,
}: FeaturesSectionProps) {
  const { activeCategory, setActiveCategory, filteredFeatures } = useFeatures(features);

  return (
    <section className="w-full bg-background py-16 sm:py-24 flex items-center border-t border-neutral-border relative overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl mb-10 text-center flex flex-col items-center gap-3.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>App Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-xl">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <FeatureCategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                className="h-full flex flex-col"
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-14 flex items-center justify-center"
        >
          <GetStartedButton
            size="md"
            text="Start Your Savings Cycle"
            icon={<PiggyBank className="w-4 h-4" />}
          />
        </motion.div>
      </div>
    </section>
  );
}
