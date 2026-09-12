"use client";

import { Mail } from "lucide-react";

export default function InvitesSection() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Group Invitations
        </h1>
        <p className="text-sm text-neutral-subtext">
          Review and respond to Paluwagan groups you have been invited to join.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-neutral-border bg-card text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-foreground">Invitations Coming Soon</h3>
        <p className="text-xs text-neutral-subtext max-w-sm">
          Incoming group invitations will appear here for you to accept or decline.
        </p>
      </div>
    </div>
  );
}
