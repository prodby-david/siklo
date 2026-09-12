import { PhilippinePeso } from "lucide-react";
import Input from "@/shared/components/inputs/Input";
import type { CreateGroupData } from "../../validator/create-group.validator";
import type { OrganizerFeeFieldProps } from "../../types/create-group-field.types";
import getBoundedInteger from "../../utils/getBoundedInteger";

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
      type="text"
      inputMode="numeric"
      disabled={isPending}
      {...register("organizerFeeAmount", { valueAsNumber: true })}
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
