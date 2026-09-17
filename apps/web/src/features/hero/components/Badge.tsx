import React from "react";
import { ChevronRight } from "lucide-react";
import type { BadgeProps } from "../types/hero.types";

export const Badge = ({ text, linkText, href }: BadgeProps) => {
  const content = (
    <div className="inline-flex items-center gap-1.5 rounded-2xl border border-neutral-border bg-neutral-table-stripe px-2 py-0.5 text-xs font-medium text-neutral-subtext hover:bg-neutral-border/30">
      <span>{text}</span>
      {linkText && (
        <span className="flex items-center gap-0.5 text-brand-accent font-semibold ml-1">
          {linkText}
          <ChevronRight className="h-3 w-3" />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="inline-block hover:opacity-90"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default Badge;
