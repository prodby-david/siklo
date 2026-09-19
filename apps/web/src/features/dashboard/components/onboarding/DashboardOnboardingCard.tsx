"use client";

import Link from "next/link";
import {
  Wallet,
  Users,
  PlusCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import { hasUsablePaymentAccount } from "@/shared/utils/hasUsablePaymentAccount";
import JoinGroupModal from "@/features/groups/components/modals/JoinGroupModal";
import CreateGroupButton from "@/features/groups/components/buttons/CreateGroup";

export default function DashboardOnboardingCard() {
  const { data: user } = useGetCurrentName();
  const isAccountSetup = hasUsablePaymentAccount(user?.paymentAccounts);

  return (
    <section className="w-full rounded-3xl border border-neutral-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-border/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-foreground leading-tight">
              Get Started with Siklo
            </h2>
            <p className="text-xs sm:text-sm text-neutral-subtext mt-0.5">
              Complete these steps to begin saving and tracking your paluwagan turns.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-brand-accent/30 bg-brand-accent/10 text-brand-accent self-start sm:self-auto">
          Starter Checklist
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/30 flex flex-col justify-between gap-4 shadow-2xs hover:border-neutral-border transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
                <Wallet className="w-4.5 h-4.5" />
              </div>
              {isAccountSetup ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-success">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning-bg px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-warning">
                  <AlertCircle className="w-3 h-3" /> Required
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                Step 1
              </span>
              <h3 className="text-sm font-extrabold text-foreground leading-tight">
                Setup Payout Account
              </h3>
              <p className="text-[11px] text-neutral-subtext leading-relaxed">
                Add your GCash, Maya, or bank account so organizers can disburse your lump sum when your turn arrives.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-border/50">
            <Link
              href="/settings"
              className="inline-flex items-center justify-between w-full text-xs font-bold text-brand-accent hover:text-brand-accent-hover transition-colors cursor-pointer group"
            >
              <span>{isAccountSetup ? "Manage Payment Accounts" : "Configure Payout"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/30 flex flex-col justify-between gap-4 shadow-2xs hover:border-neutral-border transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
                <Users className="w-4.5 h-4.5" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-neutral-border/70 bg-neutral-table-stripe text-neutral-subtext">
                Have Code
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                Step 2
              </span>
              <h3 className="text-sm font-extrabold text-foreground leading-tight">
                Join a Savings Circle
              </h3>
              <p className="text-[11px] text-neutral-subtext leading-relaxed">
                Enter an invite code provided by your circle organizer to claim an available rotation slot.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-border/50 flex items-center justify-between">
            <JoinGroupModal />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-border/70 bg-neutral-table-stripe/30 flex flex-col justify-between gap-4 shadow-2xs hover:border-neutral-border transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
                <PlusCircle className="w-4.5 h-4.5" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
                Organizer
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                Step 3
              </span>
              <h3 className="text-sm font-extrabold text-foreground leading-tight">
                Start Your Own Circle
              </h3>
              <p className="text-[11px] text-neutral-subtext leading-relaxed">
                Create a paluwagan circle, define contribution amounts and cycles, and invite trusted members.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-border/50 flex items-center justify-between">
            <CreateGroupButton />
          </div>
        </div>
      </div>
    </section>
  );
}
