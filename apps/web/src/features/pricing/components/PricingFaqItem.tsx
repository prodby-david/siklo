import React from "react";
import { motion } from "framer-motion";
import { PricingFaqItemProps } from "../types/pricing.types";

export default function PricingFaqItem({ faq, idx }: PricingFaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      className="p-6 bg-background/80 backdrop-blur-md relative z-10 border border-neutral-border/60 rounded-2xl space-y-1.5 shadow-xs"
    >
      <h3 className="font-extrabold text-sm md:text-base text-foreground">
        {faq.question}
      </h3>
      <p className="text-xs md:text-sm text-neutral-subtext leading-relaxed">
        {faq.answer}
      </p>
    </motion.div>
  );
}
