import type { LucideIcon } from "lucide-react";

interface NotificationPreferenceRowProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isEnabled: boolean;
  onToggle: () => void;
}

export default function NotificationPreferenceRow({
  title,
  description,
  icon: PreferenceIcon,
  isEnabled,
  onToggle,
}: NotificationPreferenceRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-border bg-card p-4 transition-shadow duration-200 hover:shadow-sm">
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
          <PreferenceIcon className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-xs font-bold text-foreground">
            {title}
          </span>
          <span className="mt-0.5 block text-[11px] leading-relaxed text-neutral-subtext">
            {description}
          </span>
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-label={title}
        aria-checked={isEnabled}
        onClick={onToggle}
        className={`flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ${
          isEnabled ? "bg-brand-accent" : "bg-neutral-border"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-brand-accent-foreground shadow-xs transition-transform duration-200 ease-out ${
            isEnabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
