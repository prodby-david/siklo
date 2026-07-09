import JoinGroupButton from "../buttons/JoinGroup";
import JoinGroupModalButton from "../buttons/JoinGroupModalButton";
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

export default function JoinGroupModal() {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
    showModal,
    setShowModal,
    handleShowModal,
  } = useInviteCode();

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger render={<JoinGroupButton onClick={handleShowModal} />} />
      <DialogContent>
        <form onSubmit={handleSubmit}>
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
          <JoinGroupModalButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
