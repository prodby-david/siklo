"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ShieldCheck, Check, X, Eye } from "lucide-react";
import { api } from "@/shared/lib/axios";
import ReceiptImagePreviewModal from "../modal/ReceiptImagePreviewModal";
import PaymentRejectionReasonModal from "../modal/PaymentRejectionReasonModal";

interface IncomingPayment {
  id: string;
  userId: string;
  paymentMethod: "E_WALLET" | "BANK_TRANSFER" | "CASH";
  baseAmount: number;
  penaltyAmount: number;
  backupFundAmount: number;
  totalAmount: number;
  referenceNumber?: string | null;
  proofUrl?: string | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  round?: {
    roundNumber: number;
  };
}

interface IncomingPaymentsVerificationSectionProps {
  groupId: string;
  isOrganizer: boolean;
  onRefreshGroup?: () => void;
}

export default function IncomingPaymentsVerificationSection({
  groupId,
  isOrganizer,
  onRefreshGroup,
}: IncomingPaymentsVerificationSectionProps) {
  const [payments, setPayments] = useState<IncomingPayment[]>([]);
  const [selectedProofUrl, setSelectedProofUrl] = useState<string | null>(null);
  const [rejectingPayment, setRejectingPayment] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPendingPayments = useCallback(async () => {
    if (!isOrganizer) return;
    try {
      const res = await api.get(`/groups/${groupId}/payments/pending`);
      setPayments(res.data || []);
    } catch {
      setPayments([]);
    }
  }, [groupId, isOrganizer]);

  useEffect(() => {
    let isMounted = true;
    if (isOrganizer) {
      api
        .get(`/groups/${groupId}/payments/pending`)
        .then((res) => {
          if (isMounted) setPayments(res.data || []);
        })
        .catch(() => {
          if (isMounted) setPayments([]);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [groupId, isOrganizer]);

  const handleApprove = async (paymentId: string) => {
    setProcessingId(paymentId);
    try {
      await api.post(`/groups/payments/${paymentId}/verify`);
      await fetchPendingPayments();
      if (onRefreshGroup) onRefreshGroup();
    } catch {
      setProcessingId(null);
    } finally {
      setProcessingId(null);
    }
  };

  if (!isOrganizer || payments.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-3xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span>Incoming Payments Verification Queue</span>
              <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-foreground">
                  {p.user?.name || "Member"}
                </span>
                <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">
                  Round #{p.round?.roundNumber || 1}
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
              {p.proofUrl && (
                <button
                  type="button"
                  onClick={() => setSelectedProofUrl(p.proofUrl!)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent hover:underline px-3 py-1.5 rounded-xl border border-brand-accent/30 bg-brand-accent/10 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Receipt</span>
                </button>
              )}

              <button
                type="button"
                disabled={processingId === p.id}
                onClick={() => handleApprove(p.id)}
                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve</span>
              </button>

              <button
                type="button"
                disabled={processingId === p.id}
                onClick={() =>
                  setRejectingPayment({
                    id: p.id,
                    name: p.user?.name || "Member",
                  })
                }
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProofUrl && (
        <ReceiptImagePreviewModal
          isOpen={!!selectedProofUrl}
          onClose={() => setSelectedProofUrl(null)}
          imageUrl={selectedProofUrl}
        />
      )}

      {rejectingPayment && (
        <PaymentRejectionReasonModal
          isOpen={!!rejectingPayment}
          onClose={() => setRejectingPayment(null)}
          paymentId={rejectingPayment.id}
          memberName={rejectingPayment.name}
          onSuccess={() => {
            fetchPendingPayments();
            if (onRefreshGroup) onRefreshGroup();
          }}
        />
      )}
    </div>
  );
}
