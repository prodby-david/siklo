import React from "react";

interface InputFieldProps {
  label: string;
  type?: "text" | "number";
  value: string | number;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const InputField = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-subtext">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs p-2 border border-neutral-border rounded-2xl text-foreground bg-background font-medium focus:border-brand-accent focus:outline-hidden"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
