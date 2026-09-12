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
import type { CreateGroupBasicsFieldsProps } from "../../types/create-group-field.types";
import getBoundedInteger from "../../utils/getBoundedInteger";

export default function CreateGroupBasicsFields({
  register,
  setValue,
  errors,
  isPending,
}: CreateGroupBasicsFieldsProps) {
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
          type="text"
          inputMode="numeric"
          disabled={isPending}
          {...register("contributionAmount", { valueAsNumber: true })}
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
          type="text"
          inputMode="numeric"
          disabled={isPending}
          {...register("maxMembers", { valueAsNumber: true })}
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
          type="text"
          inputMode="numeric"
          disabled={isPending}
          {...register("cycleDuration", { valueAsNumber: true })}
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
          type="text"
          inputMode="numeric"
          disabled={isPending}
          {...register("gracePeriodDays", { valueAsNumber: true })}
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
          type="text"
          inputMode="numeric"
          disabled={isPending}
          {...register("latePenaltyAmount", { valueAsNumber: true })}
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
