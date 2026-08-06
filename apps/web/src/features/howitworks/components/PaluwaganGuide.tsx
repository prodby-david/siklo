"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { schemesData } from "../constants/schemes.constants";
import { bestPractices } from "../constants/howitworks.constants";
import PayoutSchemesGrid from "./PayoutSchemesGrid";
import BestPracticesList from "./BestPracticesList";

export default function PaluwaganGuide() {
  return (
    <div className="w-full flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Schemes & Best Practices</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Paluwagan Guide & Guidelines
        </h3>

        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
          Select the best turn scheme for your circle and follow community-proven best practices.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <PayoutSchemesGrid schemes={schemesData} />
        <BestPracticesList practices={bestPractices} />
      </div>
    </div>
  );
}
