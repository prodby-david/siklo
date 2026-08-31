import { zodResolver } from "@hookform/resolvers/zod";
import { Control, FieldErrors, Resolver, SubmitHandler, UseFormRegister, UseFormSetValue, UseFormWatch, useForm } from "react-hook-form";
import useCreateGroup from "./useCreateGroup";
import {
  CreateGroupData,
  createGroupSchema,
} from "../validator/create-group.validator";
import { CreateGroupFormFieldsProps } from "../types/create-group-field.types";

export default function useCreateGroupFormFields(
  props: CreateGroupFormFieldsProps,
) {
  const internalForm = useForm<CreateGroupData>({
    resolver: zodResolver(createGroupSchema) as unknown as Resolver<CreateGroupData>,
    values: {
      name: "",
      description: "",
      maxMembers: 4,
      billingCycle: "MONTHLY",
      contributionAmount: 1000,
      cycleDuration: 1,
      payoutSequence: "MANUAL",
      allowedPaymentMethods: ["E_WALLET", "BANK_TRANSFER", "CASH"],
      paymentDetails: "",
      gracePeriodDays: 0,
      latePenaltyAmount: 0,
      isOrganizerParticipating: true,
      organizerFeeAmount: 0,
    },
  });
  const internalMutation = useCreateGroup();

  const register = (props.register || internalForm.register) as UseFormRegister<CreateGroupData>;
  const errors = (props.errors || internalForm.formState.errors) as FieldErrors<CreateGroupData>;
  const setValue = (props.setValue || internalForm.setValue) as UseFormSetValue<CreateGroupData>;
  const watch = (props.watch || internalForm.watch) as UseFormWatch<CreateGroupData>;
  const isPending = props.isPending ?? internalMutation.isPending;

  const handleSubmit = props.onSubmit
    ? (e: React.FormEvent) => {
        e.preventDefault();
        props.onSubmit?.(e);
      }
    : (e?: React.BaseSyntheticEvent) => {
        const handler: SubmitHandler<CreateGroupData> = (data) =>
          internalMutation.mutate(data);
        return internalForm.handleSubmit(handler)(e);
      };

  const selectedBillingCycle =
    props.selectedBillingCycle || watch("billingCycle") || "DAILY";

  const handleBillingCycleSelect = (val: string) => {
    setValue("billingCycle", val as CreateGroupData["billingCycle"], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const selectedPayoutSequence =
    props.payoutSequence || watch("payoutSequence") || "RANDOM";

  const handlePayoutSequenceSelect = (val: string) => {
    setValue("payoutSequence", val as CreateGroupData["payoutSequence"], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return {
    register,
    errors,
    setValue,
    watch,
    control: (props.control || internalForm.control) as unknown as Control<CreateGroupData>,
    isPending,
    handleSubmit,
    selectedBillingCycle,
    handleBillingCycleSelect,
    selectedPayoutSequence,
    handlePayoutSequenceSelect,
  };
}
