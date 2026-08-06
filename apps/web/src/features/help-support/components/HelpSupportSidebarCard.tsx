import Link from "next/link";
import { Clock, Mail, ShieldCheck, ExternalLink, MessageSquare } from "lucide-react";

export default function HelpSupportSidebarCard() {
  return (
    <div className="flex flex-col gap-4 border border-neutral-border rounded-2xl bg-background p-6 shadow-sm relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">Direct Support Info</h3>
          <p className="text-[11px] text-neutral-subtext">We are here to assist your Paluwagan group</p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-subtext/5 border border-neutral-border/50">
          <Clock className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground block">Fast Response SLA</span>
            <p className="text-[11px] text-neutral-subtext leading-relaxed">
              Average ticket response time under <span className="font-semibold text-brand-accent">2 hours</span> during Philippine business hours.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-subtext/5 border border-neutral-border/50">
          <Mail className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground block">Official Support Email</span>
            <a
              href="mailto:support@siklo.ph"
              className="text-xs font-semibold text-brand-accent hover:underline block"
            >
              support@siklo.ph
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-subtext/5 border border-neutral-border/50">
          <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground block">Ledger Integrity Guarantee</span>
            <p className="text-[11px] text-neutral-subtext leading-relaxed">
              100% shared visibility for all members with zero hidden ledger edits.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-border/60 pt-4 flex flex-col gap-2">
        <span className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">Quick Helpful Links</span>
        <Link
          href="/how-it-works"
          className="inline-flex items-center justify-between text-xs text-neutral-subtext hover:text-brand-accent transition-colors py-1"
        >
          <span>Paluwagan 3-Step Rotation Guide</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
        <Link
          href="/policy"
          className="inline-flex items-center justify-between text-xs text-neutral-subtext hover:text-brand-accent transition-colors py-1"
        >
          <span>Privacy & Terms of Service</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
