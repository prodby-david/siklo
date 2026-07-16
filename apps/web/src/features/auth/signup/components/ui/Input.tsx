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
    <div className="flex flex-col gap-1 flex-1">
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
            {icon}
          </span>
        )}
        <input
          id={label || props.id}
          name={label || props.name}
          placeholder={placeholder}
          type={type}
          className={`w-full py-2 text-xs border rounded-2xl focus:outline-none focus:ring-1 ${
            icon ? "pl-9" : "px-3"
          } ${
            hasError
              ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
              : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
          } ${className || ""}`}
          {...registerProps}
          {...props}
        />
      </div>
      {hasError && (
        <p className="text-danger text-xs">{errors[label]?.message}</p>
      )}
    </div>
  );
}
