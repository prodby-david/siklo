import React from "react";
import { motion } from "framer-motion";
import PayoutSchemeItem from "./PayoutSchemeItem";
import { PayoutSchemesGridProps } from "../types/howitworks.types";

export default function PayoutSchemesGrid({
  schemes,
}: PayoutSchemesGridProps) {
  return (
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
        {schemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="h-full flex flex-col"
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
  );
}
