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
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { hasUsablePaymentAccount } from "@/shared/utils/hasUsablePaymentAccount";
import { LogIn, Wallet } from "lucide-react";

export default function JoinGroupModal() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showModal,
    setShowModal,
    handleShowModal,
  } = useInviteCode();
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();
  const needsSetup =
    !isUserLoading && !hasUsablePaymentAccount(user?.paymentAccounts);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger render={<JoinGroupButton onClick={handleShowModal} />} />
      <DialogContent>
        {needsSetup ? (
          <div className="space-y-4 text-center py-2">
            <div className="mx-auto flex w-fit items-center justify-center p-3 rounded-2xl bg-brand-accent/10 text-brand-accent">
              <Wallet className="w-6 h-6" />
            </div>
            <DialogTitle>Payment setup required</DialogTitle>
            <p className="text-sm text-neutral-subtext">
              Add at least one payment account number in your settings before
              joining a group, so the organizer knows where to send your
              payout.
            </p>
            <a
              href="/settings"
              className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-background px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
            >
              Go to Settings
            </a>
          </div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
