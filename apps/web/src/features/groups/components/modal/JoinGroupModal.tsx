import JoinGroupButton from "../buttons/JoinGroup";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { FormInput as Input } from "@/shared/components/inputs";
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
          <DialogHeader>
            <DialogTitle>Join Group</DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Please enter the group invite code to join.
              </span>
            </DialogDescription>
          </DialogHeader>
          <Input
            label="inviteCode"
            labelText=""
            placeholder="Invite Code"
            className="mt-4"
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-xs flex items-center justify-center gap-2 bg-brand-accent text-background px-4 py-2.5 rounded-2xl font-semibold active:opacity-90 transition-all shadow-sm cursor-pointer mt-5 disabled:opacity-50 disabled:pointer-events-none"
          >
            <LogIn size={14} />
            {isSubmitting ? "Joining Group..." : "Join Group"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
