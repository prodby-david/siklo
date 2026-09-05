import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { PhilippinePeso } from "lucide-react";
import Input from "@/shared/components/inputs/Input";
import type { CreateGroupData } from "../../validator/create-group.validator";
import getBoundedInteger from "../../utils/getBoundedInteger";

interface OrganizerFeeFieldProps {
  register: UseFormRegister<CreateGroupData>;
  setValue: UseFormSetValue<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
  isPending: boolean;
}

export default function OrganizerFeeField({
  register,
  setValue,
  errors,
  isPending,
}: OrganizerFeeFieldProps) {
  return (
    <Input
      label="organizerFeeAmount"
      labelText="One-Time Organizer Fee"
      placeholder="e.g. 100"
      type="number"
      min={0}
      max={1000}
      disabled={isPending}
      {...register("organizerFeeAmount", { valueAsNumber: true })}
      onKeyDown={(event) => {
        if ([".", ",", "-", "e", "E", "+"].includes(event.key)) {
          event.preventDefault();
        }
      }}
      onChange={(event) => {
        const value = getBoundedInteger(event.target.value, 0, 1000);
        setValue(
          "organizerFeeAmount",
          value as CreateGroupData["organizerFeeAmount"],
          { shouldValidate: true, shouldDirty: true },
        );
      }}
      errors={errors}
      icon={<PhilippinePeso className="h-4 w-4 text-brand-accent" />}
    />
  );
}
