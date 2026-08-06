"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileWarning } from "lucide-react";
import { TRADITIONAL_DRAWBACKS, SIKLO_ADVANTAGES } from "../constants/hero.constants";
import ComparisonCard from "./ComparisonCard";

export default function PaluwaganComparisonSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-transparent relative z-10 border-b border-neutral-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl mb-12 sm:mb-16 text-center flex flex-col items-center gap-3.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Traditional vs Digital Paluwagan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Why upgrade your Paluwagan to{" "}
            <span className="text-brand-accent">Siklo</span>?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-xl">
            Ditch paper notebooks, messy spreadsheets, and awkward chats. Siklo
            brings 100% shared visibility and automated schedules to every round.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
          <ComparisonCard
            title="Traditional Paper / Spreadsheets"
            subtitle="The Old Risky Way"
            icon={<FileWarning className="h-5 w-5 text-danger" />}
            items={TRADITIONAL_DRAWBACKS}
            variant="drawback"
            direction={-30}
            rotation={-1}
          />

          <ComparisonCard
            title="Siklo Digital Ledger"
            subtitle="The Modern Smart Way"
            icon={<ShieldCheck className="h-5 w-5 text-brand-accent" />}
            items={SIKLO_ADVANTAGES}
            variant="advantage"
            direction={30}
            rotation={1}
          />
        </div>
      </div>
    </section>
  );
}
