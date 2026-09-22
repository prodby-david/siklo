import {
  Check,
  X,
  Users,
  PhilippinePeso,
  Calendar,
  Mail,
  UserCheck,
  Loader2,
  RefreshCw,
  Ban,
} from "lucide-react";
import InviteStatusBadge from "../InviteStatusBadge";
import formatDate from "@/shared/utils/formatDate";
import type { InviteCardProps } from "../../types/invite.types";

export default function InviteCard(props: InviteCardProps) {
  if (props.type === "sent") {
    const { invite, onRevoke, onResend, isProcessing = false } = props;
    const isPending = invite.status === "PENDING";

    return (
      <div className="rounded-2xl border border-neutral-border/80 bg-card p-5 shadow-xs hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-foreground truncate">
                  {invite.groupName}
                </h3>
                <p className="text-xs text-neutral-subtext truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  <span>
                    Sent to{" "}
                    <strong className="font-semibold text-foreground">
                      {invite.recipientName || invite.recipientEmail}
                    </strong>
                  </span>
                </p>
              </div>
            </div>
            <InviteStatusBadge status={invite.status} />
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-border/50">
            <div className="flex items-center gap-2">
              {invite.inviteCode && (
                <span className="rounded-full bg-neutral-subtext/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                  Code: {invite.inviteCode}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-neutral-subtext">
              <Calendar className="w-3 h-3" />
              <span>Sent {formatDate(invite.sentAt)}</span>
            </div>
          </div>
        </div>

        {(onRevoke || onResend) && isPending && (
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-border/60">
            {onRevoke && (
              <button
                type="button"
                onClick={() => onRevoke(invite.id)}
                disabled={isProcessing}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-neutral-border hover:border-danger-border hover:bg-danger-bg hover:text-danger text-neutral-subtext transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Ban className="w-3.5 h-3.5" />
                )}
                <span>Revoke</span>
              </button>
            )}
            {onResend && (
              <button
                type="button"
                onClick={() => onResend(invite.id)}
                disabled={isProcessing}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>Resend</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  const { invite, onAccept, onDecline, isProcessing = false } = props;
  const groupName =
    invite.groupName ?? invite.group?.name ?? "Savings Circle";
  const contributionAmount =
    invite.contributionAmount ?? invite.group?.contributionAmount ?? 0;
  const billingCycle =
    invite.billingCycle ?? invite.group?.billingCycle ?? "MONTHLY";
  const organizerName =
    invite.invitedBy?.name ?? invite.organizer?.name ?? "Circle Organizer";
  const isPending = invite.status === "PENDING";

  return (
    <div className="rounded-2xl border border-neutral-border/80 bg-card p-5 shadow-xs hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-foreground truncate">
                {groupName}
              </h3>
              <p className="text-xs text-neutral-subtext truncate flex items-center gap-1.5 mt-0.5">
                <UserCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span>
                  Invited by{" "}
                  <strong className="font-semibold text-foreground">
                    {organizerName}
                  </strong>
                </span>
              </p>
            </div>
          </div>
          <InviteStatusBadge status={invite.status} />
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-border/50">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm font-extrabold text-foreground">
              <PhilippinePeso className="w-4 h-4 text-brand-accent" />
              <span>{contributionAmount.toLocaleString()}</span>
            </div>
            <span className="rounded-full bg-neutral-subtext/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
              {billingCycle}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-neutral-subtext">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(invite.createdAt)}</span>
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-border/60">
          <button
            type="button"
            onClick={() => onDecline?.(invite.id)}
            disabled={isProcessing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-neutral-border hover:border-danger-border hover:bg-danger-bg hover:text-danger text-neutral-subtext transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <X className="w-3.5 h-3.5" />
            )}
            <span>Decline</span>
          </button>
          <button
            type="button"
            onClick={() => onAccept?.(invite.id)}
            disabled={isProcessing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )}
            <span>Accept</span>
          </button>
        </div>
      ) : (
        <div className="pt-2 border-t border-neutral-border/60 flex items-center justify-between text-xs text-neutral-subtext">
          <span>Invitation {invite.status.toLowerCase()}</span>
          <span>{formatDate(invite.createdAt)}</span>
        </div>
      )}
    </div>
  );
}
