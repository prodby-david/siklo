import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaqItem } from "../types/help.type";

type HelpFaqAccordionProps = {
  items: FaqItem[];
};

export default function HelpFaqAccordion({ items }: HelpFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border border-neutral-border/50 rounded-2xl bg-background overflow-hidden transition-all shadow-sm"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground text-xs sm:text-sm hover:bg-neutral-table-stripe/20 cursor-pointer transition-colors"
            >
              <span>{item.question}</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-brand-accent flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neutral-subtext flex-shrink-0" />
              )}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] border-t border-neutral-border/30" : "max-h-0"
              }`}
            >
              <div className="p-5 text-xs sm:text-sm text-neutral-subtext leading-relaxed bg-neutral-table-stripe/10">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <div className="text-center py-10 border border-dashed border-neutral-border/60 rounded-2xl">
          <p className="text-sm font-semibold text-foreground">No questions found</p>
        </div>
      )}
    </div>
  );
}
