import { Users, Info } from "lucide-react";
import { GroupRotationSlotsProps } from "../../types/group.types";

export default function GroupRotationSlots({
  maxMembers,
  membershipsCount,
  memberships,
}: GroupRotationSlotsProps) {
  return (
    <div className="p-6 border border-neutral-border rounded-2xl bg-background shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3">
        <h3 className="text-md font-bold text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-accent" /> Rotation Schedule &
          Slots
        </h3>
        <span className="text-xs text-neutral-subtext font-medium bg-neutral-subtext/5 px-2.5 py-1 rounded-2xl border border-neutral-border/50">
          {maxMembers} Total Slots
        </span>
      </div>

      <div className="text-xs leading-relaxed text-neutral-subtext bg-brand-accent/5 p-3.5 rounded-2xl border border-brand-accent/10 flex items-start gap-2.5">
        <Info className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
        <p>
          Paluwagans run on a rotating payout system. Slots are filled by order
          of joining. Each billing cycle, one member is scheduled to receive the
          full payout pool.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {Array.from({ length: maxMembers }).map((_, index) => {
          const position = index + 1;
          const isFilled = position <= membershipsCount;
          const member = memberships?.find((m) => m.position === position);
          return (
            <div
              key={position}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-150 ${
                isFilled
                  ? "border-brand-accent/20 bg-brand-accent/5 text-foreground"
                  : "border-neutral-border bg-background hover:bg-neutral-subtext/5 text-neutral-subtext"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    isFilled
                      ? "bg-brand-accent text-background"
                      : "bg-neutral-border/40 text-neutral-subtext"
                  }`}
                >
                  {position}
                </span>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      isFilled ? "text-foreground" : "text-neutral-subtext/80"
                    }`}
                  >
                    {isFilled
                      ? member?.user?.name || "Member Joined"
                      : "Available Slot"}
                  </span>
                  <span className="text-[10px] text-neutral-subtext">
                    Payout Round {position}
                  </span>
                </div>
              </div>

              <div>
                {isFilled ? (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/15 px-2 py-0.5 rounded-full">
                    Occupied
                  </span>
                ) : (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext/60 border border-neutral-border px-2 py-0.5 rounded-full">
                    Open
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
