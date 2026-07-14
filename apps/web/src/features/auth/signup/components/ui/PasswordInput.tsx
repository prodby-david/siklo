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
    <div className="flex flex-col gap-1 flex-1">
      {labelText !== "" && (
        <label
          htmlFor={label || props.id}
          className="text-xs font-bold text-neutral-subtext uppercase tracking-wider"
        >
          {labelText || label}
        </label>
      )}
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
          type={showPassword ? "text" : "password"}
          className={`w-full py-2 text-xs border rounded-2xl focus:outline-none focus:ring-1 ${
            icon ? "pl-9" : "px-3"
          } pr-10 ${
            hasError
              ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
              : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
          } ${props.className || ""}`}
          {...registerProps}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-subtext hover:text-foreground focus:outline-none cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {hasError && (
        <p className="text-danger text-xs">{errors[label]?.message}</p>
      )}
    </div>
  );
}
