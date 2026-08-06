"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import PricingCard from "./PricingCard";
import PricingBillingToggle from "./PricingBillingToggle";
import PricingFaqItem from "./PricingFaqItem";
import { PRICING_PLANS, PRICING_FAQS } from "../constants/pricing.constants";
import { usePricingView } from "../hooks/usePricingView";
import { Tag, HelpCircle } from "lucide-react";
import DotsBackground from "@/shared/components/ui/DotsBackground";

export default function PricingView() {
  const { interval, toggleInterval } = usePricingView();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <Navbar />
      <DotsBackground />

      <main className="flex-1">
        <section className="relative z-10 py-16 md:py-24 bg-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold">
                <Tag className="w-3.5 h-3.5" />
                <span>Simple & Transparent Pricing</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Affordable Plans for Every{" "}
                <span className="text-brand-accent">Paluwagan Group</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-neutral-subtext leading-relaxed">
                Start tracking your savings cycle for free. Upgrade as your group grows with no hidden transaction cuts.
              </p>

              <div className="pt-4">
                <PricingBillingToggle
                  interval={interval}
                  onToggle={toggleInterval}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
              {PRICING_PLANS.map((plan, index) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  interval={interval}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-t border-neutral-border/60 bg-transparent relative z-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-2"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center justify-center gap-2">
                <HelpCircle className="w-6 h-6 text-brand-accent" /> Frequently Asked Questions
              </h2>
              <p className="text-xs md:text-sm text-neutral-subtext">
                Got questions about Siklo Paluwagan pricing? We have answers.
              </p>
            </motion.div>

            <div className="space-y-4">
              {PRICING_FAQS.map((faq, idx) => (
                <PricingFaqItem key={idx} faq={faq} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
