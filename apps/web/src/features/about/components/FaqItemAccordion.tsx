"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "../types/about.types";

interface FaqItemAccordionProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqItemAccordion({
  faq,
  isOpen,
  onToggle,
}: FaqItemAccordionProps) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-brand-accent bg-brand-accent/5"
          : "border-neutral-border/80 bg-neutral-table-stripe/80 hover:border-neutral-border"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left text-xs sm:text-sm font-extrabold text-foreground hover:text-brand-accent cursor-pointer transition-colors duration-200 gap-3"
      >
        <span>{faq.question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-subtext transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand-accent" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-neutral-subtext leading-relaxed border-t border-neutral-border/60 pt-3.5">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
