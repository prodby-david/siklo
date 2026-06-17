type InputProps = {
  label: string;
  placeholder: string;
  register: any;
  errors: any;
  icon: React.ReactNode;
  type: string;
  labelText: string;
};

export default function Input({
  label,
  placeholder,
  register,
  errors,
  icon,
  type,
  labelText,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label
        htmlFor={label}
        className="text-xs font-bold text-neutral-subtext uppercase tracking-wider"
      >
        {labelText}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
          {icon}
        </span>
        <input
          {...register(label)}
          type={type}
          id={label}
          name={label}
          placeholder={placeholder}
          className={`w-full pl-9 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 ${
            errors[label]
              ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
              : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
          }`}
        />
      </div>
      {errors[label] && (
        <p className="text-danger text-xs">{errors[label]?.message}</p>
      )}
    </div>
  );
}
