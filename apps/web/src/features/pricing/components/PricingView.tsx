"use client";

import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import PricingCard from "./PricingCard";
import usePricingView from "../hooks/usePricingView";
import { PRICING_PLANS, PRICING_FAQS } from "../constants/pricing.constants";
import { Coins, Sparkles, HelpCircle } from "lucide-react";
import DotsBackground from "@/shared/components/ui/DotsBackground";

export default function PricingView() {
  const { interval, toggleInterval } = usePricingView();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <DotsBackground />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24 border-b border-neutral-border/60 bg-transparent relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-bold text-brand-accent border border-brand-accent/20">
              <Coins className="w-3.5 h-3.5" /> Simple, Transparent Pricing
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
              Flexible Plans for Every <span className="text-brand-accent">Savings Circle</span>
            </h1>

            <p className="text-sm md:text-base text-neutral-subtext max-w-xl mx-auto leading-relaxed">
              Start free with your friends or upgrade to Pro or Premium to expand your group capacity, member limits, and priority support.
            </p>

            <div className="pt-6 flex items-center justify-center gap-3">
              <span className={`text-xs font-extrabold ${interval === "MONTHLY" ? "text-foreground" : "text-neutral-subtext"}`}>
                Monthly Billing
              </span>

              <button
                onClick={toggleInterval}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-border p-1 transition-colors cursor-pointer"
                aria-label="Toggle billing interval"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-brand-accent transition-transform ${
                    interval === "YEARLY" ? "translate-x-5 bg-background" : "translate-x-0"
                  }`}
                />
              </button>

              <span className={`text-xs font-extrabold flex items-center gap-1.5 ${interval === "YEARLY" ? "text-foreground" : "text-neutral-subtext"}`}>
                Yearly Billing
                <span className="rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-black uppercase px-2 py-0.5 border border-emerald-500/20">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} interval={interval} />
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20 border-t border-neutral-border/60 bg-transparent relative z-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center justify-center gap-2">
                <HelpCircle className="w-6 h-6 text-brand-accent" /> Frequently Asked Questions
              </h2>
              <p className="text-xs md:text-sm text-neutral-subtext">
                Got questions about Siklo Paluwagan pricing? We have answers.
              </p>
            </div>

            <div className="space-y-4">
              {PRICING_FAQS.map((faq, idx) => (
                <div key={idx} className="p-6 bg-background/80 backdrop-blur-md relative z-10 border border-neutral-border/60 rounded-2xl space-y-1.5 shadow-xs">
                  <h3 className="font-extrabold text-sm md:text-base text-foreground">{faq.question}</h3>
                  <p className="text-xs md:text-sm text-neutral-subtext leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
