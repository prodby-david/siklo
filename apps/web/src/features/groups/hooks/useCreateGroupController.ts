import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGroupSchema,
  type CreateGroupInput,
  type CreateGroupData,
} from "@/features/groups/validator/create-group.validator";
import useCreateGroup from "@/features/groups/hooks/useCreateGroup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { calculateCycleDetails } from "@/features/groups/utils/group.calculations";

export function useCreateGroupController() {
  const router = useRouter();
  const { mutateAsync: createGroup, isPending } = useCreateGroup();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(createGroupSchema) as unknown as Resolver<CreateGroupInput>,
    defaultValues: {
      name: "",
      description: "",
      contributionAmount: 100,
      billingCycle: "DAILY",
      payoutSequence: "MANUAL",
      cycleDuration: 1,
      totalPayout: 0,
      maxMembers: 3,
      allowedPaymentMethods: ["E_WALLET", "BANK_TRANSFER", "CASH"],
      paymentDetails: "",
      gracePeriodDays: 0,
      latePenaltyAmount: 0,
      enableBackupFund: false,
      backupFundPerTurn: 0,
      backupFundAction: "EQUAL_REFUND",
    },
  });

  const contribution = watch("contributionAmount");
  const members = watch("maxMembers");
  const cycleDuration = watch("cycleDuration");
  const billingCycle = watch("billingCycle");

  const { totalPayout, totalRounds, totalDays } = calculateCycleDetails(
    contribution,
    members,
    cycleDuration,
    billingCycle
  );

  useEffect(() => {
    setValue("totalPayout", totalPayout);
  }, [totalPayout, setValue]);

  const watchAllFields = watch();

  const onSubmit = async (data: CreateGroupInput) => {
    try {
      await createGroup(data as CreateGroupData);
      toast.success("Paluwagan group created successfully!");
      router.push("/group");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : "Failed to create group";
      toast.error(message);
    }
  };

  const handleFormSubmit = async (e?: React.BaseSyntheticEvent) => {
    await handleSubmit(onSubmit as SubmitHandler<CreateGroupInput>)(e);
  };

  return {
    register,
    errors,
    watch,
    control,
    watchAllFields,
    setValue,
    isPending,
    onSubmit: handleFormSubmit,
    totalPayout,
    totalRounds,
    totalDays,
  };
}
