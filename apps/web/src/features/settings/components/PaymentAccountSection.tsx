import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import { FormInput as Input } from "@/shared/components/inputs";
import type { PaymentAccountSectionConfig } from "../types/payment-settings.types";

interface PaymentAccountSectionProps {
  config: PaymentAccountSectionConfig;
  values: PaymentAccountDetailsDTO;
  hasSavedValue: boolean;
  isEditing: boolean;
  onChange: (field: keyof PaymentAccountDetailsDTO, value: string) => void;
  onToggleEditing: () => void;
}

export default function PaymentAccountSection({
  config,
  values,
  hasSavedValue,
  isEditing,
  onChange,
  onToggleEditing,
}: PaymentAccountSectionProps) {
  const SectionIcon = config.icon;

  return (
    <section className="space-y-4 rounded-2xl border border-neutral-border/50 bg-neutral-table-stripe/60 p-4">
      <div className="flex items-center justify-between border-b border-neutral-border/50 pb-2">
        <div className="flex items-center gap-2">
          <SectionIcon className="h-4 w-4 text-brand-accent" />
          <h4 className="text-xs font-bold text-foreground">{config.title}</h4>
        </div>
        {hasSavedValue && (
          <button
            type="button"
            onClick={onToggleEditing}
            className="cursor-pointer text-xs font-semibold text-brand-accent hover:underline"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {config.fields.map((field) => {
          const FieldIcon = field.icon;

          return (
            <Input
              key={field.name}
              id={field.name}
              labelText={field.label}
              type="text"
              inputMode={field.inputMode}
              maxLength={field.maxLength}
              disabled={hasSavedValue && !isEditing}
              value={values[field.name] || ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              placeholder={field.placeholder}
              icon={<FieldIcon className="h-4 w-4 text-brand-accent" />}
            />
          );
        })}
      </div>
    </section>
  );
}
