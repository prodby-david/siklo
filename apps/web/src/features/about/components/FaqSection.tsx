"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { faqs } from "../constants/about.constants";
import FaqItemAccordion from "./FaqItemAccordion";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full bg-background rounded-3xl border border-brand-accent/30 p-6 sm:p-10 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold self-start">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help & Support</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
          Frequently Asked Questions
        </h3>

        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-xl">
          Everything you need to know about Siklo and how our digital Paluwagan notebook works.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
          >
            <FaqItemAccordion
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
