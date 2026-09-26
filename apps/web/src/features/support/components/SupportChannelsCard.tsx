import { Mail, Clock, ShieldCheck, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SUPPORT_CONTACT_INFO } from "../constants/support.constants";

export default function SupportChannelsCard() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_CONTACT_INFO.email);
    setCopied(true);
    toast.success("Support email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-neutral-border/70 bg-card p-5 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Official Helpdesk Email
            </h3>
            <p className="text-xs text-neutral-subtext mt-0.5">
              Send us inquiries, screenshots, or dispute notices directly.
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-neutral-table-stripe border border-neutral-border/60">
            <span className="text-xs font-mono font-bold text-foreground">
              {SUPPORT_CONTACT_INFO.email}
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-1 rounded-lg hover:bg-neutral-border/40 text-neutral-subtext hover:text-foreground transition-colors cursor-pointer"
              title="Copy email"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-border/70 bg-card p-5 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Customer Care Hours
            </h3>
            <p className="text-xs text-neutral-subtext mt-0.5">
              {SUPPORT_CONTACT_INFO.serviceHours}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-table-stripe border border-neutral-border/60 text-xs text-neutral-subtext">
            {SUPPORT_CONTACT_INFO.averageResponseTime}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-border/70 bg-card p-5 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-foreground">
            Account Protection Reminder
          </h4>
          <p className="text-xs text-neutral-subtext leading-relaxed">
            Siklo is a 100% transparent rotation ledger. We will never ask for your banking passwords, GCash MPIN, or SMS OTP codes. Keep your account secure at all times.
          </p>
        </div>
      </div>
    </div>
  );
}
