import React from "react";

interface SectionBadgeProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
}

export default function SectionBadge({
  icon,
  text,
  className = "",
}: SectionBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold ${className}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
