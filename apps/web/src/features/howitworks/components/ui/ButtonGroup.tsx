import React from "react";

interface ButtonGroupOption<T extends string | number> {
  label: string;
  value: T;
}

interface ButtonGroupProps<T extends string | number> {
  label: string;
  options: readonly ButtonGroupOption<T>[];
  value: T;
  columns?: number;
  onChange: (value: T) => void;
}

export const ButtonGroup = <T extends string | number>({
  label,
  options,
  value,
  columns = 3,
  onChange,
}: ButtonGroupProps<T>) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-subtext">{label}</label>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            className={`py-1.5 text-xs border rounded-2xl font-semibold ${
              value === opt.value
                ? "bg-brand-accent/10 border-brand-accent text-brand-accent"
                : "bg-background border-neutral-border text-neutral-subtext hover:bg-neutral-table-stripe"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
