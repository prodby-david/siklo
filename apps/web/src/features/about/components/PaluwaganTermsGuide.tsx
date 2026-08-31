"use client";

import React from "react";
import { motion } from "framer-motion";
import { paluwaganTermsList } from "../constants/about.constants";
import TermCardItem from "./TermCardItem";
import { BookOpen } from "lucide-react";

export default function PaluwaganTermsGuide() {
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
          <BookOpen className="w-3.5 h-3.5" />
          <span>Paluwagan Terms & Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Simple Words to Understand How It Works
        </h2>

        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
          Here is a simple explanation of the words we use so you always know how your savings group runs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paluwaganTermsList.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
          >
            <TermCardItem item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
