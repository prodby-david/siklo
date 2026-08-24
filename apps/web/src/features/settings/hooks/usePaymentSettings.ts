"use client";

import { useState, FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { updatePaymentSettings } from "../api/updatePaymentSettings";
import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";

export function usePaymentSettings() {
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customData, setCustomData] = useState<Partial<PaymentAccountDetailsDTO>>({});

  const userAccounts = user?.paymentAccounts as
    | PaymentAccountDetailsDTO
    | undefined;

  const formData: PaymentAccountDetailsDTO = {
    gcashName: customData.gcashName ?? userAccounts?.gcashName ?? "",
    gcashNumber: customData.gcashNumber ?? userAccounts?.gcashNumber ?? "",
    mayaName: customData.mayaName ?? userAccounts?.mayaName ?? "",
    mayaNumber: customData.mayaNumber ?? userAccounts?.mayaNumber ?? "",
    bankName: customData.bankName ?? userAccounts?.bankName ?? "",
    bankAccountNumber:
      customData.bankAccountNumber ?? userAccounts?.bankAccountNumber ?? "",
  };

  const handleChange = (
    field: keyof PaymentAccountDetailsDTO,
    value: string,
  ) => {
    let sanitizedValue = value;
    if (field === "gcashNumber" || field === "mayaNumber") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 11);
    } else if (field === "bankAccountNumber") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 20);
    }

    setCustomData((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePaymentSettings(formData);
      await queryClient.invalidateQueries({ queryKey: ["current-name"] });
      toast.success("Payment accounts updated successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to update payment accounts";
        toast.error(message);
        return;
      }
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isUserLoading,
  };
}
