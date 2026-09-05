import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Crown } from "lucide-react";
import type { CreateGroupData } from "../../validator/create-group.validator";
import OrganizerParticipationOption from "./OrganizerParticipationOption";
import OrganizerFeeField from "./OrganizerFeeField";

interface OrganizerParticipationSelectorProps {
  control: Control<CreateGroupData>;
  isPending: boolean;
  register: UseFormRegister<CreateGroupData>;
  setValue: UseFormSetValue<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
}

export default function OrganizerParticipationSelector({
  control,
  isPending,
  register,
  setValue,
  errors,
}: OrganizerParticipationSelectorProps) {
  const isOrganizerParticipating = useWatch({
    control,
    name: "isOrganizerParticipating",
    defaultValue: true,
  });
  const isParticipating = isOrganizerParticipating !== false;
  const selectParticipation = (value: boolean) => {
    setValue("isOrganizerParticipating", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (value) {
      setValue("organizerFeeAmount", 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Crown className="h-4 w-4 text-warning" />
          <span>Organizer Cycle Participation</span>
        </label>
        <p className="text-[10px] text-neutral-subtext">
          Choose whether you will participate as a saver in the rotation or
          purely manage the cycle.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <OrganizerParticipationOption
          title="Participating Saver"
          description="Save, contribute, & receive a payout turn in rotation"
          isSelected={isParticipating}
          isPending={isPending}
          onSelect={() => selectParticipation(true)}
        />
        <OrganizerParticipationOption
          title="Manager Only"
          description="Manage proofs & disbursements without saving"
          isSelected={!isParticipating}
          isPending={isPending}
          onSelect={() => selectParticipation(false)}
        />
      </div>

      {!isParticipating && (
        <OrganizerFeeField
          register={register}
          setValue={setValue}
          errors={errors}
          isPending={isPending}
        />
      )}

      <input type="hidden" {...register("isOrganizerParticipating")} />
    </div>
  );
}
