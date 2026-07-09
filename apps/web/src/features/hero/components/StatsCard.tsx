import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  description,
  trend,
  className = "",
}: StatsCardProps) => {
  return (
    <div
      className={`rounded-2xl border border-neutral-border bg-background p-4 ${className}`}
    >
      <p className="text-xs font-bold text-neutral-subtext">{title}</p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-xl font-bold text-foreground">{value}</span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-2xl px-1.5 py-0.5 text-xs font-bold ${
              trend.positive
                ? "bg-success-bg text-success"
                : "bg-danger-bg text-danger"
            }`}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-0.5 text-xs text-neutral-subtext">{description}</p>
      )}
    </div>
  );
};

export default StatsCard;
