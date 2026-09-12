import { Shield, Phone, RefreshCw } from "lucide-react";
import DeleteGroupDialog from "../DeleteGroupDialog";
import type { GroupInfoOrganizerSectionProps } from "../../../types/group.types";

export default function GroupInfoOrganizerSection({
  organizerName,
  organizerContact,
  isCycleDone,
  isOrganizer,
  hasStarted,
  isMembersFull,
  isOnlyOrganizerLeft,
  isStarting,
  isDeleting,
  groupName,
  onStartCycle,
  onDeleteGroup,
}: GroupInfoOrganizerSectionProps) {
  return (
    <>
      <div className="flex justify-between items-center pt-2 border-t border-neutral-border/50">
        <span className="text-neutral-subtext flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-brand-accent" /> Organizer
        </span>
        <span className="font-bold text-foreground">
          {organizerName || "Organizer"}
        </span>
      </div>

      {organizerContact && !isCycleDone && (
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-brand-accent" /> Contact No.
          </span>
          <span className="font-mono text-xs font-semibold text-foreground">
            {organizerContact}
          </span>
        </div>
      )}

      {isOrganizer && !hasStarted && !isCycleDone && (
        <div className="pt-3 border-t border-neutral-border/50 flex flex-col gap-2.5 w-full">
          {isMembersFull && onStartCycle && (
            <button
              disabled={isStarting || isDeleting}
              onClick={onStartCycle}
              className="w-full h-11 text-xs flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground px-4 rounded-2xl font-bold active:opacity-90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={isStarting ? "animate-spin" : ""}
              />
              {isStarting ? "Starting..." : "Start Cycle"}
            </button>
          )}
          {onDeleteGroup && isOnlyOrganizerLeft && (
            <DeleteGroupDialog
              isDeleting={isDeleting}
              isStarting={isStarting}
              onDelete={onDeleteGroup}
              groupName={groupName}
            />
          )}
        </div>
      )}
    </>
  );
}
