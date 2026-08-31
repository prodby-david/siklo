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
import { calculateCycleDetails } from "@/features/groups/utils/groupCalculations";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";

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
      contributionAmount: undefined as unknown as number,
      billingCycle: "DAILY",
      payoutSequence: "MANUAL",
      cycleDuration: 1,
      totalPayout: 0,
      maxMembers: undefined as unknown as number,
      allowedPaymentMethods: ["E_WALLET", "BANK_TRANSFER", "CASH"],
      paymentDetails: "",
      gracePeriodDays: undefined as unknown as number,
      latePenaltyAmount: undefined as unknown as number,
      isOrganizerParticipating: true,
      organizerFeeAmount: 0,
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

  const { data: user } = useGetCurrentName();

  useEffect(() => {
    setValue("totalPayout", totalPayout);
  }, [totalPayout, setValue]);

  useEffect(() => {
    if (user?.paymentAccounts) {
      const accounts = user.paymentAccounts as {
        gcashName?: string;
        gcashNumber?: string;
        mayaName?: string;
        mayaNumber?: string;
        bankName?: string;
        bankAccountNumber?: string;
      };
      const detailsArr: string[] = [];
      if (accounts.gcashNumber) {
        detailsArr.push(
          `GCash: ${accounts.gcashNumber} (${accounts.gcashName || "Organizer"})`,
        );
      }
      if (accounts.mayaNumber) {
        detailsArr.push(
          `Maya: ${accounts.mayaNumber} (${accounts.mayaName || "Organizer"})`,
        );
      }
      if (accounts.bankAccountNumber) {
        detailsArr.push(
          `${accounts.bankName || "Bank"}: ${accounts.bankAccountNumber} (${accounts.gcashName || accounts.mayaName || "Organizer"})`,
        );
      }
      if (detailsArr.length > 0) {
        setValue("paymentDetails", detailsArr.join("\n"));
      }
    }
  }, [user, setValue]);

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
