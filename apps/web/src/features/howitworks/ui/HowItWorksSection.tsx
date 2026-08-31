"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Crown, UserCheck } from "lucide-react";
import StepCard from "../components/StepCard";
import { HowItWorksProps, HowItWorksRole } from "../types/howitworks.types";
import {
  organizerSteps as defaultOrganizerSteps,
  memberSteps as defaultMemberSteps,
} from "../constants/howitworks.constants";

export const HowItWorksSection = ({
  title = "How to use this tool",
  organizerSteps = defaultOrganizerSteps,
  memberSteps = defaultMemberSteps,
  defaultRole = "ORGANIZER",
}: HowItWorksProps) => {
  const [activeRole, setActiveRole] = useState<HowItWorksRole>(defaultRole);

  const activeSteps = activeRole === "ORGANIZER" ? organizerSteps : memberSteps;

  const roleDescription =
    activeRole === "ORGANIZER"
      ? "A 3-step guide for group creators to manage members, verify contributions, and disburse turn payouts effortlessly."
      : "A 3-step guide for savers to join with an invite code, submit contribution proofs, and collect full rotation payouts.";

  return (
    <section className="w-full bg-transparent relative z-10 py-16 sm:py-24 flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-2xl mb-8 sm:mb-12 text-center flex flex-col items-center gap-3.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold">
            <Sliders className="w-3.5 h-3.5" />
            <span>Operational Workflow</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-lg">
            {roleDescription}
          </p>

          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-brand-accent/20 bg-background/80 dark:bg-card/80 backdrop-blur-xl shadow-xs mt-2">
            <button
              type="button"
              onClick={() => setActiveRole("ORGANIZER")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeRole === "ORGANIZER"
                  ? "bg-brand-accent text-white shadow-xs"
                  : "text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/5"
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>For Group Organizers</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole("MEMBER")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeRole === "MEMBER"
                  ? "bg-brand-accent text-white shadow-xs"
                  : "text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/5"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>For Circle Members</span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full items-stretch"
          >
            {activeSteps.map((step, index) => (
              <motion.div
                key={`${activeRole}-${step.stepNumber}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                className="h-full flex flex-col"
              >
                <StepCard step={step} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowItWorksSection;
