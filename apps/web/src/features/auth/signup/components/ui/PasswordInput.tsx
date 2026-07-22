import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  label?: string;
  labelText?: string;
  placeholder?: string;
  register?: (name: never, options?: never) => Record<string, unknown>;
  errors?: Record<string, { message?: string }>;
  icon?: React.ReactNode;
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({
  label = "",
  labelText,
  placeholder = "",
  register,
  errors = {},
  icon,
  showPassword: externalShowPassword,
  setShowPassword: externalSetShowPassword,
  ...props
}: PasswordInputProps) {
  const [internalShowPassword, setInternalShowPassword] = useState(false);

  const showPassword = externalShowPassword !== undefined ? externalShowPassword : internalShowPassword;
  const setShowPassword = externalSetShowPassword || setInternalShowPassword;

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
          type={showPassword ? "text" : "password"}
          className={`w-full py-2.5 text-xs font-medium border rounded-2xl transition-all duration-200 focus:outline-none ${
            icon ? "pl-10" : "px-3.5"
          } pr-10 ${
            hasError
              ? "border-danger focus:ring-2 focus:ring-danger/20 focus:border-danger bg-danger-bg/10 text-foreground"
              : "border-neutral-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent bg-background/60 hover:border-brand-accent/30 focus:bg-background text-foreground placeholder:text-neutral-subtext/60"
          } ${props.className || ""}`}
          {...registerProps}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-neutral-subtext hover:text-foreground focus:outline-none cursor-pointer transition-colors p-1 rounded-lg hover:bg-neutral-border/40"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {hasError && (
        <p className="text-danger text-[11px] font-medium mt-0.5">{errors[label]?.message}</p>
      )}
    </div>
  );
}

