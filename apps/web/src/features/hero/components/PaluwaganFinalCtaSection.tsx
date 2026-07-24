"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";
import GetStartedButton from "@/shared/components/buttons/GetStartedButton";

export default function PaluwaganFinalCtaSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-background border-b border-neutral-border relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl bg-gradient-to-br from-brand-accent/20 via-brand-accent/10 to-indigo-500/10 border border-brand-accent/30 p-8 sm:p-14 relative overflow-hidden text-center flex flex-col items-center gap-6 shadow-xl shadow-brand-accent/10"
        >
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/35 text-brand-accent text-xs font-extrabold relative z-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Start?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight max-w-3xl relative z-10">
            Ready to simplify your{" "}
            <span className="text-brand-accent">savings group</span>?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-medium max-w-xl relative z-10">
            Join thousands running 100% transparent, stress-free savings cycles
            today. Set up your group and invite trusted members in under 2
            minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-2 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <ShieldCheck className="h-4 w-4 text-brand-accent shrink-0" />
              <span>100% Shared Transparency</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0" />
              <span>Mobile Wallet Friendly</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0" />
              <span>Automated Turn Schedules</span>
            </div>
          </div>

          <div className="mt-4 relative z-10">
            <GetStartedButton
              size="lg"
              text="Start Your Group Cycle Now"
              icon={<RefreshCcw className="w-5 h-5" />}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
