"use client";

import { useState } from "react";
import { HandCoins } from "lucide-react";
import type { DisbursePayoutDTO } from "@siklo/shared-schemas";
import DisbursePayoutModal from "@/features/payments/components/modals/DisbursePayoutModal";
import type { DisbursePayoutActionProps } from "@/features/groups/types/showcase.types";

export default function DisbursePayoutAction({
  group,
  currentRound,
  currentCycle,
  selectedMemberName,
  selectedMembership,
  selectedTurn,
  poolTotal,
  isDisbursingPayout,
  onDisbursePayout,
}: DisbursePayoutActionProps) {
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDisburseModalOpen(true)}
        disabled={isDisbursingPayout}
        className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-brand-accent py-3 text-xs font-bold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent-hover active:scale-95 disabled:opacity-50"
      >
        <HandCoins className="h-4 w-4" />
        <span>
          {isDisbursingPayout
            ? "Disbursing..."
            : selectedTurn === group.maxMembers
              ? `Release Final Payout & Complete Group (₱${poolTotal.toLocaleString()})`
              : `Release Payout & Start Turn #${selectedTurn + 1} (₱${poolTotal.toLocaleString()})`}
        </span>
      </button>

      {group.id && isDisburseModalOpen && currentRound && (
        <DisbursePayoutModal
          isOpen={isDisburseModalOpen}
          onClose={() => setIsDisburseModalOpen(false)}
          groupId={group.id}
          roundId={currentRound.id}
          cycleNumber={currentCycle}
          recipientName={selectedMemberName}
          recipientPaymentAccounts={selectedMembership?.user?.paymentAccounts}
          recipientPaymentMethod={selectedMembership?.preferredPaymentMethod}
          recipientAccountDetails={selectedMembership?.paymentAccountDetails}
          turnNumber={selectedTurn}
          poolTotal={poolTotal}
          onDisburse={async (data: DisbursePayoutDTO) => {
            if (onDisbursePayout) {
              await onDisbursePayout({
                referenceNumber: data.referenceNumber || "",
                proofUrl: data.proofUrl || "",
              });
            }
          }}
          isDisbursing={isDisbursingPayout}
        />
      )}
    </>
  );
}
