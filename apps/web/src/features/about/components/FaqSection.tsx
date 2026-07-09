"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../constants/about.constants";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-background rounded-2xl border border-neutral-border p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Frequently Asked Questions
        </h3>
        <p className="text-xs text-neutral-subtext">
          Everything you need to know about Siklo and Paluwagan systems.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen
                  ? "border-brand-accent bg-neutral-table-stripe/10"
                  : "border-neutral-border"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-4 text-left text-xs font-semibold text-foreground hover:bg-neutral-table-stripe/50 cursor-pointer transition-colors duration-300 ease-in-out"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-neutral-subtext transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 text-xs text-neutral-subtext leading-relaxed border-t border-neutral-border pt-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
