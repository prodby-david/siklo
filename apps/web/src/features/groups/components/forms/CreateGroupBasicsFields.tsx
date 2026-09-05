import type { KeyboardEvent } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  AlertTriangle,
  AlignLeft,
  Clock,
  FileText,
  PhilippinePeso,
  RefreshCw,
  Users,
} from "lucide-react";
import Input from "@/shared/components/inputs/Input";
import type { CreateGroupData } from "../../validator/create-group.validator";
import getBoundedInteger from "../../utils/getBoundedInteger";

interface CreateGroupBasicsFieldsProps {
  register: UseFormRegister<CreateGroupData>;
  setValue: UseFormSetValue<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
  isPending: boolean;
}

const BLOCKED_NUMBER_KEYS = [".", ",", "-", "e", "E", "+"];

export default function CreateGroupBasicsFields({
  register,
  setValue,
  errors,
  isPending,
}: CreateGroupBasicsFieldsProps) {
  const preventInvalidNumberKey = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (BLOCKED_NUMBER_KEYS.includes(event.key)) event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <Input
        label="name"
        labelText="Group Name"
        placeholder="e.g. Office Savings Pool"
        disabled={isPending}
        {...register("name")}
        errors={errors}
        icon={<FileText className="h-4 w-4 text-neutral-subtext" />}
      />

      <Input
        label="description"
        labelText="Group Description"
        placeholder="e.g. Monthly savings circle for team members"
        disabled={isPending}
        {...register("description")}
        errors={errors}
        icon={<AlignLeft className="h-4 w-4 text-neutral-subtext" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          label="contributionAmount"
          labelText="Contribution Amount"
          type="number"
          min={50}
          max={10000}
          disabled={isPending}
          {...register("contributionAmount", { valueAsNumber: true })}
          onKeyDown={preventInvalidNumberKey}
          onChange={(event) => {
            const value = getBoundedInteger(event.target.value, 0, 10000);
            setValue(
              "contributionAmount",
              value as CreateGroupData["contributionAmount"],
              { shouldValidate: true },
            );
          }}
          errors={errors}
          icon={<PhilippinePeso className="h-4 w-4 text-neutral-subtext" />}
        />

        <Input
          label="maxMembers"
          labelText="Member Capacity"
          type="number"
          min={3}
          max={50}
          disabled={isPending}
          {...register("maxMembers", { valueAsNumber: true })}
          onKeyDown={preventInvalidNumberKey}
          onChange={(event) => {
            const value = getBoundedInteger(event.target.value, 0, 50);
            setValue("maxMembers", value as CreateGroupData["maxMembers"], {
              shouldValidate: true,
            });
          }}
          errors={errors}
          icon={<Users className="h-4 w-4 text-neutral-subtext" />}
        />

        <Input
          label="cycleDuration"
          labelText="Rotation Cycles"
          type="number"
          min={1}
          max={10}
          disabled={isPending}
          {...register("cycleDuration", { valueAsNumber: true })}
          onKeyDown={preventInvalidNumberKey}
          onChange={(event) => {
            const value = getBoundedInteger(event.target.value, 1, 10, 1);
            setValue("cycleDuration", value || 1, { shouldValidate: true });
          }}
          errors={errors}
          icon={<RefreshCw className="h-4 w-4 text-brand-accent" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="gracePeriodDays"
          labelText="Grace Period"
          type="number"
          min={0}
          max={7}
          disabled={isPending}
          {...register("gracePeriodDays", { valueAsNumber: true })}
          onKeyDown={preventInvalidNumberKey}
          onChange={(event) => {
            const value = getBoundedInteger(event.target.value, 0, 7, 0);
            setValue("gracePeriodDays", value || 0, { shouldValidate: true });
          }}
          errors={errors}
          icon={<Clock className="h-4 w-4 text-brand-accent" />}
        />

        <Input
          label="latePenaltyAmount"
          labelText="Daily Late Penalty"
          type="number"
          step={1}
          min={0}
          max={10}
          disabled={isPending}
          {...register("latePenaltyAmount", { valueAsNumber: true })}
          onKeyDown={preventInvalidNumberKey}
          onChange={(event) => {
            const value = getBoundedInteger(event.target.value, 0, 10, 0);
            setValue("latePenaltyAmount", value || 0, {
              shouldValidate: true,
            });
          }}
          errors={errors}
          icon={<AlertTriangle className="h-4 w-4 text-warning" />}
        />
      </div>
    </div>
  );
}
