"use client";

import Link from "next/link";
import { Mail, ArrowRight, Users } from "lucide-react";

export default function EmptyInvitesState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-14 bg-background border border-neutral-border rounded-3xl text-center space-y-4 shadow-sm relative overflow-hidden">
      <div className="w-16 h-16 rounded-3xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shadow-xs">
        <Mail className="w-8 h-8" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-extrabold text-lg md:text-xl text-foreground">
          No Pending Invites or Requests
        </h3>
        <p className="text-xs md:text-sm text-neutral-subtext leading-relaxed">
          You currently have no pending group invitations or active requests waiting for approval. Have an invite code from your organizer?
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/group"
          className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-background text-xs font-extrabold px-5 py-3 rounded-2xl transition-all duration-200 active:scale-95 shadow-sm"
        >
          <Users className="w-4 h-4" />
          <span>Explore & Join Groups</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
