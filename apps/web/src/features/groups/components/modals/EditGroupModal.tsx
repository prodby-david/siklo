"use client";

import { AlertCircle, Loader2, Save, Settings } from "lucide-react";
import Loader from "@/shared/components/loader/Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import useEditGroupForm from "../../hooks/useEditGroupForm";
import type { EditGroupModalProps } from "../../types/group.types";
import EditGroupBasicsFields from "../forms/EditGroupBasicsFields";
import EditGroupPaymentFields from "../forms/EditGroupPaymentFields";
import EditGroupScheduleFields from "../forms/EditGroupScheduleFields";

export default function EditGroupModal({
  isOpen,
  onClose,
  groupId,
  initialData,
  onSuccess,
}: EditGroupModalProps) {
  const {
    values,
    setValue,
    togglePaymentMethod,
    handleSubmit,
    isSubmitting,
    errorMessage,
  } = useEditGroupForm({ groupId, initialData, onClose, onSuccess });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {isSubmitting && <Loader text="Updating group settings..." />}
        <form onSubmit={handleSubmit} className="space-y-5 p-1">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-extrabold text-foreground">
              <Settings className="h-5 w-5 text-brand-accent" />
              <span>Edit Group Settings</span>
            </DialogTitle>
            <DialogDescription>
              <span className="block text-xs text-neutral-subtext">
                Update parameters, contribution amount, penalties, and payment
                channels before cycle starts.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <EditGroupBasicsFields
              values={values}
              isSubmitting={isSubmitting}
              onChange={setValue}
            />
            <EditGroupPaymentFields
              allowedMethods={values.allowedPaymentMethods}
              paymentDetails={values.paymentDetails}
              isSubmitting={isSubmitting}
              onToggleMethod={togglePaymentMethod}
              onPaymentDetailsChange={(paymentDetails) =>
                setValue("paymentDetails", paymentDetails)
              }
            />
            <EditGroupScheduleFields
              billingCycle={values.billingCycle}
              payoutSequence={values.payoutSequence}
              isSubmitting={isSubmitting}
              onBillingCycleChange={(billingCycle) =>
                setValue("billingCycle", billingCycle)
              }
              onPayoutSequenceChange={(payoutSequence) =>
                setValue("payoutSequence", payoutSequence)
              }
            />
          </div>

          {errorMessage && (
            <p className="flex items-center gap-1.5 rounded-xl border border-danger-border bg-danger-bg p-3 text-xs font-semibold text-danger">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          <div className="flex justify-end gap-2 border-t border-neutral-border/60 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-2xl border border-neutral-border px-4 py-2.5 text-xs font-bold text-foreground transition-all hover:bg-neutral-table-stripe active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-brand-accent px-5 py-2.5 text-xs font-extrabold text-brand-accent-foreground transition-all hover:bg-brand-accent-hover active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
