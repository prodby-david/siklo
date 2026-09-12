"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GroupHero from "../components/details/GroupHero";
import GroupStatsGrid from "../components/details/GroupStatsGrid";
import GroupInfoCard from "../components/details/GroupInfoCard";
import UnstartedCyclePreparationGuide from "../components/details/UnstartedCyclePreparationGuide";
import GroupActivityLogs from "../components/details/GroupActivityLogs";
import GroupTurnShowcase from "../components/details/GroupTurnShowcase";
import GroupRoundsStatusCard from "../components/details/GroupRoundsStatusCard";
import IncomingPaymentsVerificationSection from "@/features/payments/components/IncomingPaymentsVerificationSection";
import { useGroupPageController } from "../hooks/useGroupPageController";
import GroupPageLoadingState from "../components/details/states/GroupPageLoadingState";
import GroupNotFoundState from "../components/details/states/GroupNotFoundState";

export default function GroupDetailsUI() {
  const {
    data,
    isLoading,
    isConnected,
    copied,
    handleCopyInviteCode,
    timeline,
    isOrganizer,
    hasStarted,
    isMembersFull,
    isCycleDone,
    currentCycle,
    currentTurn,
    currentRoundId,
    currentMembership,
    hasAlreadyPaidOrganizerFee,
    isCurrentUserPaid,
    isCurrentUserPending,
    handleStartCycle,
    isStarting,
    handleDeleteGroup,
    isDeleting,
    currentUserId,
  } = useGroupPageController();

  if (isLoading) {
    return <GroupPageLoadingState />;
  }

  if (!data || !timeline) {
    return <GroupNotFoundState />;
  }

  return (
    <main className="min-h-screen flex-1 bg-neutral-table-stripe p-6 md:p-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Link
            href="/group"
            className="flex cursor-pointer items-center justify-center rounded-2xl border border-neutral-border bg-card p-2 text-neutral-subtext transition-colors duration-150 hover:bg-neutral-table-stripe hover:text-foreground active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-xs text-neutral-subtext font-medium">
            Back to Groups
          </span>
        </div>

        <GroupHero
          groupId={data.id}
          name={data.name}
          description={data.description}
          billingCycle={data.billingCycle}
          inviteCode={data.inviteCode}
          copied={copied}
          onCopyInviteCode={handleCopyInviteCode}
          hasStarted={hasStarted}
          isCycleDone={isCycleDone}
          isOrganizer={isOrganizer}
          isOrganizerParticipating={data.isOrganizerParticipating !== false}
          isUserMember={Boolean(currentMembership)}
          allowedMethods={data.allowedPaymentMethods || ["E_WALLET", "BANK_TRANSFER", "CASH"]}
          organizerPaymentDetails={data.paymentDetails}
          contributionAmount={data.contributionAmount}
          organizerFeeAmount={data.organizerFeeAmount}
          hasAlreadyPaidOrganizerFee={hasAlreadyPaidOrganizerFee}
          gracePeriodDays={data.gracePeriodDays}
          latePenaltyAmount={data.latePenaltyAmount}
          currentMemberMethod={currentMembership?.preferredPaymentMethod}
          currentMemberAccountDetails={currentMembership?.paymentAccountDetails}
          maxMembers={data.maxMembers}
          payoutSequence={data.payoutSequence}
          isCurrentUserPaid={isCurrentUserPaid}
          isCurrentUserPending={isCurrentUserPending}
          currentTurn={currentTurn}
          roundId={currentRoundId}
          nextPayoutee={data.nextPayoutee}
        />

        <GroupStatsGrid
          contributionAmount={data.contributionAmount}
          maxMembers={data.maxMembers}
          cycleDuration={data.cycleDuration}
          billingCycle={data.billingCycle}
          membershipsCount={data._count?.memberships ?? 0}
          totalPayout={timeline.totalPayout}
          totalRounds={timeline.totalRounds}
        />

        {hasStarted && isOrganizer && (
          <IncomingPaymentsVerificationSection
            groupId={data.id}
            isOrganizer={isOrganizer}
          />
        )}

        <GroupRoundsStatusCard
          groupName={data.name}
          hasStarted={hasStarted}
          isCycleDone={isCycleDone}
          currentCycle={currentCycle}
          currentTurn={currentTurn}
          maxMembers={data.maxMembers}
          cycleDuration={data.cycleDuration}
          contributionAmount={data.contributionAmount}
          organizerId={data.organizerId}
          organizerFeeAmount={data.organizerFeeAmount}
          rounds={data.rounds}
          payments={data.payments}
          memberships={data.memberships}
        />

        <GroupTurnShowcase
          groupId={data.id}
          name={data.name}
          memberships={data.memberships}
          organizerId={data.organizerId}
          contributionAmount={data.contributionAmount}
          maxMembers={data.maxMembers}
          cycleDuration={data.cycleDuration}
          billingCycle={data.billingCycle}
          payoutSequence={data.payoutSequence}
          startDate={data.startDate}
          isOrganizer={isOrganizer}
          hasStarted={hasStarted}
          currentUserId={currentUserId}
          isCycleDone={isCycleDone}
          payments={data.payments}
          rounds={data.rounds}
          allowedPaymentMethods={data.allowedPaymentMethods}
          paymentDetails={data.paymentDetails}
          gracePeriodDays={data.gracePeriodDays}
          latePenaltyAmount={data.latePenaltyAmount}
          organizerFeeAmount={data.organizerFeeAmount}
          inviteCode={data.inviteCode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-6">
            {!hasStarted && !isCycleDone && (
              <UnstartedCyclePreparationGuide
                isOrganizer={isOrganizer}
                membershipsCount={data._count?.memberships ?? 0}
                maxMembers={data.maxMembers}
                inviteCode={data.inviteCode}
                copied={copied}
                onCopyInviteCode={handleCopyInviteCode}
                payoutSequence={data.payoutSequence}
                contributionAmount={data.contributionAmount}
                billingCycle={data.billingCycle}
              />
            )}

            {hasStarted && (
              <div>
                <GroupActivityLogs
                  group={data}
                  memberships={data.memberships}
                  isCycleDone={isCycleDone}
                  isConnected={isConnected}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <GroupInfoCard
              groupName={data.name}
              startDate={data.startDate}
              endDate={timeline.endDate}
              totalDays={timeline.totalDays}
              billingCycle={data.billingCycle}
              payoutSequence={data.payoutSequence}
              organizerId={data.organizerId}
              organizerName={data.organizer?.name}
              organizerContact={data.organizer?.contactNumber}
              isOrganizer={isOrganizer}
              hasStarted={hasStarted}
              onStartCycle={handleStartCycle}
              isStarting={isStarting}
              isMembersFull={isMembersFull}
              onDeleteGroup={handleDeleteGroup}
              isDeleting={isDeleting}
              membershipsCount={data._count?.memberships ?? 0}
              isCycleDone={isCycleDone}
              allowedMethods={data.allowedPaymentMethods}
              paymentDetails={data.paymentDetails}
              gracePeriodDays={data.gracePeriodDays}
              latePenaltyAmount={data.latePenaltyAmount}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
