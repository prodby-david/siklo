import React from "react";
import SectionBadge from "./SectionBadge";

interface SectionHeaderProps {
  badgeIcon?: React.ReactNode;
  badgeText?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  badgeIcon,
  badgeText,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`mx-auto max-w-3xl text-center flex flex-col items-center gap-3.5 ${className}`}
    >
      {badgeText && <SectionBadge icon={badgeIcon} text={badgeText} />}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
