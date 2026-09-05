import type { KeyboardEvent } from "react";
import {
  AlertTriangle,
  AlignLeft,
  Clock,
  FileText,
  PhilippinePeso,
  Users,
} from "lucide-react";
import type {
  EditGroupFormField,
  EditGroupFormValues,
} from "../../types/edit-group.types";
import getBoundedInteger from "../../utils/getBoundedInteger";

interface EditGroupBasicsFieldsProps {
  values: EditGroupFormValues;
  isSubmitting: boolean;
  onChange: <Field extends EditGroupFormField>(
    field: Field,
    value: EditGroupFormValues[Field],
  ) => void;
}

const BLOCKED_NUMBER_KEYS = [".", ",", "-", "e", "E", "+"];
const INPUT_CLASS_NAME =
  "w-full rounded-xl border border-neutral-border bg-background p-3 text-xs text-foreground focus:border-brand-accent focus:outline-none";

export default function EditGroupBasicsFields({
  values,
  isSubmitting,
  onChange,
}: EditGroupBasicsFieldsProps) {
  const preventInvalidNumberKey = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (BLOCKED_NUMBER_KEYS.includes(event.key)) event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <FileText className="h-4 w-4 text-neutral-subtext" />
          <span>Group Name</span>
        </label>
        <input
          type="text"
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="e.g. Office Savings Pool"
          disabled={isSubmitting}
          className={INPUT_CLASS_NAME}
        />
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <AlignLeft className="h-4 w-4 text-neutral-subtext" />
          <span>Group Description (Optional)</span>
        </label>
        <input
          type="text"
          value={values.description}
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="e.g. Monthly savings circle for team members"
          disabled={isSubmitting}
          className={INPUT_CLASS_NAME}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <PhilippinePeso className="h-4 w-4 text-neutral-subtext" />
            <span>Contribution Amount</span>
          </label>
          <input
            type="number"
            value={values.contributionAmount}
            onKeyDown={preventInvalidNumberKey}
            onChange={(event) =>
              onChange(
                "contributionAmount",
                getBoundedInteger(event.target.value, 0, 10000, 0) || 0,
              )
            }
            disabled={isSubmitting}
            className={INPUT_CLASS_NAME}
          />
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Users className="h-4 w-4 text-neutral-subtext" />
            <span>Member Capacity</span>
          </label>
          <input
            type="number"
            value={values.maxMembers}
            onKeyDown={preventInvalidNumberKey}
            onChange={(event) =>
              onChange(
                "maxMembers",
                getBoundedInteger(event.target.value, 0, 50, 3) || 3,
              )
            }
            disabled={isSubmitting}
            className={INPUT_CLASS_NAME}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Clock className="h-4 w-4 text-brand-accent" />
            <span>Grace Period (0 - 7 Days)</span>
          </label>
          <input
            type="number"
            min={0}
            max={7}
            value={values.gracePeriodDays}
            onKeyDown={preventInvalidNumberKey}
            onChange={(event) =>
              onChange(
                "gracePeriodDays",
                getBoundedInteger(event.target.value, 0, 7, 0) || 0,
              )
            }
            disabled={isSubmitting}
            className={INPUT_CLASS_NAME}
          />
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span>Daily Late Penalty (1% - 10% per day)</span>
          </label>
          <input
            type="number"
            step="0.1"
            min={1}
            max={10}
            value={values.latePenaltyAmount}
            onKeyDown={preventInvalidNumberKey}
            onChange={(event) =>
              onChange(
                "latePenaltyAmount",
                getBoundedInteger(event.target.value, 0, 10, 0) || 0,
              )
            }
            disabled={isSubmitting}
            className={INPUT_CLASS_NAME}
          />
        </div>
      </div>
    </div>
  );
}
