import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, useForm } from "react-hook-form";
import useCreateGroup from "./useCreateGroup";
import {
  CreateGroupData,
  createGroupSchema,
} from "../validator/create-group.validator";
import { CreateGroupFormFieldsProps } from "../types/create.group.field";

export default function useCreateGroupFormFields(
  props: CreateGroupFormFieldsProps,
) {
  const internalForm = useForm<CreateGroupData>({
    resolver: zodResolver(createGroupSchema),
    values: {
      name: "",
      description: "",
      maxMembers: 4,
      billingCycle: "MONTHLY",
      contributionAmount: 1000,
      cycleDuration: 1,
      payoutSequence: "MANUAL",
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
    : internalForm.handleSubmit((data: CreateGroupData) =>
        internalMutation.mutate(data),
      );

  const selectedBillingCycle =
    props.selectedBillingCycle || watch("billingCycle") || "DAILY";

  const handleBillingCycleSelect = (val: string) => {
    setValue("billingCycle", val as CreateGroupData["billingCycle"], {
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
    isPending,
    handleSubmit,
    selectedBillingCycle,
    handleBillingCycleSelect,
  };
}
