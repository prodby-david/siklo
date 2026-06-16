import React from "react";

interface SelectFieldOption<T extends string | number> {
  label: string;
  value: T;
}

interface SelectFieldProps<T extends string | number> {
  label: string;
  options: readonly SelectFieldOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export const SelectField = <T extends string | number>({
  label,
  options,
  value,
  onChange,
}: SelectFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-subtext">{label}</label>
      <select
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          const parsed =
            typeof value === "number" ? (Number(raw) as T) : (raw as T);
          onChange(parsed);
        }}
        className="w-full text-xs p-2 border border-neutral-border rounded text-foreground bg-background font-medium focus:border-brand-accent focus:outline-hidden"
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
