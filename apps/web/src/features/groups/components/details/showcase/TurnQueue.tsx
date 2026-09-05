import { Users } from "lucide-react";
import type { GroupRound, Membership } from "@/features/groups/types/group.types";
import { getPayoutDate } from "@/features/groups/utils/groupCalculations";
import ShowcaseTurnCard from "./ShowcaseTurnCard";

interface TurnQueueProps {
  memberships: Membership[];
  rounds: GroupRound[];
  maxMembers: number;
  selectedTurn: number;
  currentCycle: number;
  currentTurn: number;
  hasStarted: boolean;
  startDate?: string | null;
  billingCycle: string;
  completedDisbursementDates: Record<number, Date>;
  confirmedTurns: Set<string>;
  disbursedTurns: Set<string>;
  organizerId?: string;
  onSelectTurn: (turn: number) => void;
}

export default function TurnQueue({
  memberships,
  rounds,
  maxMembers,
  selectedTurn,
  currentCycle,
  currentTurn,
  hasStarted,
  startDate,
  billingCycle,
  completedDisbursementDates,
  confirmedTurns,
  disbursedTurns,
  organizerId,
  onSelectTurn,
}: TurnQueueProps) {
  return (
    <section className="flex flex-col gap-2.5 lg:col-span-5">
      <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-neutral-subtext">
        <Users className="h-3.5 w-3.5 text-brand-accent" /> Turn Queue (
        {memberships.length}/{maxMembers})
      </span>

      <div className="max-h-[440px] space-y-2 overflow-y-auto pr-1 no-scrollbar">
        {Array.from({ length: maxMembers }).map((_, index) => {
          const position = index + 1;
          const membership = memberships.find(
            (member) => member.position === position,
          );
          const turnKey = `${currentCycle}-${position}`;
          const round = rounds.find(
            (item) =>
              item.cycleNumber === currentCycle &&
              item.roundNumber === position,
          );
          const isReceived =
            round?.status === "RECEIVED" ||
            confirmedTurns.has(turnKey) ||
            (hasStarted && position < currentTurn);
          const isDisbursed =
            round?.status === "DISBURSED" || disbursedTurns.has(turnKey);

          return (
            <ShowcaseTurnCard
              key={position}
              position={position}
              membership={membership}
              isSelected={selectedTurn === position}
              isReceived={isReceived}
              isDisbursed={isDisbursed}
              isCurrent={hasStarted && position === currentTurn}
              hasStarted={hasStarted}
              calculatedDate={getPayoutDate(
                startDate,
                position,
                billingCycle,
                completedDisbursementDates,
              )}
              onSelect={onSelectTurn}
              organizerId={organizerId}
            />
          );
        })}
      </div>
    </section>
  );
}
