"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileWarning,
  FileSpreadsheet,
  EyeOff,
  FileX,
  BellOff,
  CalendarX,
  Banknote,
  MessageSquareOff,
  Zap,
  Eye,
  Tag,
  CalendarCheck,
  Wallet,
  MessageSquare,
} from "lucide-react";

interface ComparisonItem {
  text: string;
  icon: React.ReactNode;
}

const traditionalDrawbacks: ComparisonItem[] = [
  {
    text: "Manual math errors in turn calculations",
    icon: <FileSpreadsheet className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Zero real-time visibility for group members",
    icon: <EyeOff className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Risk of lost, damaged, or altered paper pages",
    icon: <FileX className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Awkward payment reminders & missing logs",
    icon: <BellOff className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Disputed payout schedules & unclear turn sequence",
    icon: <CalendarX className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Cash handling stress & untracked physical receipts",
    icon: <Banknote className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "No central group communication or updates",
    icon: <MessageSquareOff className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
];

const sikloAdvantages: ComparisonItem[] = [
  {
    text: "100% automated turn schedule & lump sum payout math",
    icon: <Zap className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Live shared ledger accessible to all members 24/7",
    icon: <Eye className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Encrypted cloud backups with unalterable audit trails",
    icon: <ShieldCheck className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Instant payment status tags & clear rotation visibility",
    icon: <Tag className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Pre-calculated turn rotation & transparent payout calendar",
    icon: (
      <CalendarCheck className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
    ),
  },
  {
    text: "Mobile wallet friendly & digital proof logs",
    icon: <Wallet className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Built-in group chat & instant activity notifications",
    icon: (
      <MessageSquare className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
    ),
  },
];

export default function PaluwaganComparisonSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-background border-y border-neutral-border relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center flex flex-col items-center gap-3.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Why Switch to <span className="text-brand-accent">Siklo</span>?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-xl">
            Eliminate payment confusion, manual ledger errors, and missing
            notebook records with a transparent digital Paluwagan system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 p-7 sm:p-8 rounded-3xl bg-neutral-table-stripe/60 border border-neutral-border/80 relative overflow-hidden transition-transform duration-300 ease-in-out -rotate-1 hover:rotate-0"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-border/60">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-danger/10 border border-danger/20 text-danger">
                <FileWarning className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-foreground">
                  Traditional Paper Notebook
                </h3>
                <span className="text-xs font-bold text-neutral-subtext">
                  Manual & Vulnerable to Errors
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {traditionalDrawbacks.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-xs sm:text-sm text-neutral-subtext font-medium"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 p-7 sm:p-8 rounded-3xl bg-brand-accent/10 border border-brand-accent/30 relative overflow-hidden shadow-lg shadow-brand-accent/5 transition-transform duration-300 ease-in-out rotate-1 hover:rotate-0"
          >
            <div className="flex items-center justify-between pb-4 border-b border-brand-accent/20 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-accent text-white shadow-sm ">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    Siklo
                  </h3>
                  <span className="text-xs font-extrabold text-brand-accent">
                    Automated & 100% Transparent
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1 relative z-10">
              {sikloAdvantages.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-xs sm:text-sm text-foreground font-semibold"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
