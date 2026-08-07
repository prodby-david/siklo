import React from "react";
import { motion } from "framer-motion";
import { ComparisonCardProps } from "../types/hero.types";

export default function ComparisonCard({
  title,
  subtitle,
  icon,
  items,
  variant,
  direction,
  rotation,
}: ComparisonCardProps) {
  const isAdvantage = variant === "advantage";

  return (
    <motion.div
      initial={{ opacity: 0, x: direction, rotate: rotation }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 relative overflow-hidden ${
        isAdvantage
          ? "bg-gradient-to-b from-brand-accent/15 via-background to-background border-brand-accent/30"
          : "bg-background/90 border-neutral-border/80"
      }`}
    >

      <div>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-border/60">
          <div
            className={`flex items-center justify-center w-11 h-11 rounded-2xl border ${
              isAdvantage
                ? "bg-brand-accent/20 text-brand-accent border-brand-accent/30"
                : "bg-danger/10 text-danger border-danger/20"
            }`}
          >
            {icon}
          </div>
          <div>
            <span
              className={`text-[10px] font-extrabold uppercase tracking-widest block ${
                isAdvantage ? "text-brand-accent" : "text-danger"
              }`}
            >
              {subtitle}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
              {title}
            </h3>
          </div>
        </div>

        <ul className="space-y-3.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {item.icon}
              <span
                className={`text-xs sm:text-sm font-medium leading-normal ${
                  isAdvantage
                    ? "text-foreground"
                    : "text-neutral-subtext line-through decoration-neutral-subtext/40"
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
