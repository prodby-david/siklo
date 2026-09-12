import type { PreparationGuideStepItemProps } from "../../../types/group.types";

export default function PreparationGuideStepItem({
  stepNumber,
  title,
  description,
  icon,
}: PreparationGuideStepItemProps) {
  return (
    <div className="h-full p-4 rounded-2xl border border-neutral-border bg-neutral-table-stripe/50 hover:border-brand-accent/40 transition-all flex flex-col justify-between gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-bold text-foreground">
          {stepNumber}. {title}
        </span>
      </div>
      <p className="text-[11px] text-neutral-subtext leading-relaxed">
        {description}
      </p>
    </div>
  );
}
