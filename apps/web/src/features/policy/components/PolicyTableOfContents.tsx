import React from "react";
import { PolicyTableOfContentsProps } from "../types/policy.types";

export default function policyTableOfContents({
  sections,
  activeSection,
  onSectionClick,
}: PolicyTableOfContentsProps) {
  return (
    <aside className="lg:col-span-3 hidden lg:block relative z-10">
      <div className="sticky top-20 border border-neutral-border rounded-2xl p-5 bg-background shadow-sm">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
          Table of Contents
        </h2>
        <nav className="flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionClick(section.id)}
              className={`text-left text-xs py-1 transition-all cursor-pointer border-l-2 pl-3 ${
                activeSection === section.id
                  ? "text-brand-accent border-brand-accent font-semibold"
                  : "text-neutral-subtext border-transparent hover:text-brand-accent hover:border-brand-accent/50"
              }`}
            >
              {section.title}
            </button>
          ))}
          {sections.length === 0 && (
            <p className="text-xs text-neutral-subtext italic">
              No sections match search
            </p>
          )}
        </nav>
      </div>
    </aside>
  );
}
