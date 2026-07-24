"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { schemesData } from "../constants/schemes.constants";
import { bestPractices } from "../constants/howitworks.constants";
import PayoutSchemeItem from "./PayoutSchemeItem";
import BestPracticeItem from "./BestPracticeItem";

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
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col gap-5"
        >
          <h4 className="text-base font-extrabold text-foreground pb-2 border-b border-neutral-border/60">
            Understanding Payout Schemes
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schemesData.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <PayoutSchemeItem
                  title={scheme.title}
                  desc={scheme.desc}
                  icon={scheme.icon}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col gap-5"
        >
          <h4 className="text-base font-extrabold text-foreground pb-2 border-b border-neutral-border/60">
            Circle Best Practices
          </h4>

          <div className="flex flex-col gap-3.5">
            {bestPractices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <BestPracticeItem practice={practice} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
