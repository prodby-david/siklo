import { Check } from "lucide-react";

interface OrganizerParticipationOptionProps {
  title: string;
  description: string;
  isSelected: boolean;
  isPending: boolean;
  onSelect: () => void;
}

export default function OrganizerParticipationOption({
  title,
  description,
  isSelected,
  isPending,
  onSelect,
}: OrganizerParticipationOptionProps) {
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={onSelect}
      className={`flex cursor-pointer items-start justify-between gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
        isSelected
          ? "border-brand-accent bg-brand-accent/10 text-foreground shadow-xs"
          : "border-neutral-border/80 bg-background text-neutral-subtext hover:border-neutral-border"
      }`}
    >
      <span className="space-y-0.5">
        <span className="block text-xs font-bold text-foreground">{title}</span>
        <span className="block text-[10px] text-neutral-subtext">
          {description}
        </span>
      </span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          isSelected
            ? "border-brand-accent bg-brand-accent text-brand-accent-foreground"
            : "border-neutral-border bg-background"
        }`}
      >
        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
      </span>
    </button>
  );
}
