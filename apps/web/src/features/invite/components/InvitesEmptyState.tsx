import { MailOpen } from "lucide-react";
import SendInviteButton from "@/shared/components/buttons/SendInviteButton";
import type { InvitesEmptyStateProps } from "../types/invite.types";

export default function InvitesEmptyState({ type }: InvitesEmptyStateProps = {}) {
  const isReceived = type === "received";
  const isSent = type === "sent";

  const title = isReceived
    ? "No Received Invitations"
    : isSent
      ? "No Sent Invitations"
      : "No Invitations Yet";

  const description = isReceived
    ? "You don't have any group invitations at the moment. When circle organizers invite you to join, they will appear here."
    : isSent
      ? "You haven't sent any invitations to other users yet. When you invite friends to your savings circles, you can track them here."
      : "You don't have any sent or received invitations at the moment. Invites will appear here once you send or receive one.";

  return (
    <div className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl border border-dashed border-neutral-border bg-card text-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20">
        <MailOpen className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-foreground">
          {title}
        </h3>
        <p className="text-xs text-neutral-subtext max-w-sm leading-relaxed">
          {description}
        </p>
      </div>

      {!isReceived && <SendInviteButton />}
    </div>
  );
}
