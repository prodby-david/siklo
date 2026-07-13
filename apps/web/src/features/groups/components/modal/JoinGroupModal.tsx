import JoinGroupButton from "../buttons/JoinGroup";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import useInviteCode from "../../hooks/useInviteCode";
import { LogIn, ArrowLeft } from "lucide-react";

export default function JoinGroupModal() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showModal,
    setShowModal,
    handleShowModal,
    step,
    setStep,
    preview,
    selectedSlot,
    setSelectedSlot,
  } = useInviteCode();

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger render={<JoinGroupButton onClick={handleShowModal} />} />
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {step === "code" ? (
            <>
              <DialogHeader>
                <DialogTitle>Join Group</DialogTitle>
                <DialogDescription>
                  <Label htmlFor="inviteCode">
                    Please enter the group invite code to join.
                  </Label>
                  <Input
                    id="inviteCode"
                    placeholder="Invite Code"
                    className="mt-4"
                    {...register("inviteCode")}
                  />
                </DialogDescription>
                {errors.inviteCode && (
                  <p className="text-xs font-semibold mt-3 text-danger">
                    {errors.inviteCode.message}
                  </p>
                )}
              </DialogHeader>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-xs flex items-center justify-center gap-2 bg-brand-accent text-background px-4 py-2.5 rounded-2xl font-semibold active:opacity-90 transition-all shadow-sm cursor-pointer mt-5 disabled:opacity-50 disabled:pointer-events-none"
              >
                <LogIn size={14} />
                {isSubmitting ? "Searching..." : "Next"}
              </button>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select Payout Slot</DialogTitle>
                <DialogDescription>
                  <span className="text-xs text-neutral-subtext block">
                    Choose your rotation position in <strong>{preview?.name}</strong>.
                  </span>

                  <div className="grid grid-cols-4 gap-2.5 mt-4 max-h-60 overflow-y-auto p-0.5">
                    {Array.from({ length: preview?.maxMembers || 0 }, (_, i) => {
                      const slot = i + 1;
                      const isOccupied = preview?.memberships.some(
                        (m) => m.position === slot,
                      );
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all duration-150 cursor-pointer ${
                            isOccupied
                              ? "bg-neutral-subtext/5 border-neutral-border text-neutral-subtext/40 cursor-not-allowed"
                              : isSelected
                                ? "bg-brand-accent/10 border-brand-accent text-brand-accent ring-1 ring-brand-accent/20"
                                : "bg-background border-neutral-border hover:bg-neutral-subtext/5 text-foreground"
                          }`}
                        >
                          <span>#{slot}</span>
                          {isOccupied && (
                            <span className="text-[8px] font-medium mt-0.5 opacity-60">
                              Taken
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setStep("code");
                  }}
                  className="flex-1 text-xs flex items-center justify-center gap-2 border border-neutral-border bg-background hover:bg-neutral-subtext/5 text-foreground px-4 py-2.5 rounded-2xl font-semibold active:opacity-90 transition-all cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedSlot}
                  className="flex-1 text-xs flex items-center justify-center gap-2 bg-brand-accent text-background px-4 py-2.5 rounded-2xl font-semibold active:opacity-90 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  <LogIn size={14} />
                  {isSubmitting ? "Joining..." : "Join Group"}
                </button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
