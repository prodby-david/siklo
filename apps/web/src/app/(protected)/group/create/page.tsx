"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGroupSchema,
  type CreateGroupInput,
  type CreateGroupData,
} from "@/features/groups/validator/create-group.validator";
import useCreateGroup from "@/features/groups/hooks/useCreateGroup";
import { toast } from "sonner";
import CreateGroupFormFields from "@/features/groups/components/forms/CreateGroupFormFields";
import CreateGroupPreview from "@/features/groups/components/forms/CreateGroupPreview";
import { useRouter } from "next/navigation";
import axios from "axios";
import { calculateCycleDetails } from "@/features/groups/utils/group.calculations";

export default function CreateGroupPage() {
  const router = useRouter();
  const { mutateAsync: createGroup, isPending } = useCreateGroup();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      contributionAmount: 100,
      billingCycle: "DAILY",
      payoutSequence: "MANUAL",
      cycleDuration: 1,
      totalPayout: 0,
      maxMembers: 3,
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
    billingCycle,
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
      let message = "Failed to create group";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    }
  };

  return (
    <main className="flex-1 bg-neutral-subtext/5 p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto p-2">
        <CreateGroupFormFields
          register={register}
          errors={errors}
          payoutSequence={watchAllFields.payoutSequence || "RANDOM"}
          setValue={setValue}
          isPending={isPending}
          onSubmit={handleSubmit(onSubmit)}
        />
        <CreateGroupPreview
          watchedFields={watchAllFields}
          totalPayout={totalPayout}
          totalRounds={totalRounds}
          totalDays={totalDays}
        />
      </div>
    </main>
  );
}
