"use client";

import CreateGroupFormFields from "@/features/groups/components/forms/CreateGroupFormFields";
import CreateGroupPreview from "@/features/groups/components/forms/CreateGroupPreview";
import { useCreateGroupController } from "@/features/groups/hooks/useCreateGroupController";

export default function CreateGroupPage() {
  const {
    register,
    errors,
    watch,
    watchAllFields,
    setValue,
    isPending,
    onSubmit,
    totalPayout,
    totalRounds,
    totalDays,
  } = useCreateGroupController();

  return (
    <main className="flex-1 bg-neutral-subtext/5 p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto p-2">
        <CreateGroupFormFields
          register={register}
          errors={errors}
          watch={watch}
          selectedBillingCycle={watchAllFields.billingCycle}
          payoutSequence={watchAllFields.payoutSequence || "RANDOM"}
          setValue={setValue}
          isPending={isPending}
          onSubmit={onSubmit}
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
