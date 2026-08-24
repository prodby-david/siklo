"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";
import CreateGroupFormFields from "@/features/groups/components/forms/CreateGroupFormFields";
import CreateGroupPreview from "@/features/groups/components/forms/CreateGroupPreview";
import { useCreateGroupController } from "@/features/groups/hooks/useCreateGroupController";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { hasUsablePaymentAccount } from "@/shared/utils/hasUsablePaymentAccount";

export default function CreateGroupPage() {
  const {
    register,
    errors,
    watch,
    control,
    watchAllFields,
    setValue,
    isPending,
    onSubmit,
    totalPayout,
    totalRounds,
    totalDays,
  } = useCreateGroupController();
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();

  if (!isUserLoading && !hasUsablePaymentAccount(user?.paymentAccounts)) {
    return (
      <main className="flex-1 bg-neutral-subtext/5 p-10 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 bg-background p-8 rounded-2xl border border-neutral-border shadow-sm max-w-md">
          <div className="mx-auto flex w-fit items-center justify-center p-3 rounded-2xl bg-brand-accent/10 text-brand-accent">
            <CreditCard className="w-6 h-6" />
          </div>
          <p className="text-lg font-bold text-foreground">
            Payment setup required
          </p>
          <p className="text-sm text-neutral-subtext">
            Add at least one payment account number in your settings before
            creating a group. Members will send their contributions to it.
          </p>
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-background px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
          >
            Go to Settings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-neutral-subtext/5 p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto p-2">
        <CreateGroupFormFields
          register={register}
          errors={errors}
          watch={watch}
          control={control}
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
