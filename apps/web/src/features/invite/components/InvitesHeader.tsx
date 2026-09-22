import { Mail } from "lucide-react";

export default function InvitesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-border/60 pb-5">
      <div className="space-y-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Group Invitations
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-neutral-subtext">
          Review circles you have been invited to join and manage invites you
          have sent to others.
        </p>
      </div>
    </div>
  );
}
