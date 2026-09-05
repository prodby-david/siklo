import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import Loader from "@/shared/components/loader/Loader";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import type { CreateGroupFormFieldsProps } from "@/features/groups/types/create-group-field.types";
import type { PaymentMethodKey } from "@/features/groups/types/group.types";
import useCreateGroupFormFields from "../../hooks/useCreateGroupFormFields";
import buildOrganizerPaymentDetails from "../../utils/buildOrganizerPaymentDetails";
import CreateGroupBasicsFields from "./CreateGroupBasicsFields";
import OrganizerParticipationSelector from "./OrganizerParticipationSelector";
import GroupPaymentMethodSelector from "./GroupPaymentMethodSelector";
import CreateGroupScheduleFields from "./CreateGroupScheduleFields";
import CreateGroupSubmitButton from "./CreateGroupSubmitButton";

export default function CreateGroupFormFields(
  props: CreateGroupFormFieldsProps,
) {
  const { data: user } = useGetCurrentName();
  const organizerAccounts = user?.paymentAccounts as
    | PaymentAccountDetailsDTO
    | undefined;

  const {
    register,
    errors,
    setValue,
    control,
    watch,
    selectedPayoutSequence,
    selectedBillingCycle,
    isPending,
    handleSubmit,
    handleBillingCycleSelect,
    handlePayoutSequenceSelect,
  } = useCreateGroupFormFields(props);

  const selectedPaymentMethods = watch("allowedPaymentMethods") || [
    "E_WALLET",
    "BANK_TRANSFER",
    "CASH",
  ];

  const handleTogglePaymentMethod = (method: PaymentMethodKey) => {
    const nextMethods = selectedPaymentMethods.includes(method)
      ? selectedPaymentMethods.filter((selectedMethod) => {
          return selectedMethod !== method || selectedPaymentMethods.length === 1;
        })
      : [...selectedPaymentMethods, method];

    setValue("allowedPaymentMethods", nextMethods, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue(
      "paymentDetails",
      buildOrganizerPaymentDetails(nextMethods, organizerAccounts),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-neutral-border bg-card p-6 shadow-sm lg:col-span-7">
      {isPending && <Loader text="Creating paluwagan group..." />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <header className="space-y-1 border-b border-neutral-border/60 pb-4">
          <h2 className="text-xl font-extrabold tracking-tight text-foreground">
            Create Cycle Group
          </h2>
          <p className="text-xs text-neutral-subtext">
            Set up your group parameters, contribution amount, grace period
            rules, and payment options.
          </p>
        </header>

        <div className="space-y-4">
          <CreateGroupBasicsFields
            register={register}
            setValue={setValue}
            errors={errors}
            isPending={isPending}
          />
          <OrganizerParticipationSelector
            control={control}
            isPending={isPending}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <GroupPaymentMethodSelector
            selectedMethods={selectedPaymentMethods}
            organizerAccounts={organizerAccounts}
            isPending={isPending}
            onToggleMethod={handleTogglePaymentMethod}
          />
          <CreateGroupScheduleFields
            register={register}
            errors={errors}
            selectedPayoutSequence={selectedPayoutSequence}
            selectedBillingCycle={selectedBillingCycle}
            isPending={isPending}
            onSelectPayoutSequence={handlePayoutSequenceSelect}
            onSelectBillingCycle={handleBillingCycleSelect}
          />
        </div>

        <CreateGroupSubmitButton isPending={isPending} />
      </form>
    </div>
  );
}
