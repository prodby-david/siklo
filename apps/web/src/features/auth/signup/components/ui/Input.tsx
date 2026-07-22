import React from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  register?: (name: never, options?: never) => Record<string, unknown>;
  errors?: Record<string, { message?: string }>;
  icon?: React.ReactNode;
  type?: string;
  labelText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label = "",
  placeholder = "",
  register,
  errors = {},
  icon,
  type = "text",
  labelText,
  className,
  ...props
}: InputProps) {
  const registerProps = register && label ? register(label as never) : {};
  const hasError = label && errors && errors[label];

  return (
    <div className="flex flex-col gap-1.5 flex-1">
      {labelText !== "" && (
        <label
          htmlFor={label || props.id}
          className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider"
        >
          {labelText || label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-neutral-subtext pointer-events-none transition-colors duration-150">
            {icon}
          </span>
        )}
        <input
          id={label || props.id}
          name={label || props.name}
          placeholder={placeholder}
          type={type}
          className={`w-full py-2.5 text-xs font-medium border rounded-2xl transition-all duration-200 focus:outline-none ${
            icon ? "pl-10" : "px-3.5"
          } ${
            hasError
              ? "border-danger focus:ring-2 focus:ring-danger/20 focus:border-danger bg-danger-bg/10 text-foreground"
              : "border-neutral-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent bg-background/60 hover:border-brand-accent/30 focus:bg-background text-foreground placeholder:text-neutral-subtext/60"
          } ${className || ""}`}
          {...registerProps}
          {...props}
        />
      </div>
      {hasError && (
        <p className="text-danger text-[11px] font-medium mt-0.5">{errors[label]?.message}</p>
      )}
    </div>
  );
}

