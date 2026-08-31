"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Lock, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaluwaganSafetyStandards() {
  const standards = [
    {
      id: "direct-transfers",
      icon: ShieldCheck,
      badgeText: "Non-Custodial Protocol",
      title: "Direct Member-to-Member Transfers",
      description:
        "Siklo never holds, manages, or locks your money. Contributions are transferred 100% directly between members using your trusted mobile wallets (GCash, Maya) or cash, eliminating middleman fees and deposit risks.",
    },
    {
      id: "activity-audit",
      icon: FileText,
      badgeText: "Immutable Ledger",
      title: "Real-Time Audit Trail",
      description:
        "Every single contribution verification, turn advance, and announcement generates a timestamped entry in the group's activity feed. Every circle member gets an identical, real-time record history.",
    },
    {
      id: "cycle-governance",
      icon: Lock,
      badgeText: "Protected Rotation",
      title: "Locked Turn Governance",
      description:
        "Once a Paluwagan cycle starts, turn positions and payout dates are locked to prevent arbitrary changes. Clear permissions distinguish organizer verification duties from member read-only rights.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Operational Safety & Governance</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          How Siklo Protects Your Group Ledger
        </h3>

        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
          Strict operational standards designed specifically to preserve community trust and eliminate disputes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {standards.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
              className="h-full"
            >
              <div className="h-full rounded-3xl border border-brand-accent/20 dark:border-brand-accent/25 bg-background/80 dark:bg-card/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-xs hover:border-brand-accent/50 transition-all duration-300">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-full border border-brand-accent/20">
                      {item.badgeText}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-foreground tracking-tight">
                    {item.title}
                  </h4>

                  <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full rounded-3xl border border-brand-accent/30 bg-gradient-to-r from-brand-accent/10 via-background/80 to-brand-accent/10 dark:from-brand-accent/10 dark:via-card/80 dark:to-brand-accent/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-xs"
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25 flex items-center justify-center shrink-0 hidden sm:flex">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-foreground">
              Have questions about how Siklo handles Paluwagan rules?
            </h5>
            <p className="text-xs text-neutral-subtext mt-0.5">
              Explore our complete, searchable Help & Support knowledge base.
            </p>
          </div>
        </div>

        <Link
          href="/help"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold rounded-2xl transition-all shadow-xs active:scale-95 whitespace-nowrap cursor-pointer"
        >
          <span>Visit Help & Support</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
