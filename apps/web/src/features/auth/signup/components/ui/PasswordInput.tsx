import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  label: string;
  labelText?: string;
  placeholder: string;
  register: any;
  errors: any;
  icon: React.ReactNode;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
};

export default function PasswordInput({
  label,
  labelText,
  placeholder,
  register,
  errors,
  icon,
  showPassword,
  setShowPassword,
}: PasswordInputProps) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label
        htmlFor={label}
        className="text-xs font-bold text-neutral-subtext uppercase tracking-wider"
      >
        {labelText ?? label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
          {icon}
        </span>
        <input
          {...register(label)}
          type={showPassword ? "text" : "password"}
          id={label}
          name={label}
          placeholder={placeholder}
          className={`w-full pl-9 pr-10 py-2 text-xs border rounded-2xl focus:outline-none focus:ring-1 ${
            errors[label]
              ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
              : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
          }`}
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
      {errors[label] && (
        <p className="text-danger text-xs">{errors[label]?.message}</p>
      )}
    </div>
  );
}
