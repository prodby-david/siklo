import React from "react";
import { motion } from "framer-motion";
import BestPracticeItem from "./BestPracticeItem";
import { BestPracticesListProps } from "../types/howitworks.types";

export default function BestPracticesList({
  practices,
}: BestPracticesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="lg:col-span-6 flex flex-col gap-5"
    >
      <h4 className="text-base font-extrabold text-foreground pb-2 border-b border-neutral-border/60">
        Best Practices for Organizers & Members
      </h4>

      <div className="flex flex-col gap-3">
        {practices.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <BestPracticeItem practice={item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
