"use client";

import { useState } from "react";
import { ShieldCheck, Eye, Users } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { verifyPayment } from "../api/verifyPayment";
import { usePendingPayments } from "../hooks/usePendingPayments";
import {
  IncomingPaymentsVerificationSectionProps,
  IncomingPaymentItem,
} from "../types/payment.types";
import { getApiErrorMessage } from "@/shared/utils/error.helper";
import ReceiptImagePreviewModal from "./modals/ReceiptImagePreviewModal";
import PaymentRejectionReasonModal from "./modals/PaymentRejectionReasonModal";

export default function IncomingPaymentsVerificationSection({
  groupId,
  isOrganizer = true,
  onRefreshGroup,
}: IncomingPaymentsVerificationSectionProps) {
  const queryClient = useQueryClient();
  const [selectedPayment, setSelectedPayment] =
    useState<IncomingPaymentItem | null>(null);
  const [rejectingPayment, setRejectingPayment] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data: payments = [], refetch } = usePendingPayments(
    groupId,
    isOrganizer,
  );

  const handleApprove = async (paymentId: string) => {
    setProcessingId(paymentId);
    try {
      await verifyPayment(paymentId);
      toast.success("Payment verified and approved!");
      await refetch();
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      await queryClient.invalidateQueries({ queryKey: ["group-activities"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
      if (onRefreshGroup) onRefreshGroup();
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to verify payment"));
    } finally {
      setProcessingId(null);
    }
  };

  if (!isOrganizer || payments.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-warning/30 bg-warning-bg p-5 shadow-xs sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-warning/25 bg-warning-bg text-warning">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span>Incoming Payments Verification Queue</span>
              <span className="rounded-full bg-warning px-2 py-0.5 text-[10px] font-black text-brand-accent-foreground">
                {payments.length} Pending
              </span>
            </h3>
            <p className="text-[10px] text-neutral-subtext">
              Review submitted receipts and reference numbers to verify payments.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-neutral-border/60 bg-background"
          >
            <div className="flex flex-col text-left gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-foreground">
                  {p.user?.name || "Member"}
                </span>
                {p.group && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-subtext bg-neutral-table-stripe px-2 py-0.5 rounded-full border border-neutral-border/60">
                    <Users className="w-3 h-3 text-brand-accent" />
                    <span>{p.group.name}</span>
                  </span>
                )}
                <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">
                  Turn #{p.round?.roundNumber || 1}
                </span>
                <span className="text-[10px] font-bold text-neutral-subtext">
                  {p.paymentMethod}
                </span>
              </div>

              <p className="text-xs text-neutral-subtext flex items-center gap-3">
                <span>
                  Total: <strong className="text-foreground">₱{p.totalAmount.toLocaleString()}</strong>
                </span>
                {p.referenceNumber && (
                  <span>
                    Ref: <strong className="text-foreground">{p.referenceNumber}</strong>
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-neutral-border/60 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={() => setSelectedPayment(p)}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-brand-accent/25 bg-brand-accent/10 px-3.5 py-2 text-xs font-bold text-brand-accent shadow-2xs transition-all duration-200 hover:bg-brand-accent hover:text-brand-accent-foreground active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Receipt</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReceiptImagePreviewModal
        isOpen={Boolean(selectedPayment)}
        onClose={() => setSelectedPayment(null)}
        imageUrl={selectedPayment?.proofUrl || null}
        payment={selectedPayment}
        onApprove={handleApprove}
        onReject={(paymentId, name) => setRejectingPayment({ id: paymentId, name })}
        isProcessing={Boolean(processingId)}
      />

      {rejectingPayment && (
        <PaymentRejectionReasonModal
          isOpen={Boolean(rejectingPayment)}
          onClose={() => setRejectingPayment(null)}
          paymentId={rejectingPayment.id}
          memberName={rejectingPayment.name}
          onSuccess={async () => {
            await refetch();
            await queryClient.invalidateQueries({ queryKey: ["groups"] });
            await queryClient.invalidateQueries({ queryKey: ["group-activities"] });
            await queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
            if (onRefreshGroup) onRefreshGroup();
          }}
        />
      )}
    </div>
  );
}
