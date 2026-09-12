import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import type {
  CreateGroupData,
  CreateGroupInput,
} from "../validator/create-group.validator";
import type { PaymentMethodKey } from "./group.types";

export interface CreateGroupFormFieldsProps {
  register?: UseFormRegister<CreateGroupInput | CreateGroupData>;
  errors?: FieldErrors<CreateGroupInput | CreateGroupData>;
  payoutSequence?: string;
  selectedBillingCycle?: string;
  setValue?: UseFormSetValue<CreateGroupInput | CreateGroupData>;
  watch?: UseFormWatch<CreateGroupInput | CreateGroupData>;
  control?: Control<CreateGroupInput | CreateGroupData>;
  isPending?: boolean;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
}

export interface PayoutSequenceSelectorProps {
  selectedSequence?: string;
  isPending?: boolean;
  onSelectSequence: (sequence: "RANDOM" | "MANUAL" | "FREECHOOSING") => void;
}

export interface OrganizerParticipationSelectorProps {
  control: Control<CreateGroupData>;
  isPending: boolean;
  register: UseFormRegister<CreateGroupData>;
  setValue: UseFormSetValue<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
}

export interface OrganizerParticipationOptionProps {
  title: string;
  description: string;
  isSelected: boolean;
  isPending: boolean;
  onSelect: () => void;
}

export interface OrganizerFeeFieldProps {
  register: UseFormRegister<CreateGroupData>;
  setValue: UseFormSetValue<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
  isPending: boolean;
}

export interface GroupPaymentMethodSelectorProps {
  selectedMethods: PaymentMethodKey[];
  organizerAccounts?: PaymentAccountDetailsDTO;
  isPending: boolean;
  onToggleMethod: (method: PaymentMethodKey) => void;
}

export interface CreateGroupScheduleFieldsProps {
  register: UseFormRegister<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
  selectedPayoutSequence: string;
  selectedBillingCycle: string;
  isPending: boolean;
  onSelectPayoutSequence: (
    sequence: "RANDOM" | "MANUAL" | "FREECHOOSING",
  ) => void;
  onSelectBillingCycle: (cycle: string) => void;
}

export interface CreateGroupBasicsFieldsProps {
  register: UseFormRegister<CreateGroupData>;
  setValue: UseFormSetValue<CreateGroupData>;
  errors: FieldErrors<CreateGroupData>;
  isPending: boolean;
}

export interface CreateGroupSubmitButtonProps {
  isPending: boolean;
}
