import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import {
  CreateGroupData,
  CreateGroupInput,
} from "../validator/create-group.validator";

export interface CreateGroupFormFieldsProps {
  register?: UseFormRegister<CreateGroupInput | CreateGroupData>;
  errors?: FieldErrors<CreateGroupInput | CreateGroupData>;
  payoutSequence?: string;
  selectedBillingCycle?: string;
  setValue?: UseFormSetValue<CreateGroupInput | CreateGroupData>;
  watch?: UseFormWatch<CreateGroupInput | CreateGroupData>;
  isPending?: boolean;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
}
