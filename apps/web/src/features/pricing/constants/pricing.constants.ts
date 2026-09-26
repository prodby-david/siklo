import { PricingPlan } from "../types/pricing.types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    description:
      "Great for families, friends, or coworkers starting their first savings circle.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    isPopular: false,
    ctaText: "Start Free",
    ctaHref: "/signup",
    features: [
      { text: "1 Active Paluwagan Group", included: true },
      { text: "Up to 8 Members per Circle", included: true },
      { text: "Automated Turn & Schedule Math", included: true },
      { text: "All Turn Modes (Lucky Draw, First-Come, Free Pick)", included: true },
      { text: "E-wallets, Bank & Cash Payment Types", included: true },
      { text: "Receipt Upload & Proof Verification", included: true },
      { text: "Broadcast Group Announcements", included: true },
      { text: "Advance Payout Requests & Activity Feed", included: true },
      { text: "Downloadable PDF Statements", included: false },
      { text: "Siklo AI Assistant Access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    description:
      "Ideal for active organizers running multiple savings circles and larger groups.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    isPopular: true,
    isComingSoon: true,
    ctaText: "Coming Soon",
    ctaHref: "#",
    features: [
      { text: "Up to 5 Active Paluwagan Groups", included: true },
      { text: "Up to 15 Members per Circle", included: true },
      { text: "All Core Rotation Rules & Announcements", included: true },
      { text: "Downloadable Financial & Audit Statements", included: true },
      { text: "Custom Group Invite Branding", included: true },
      { text: "Priority Support Assistance", included: true },
      { text: "Siklo AI Assistant Access", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    description:
      "Designed for community leaders, large cooperatives, and high-volume circles.",
    monthlyPrice: 199,
    yearlyPrice: 159,
    isPopular: false,
    isComingSoon: true,
    ctaText: "Coming Soon",
    ctaHref: "#",
    features: [
      { text: "Unlimited Active Paluwagan Groups", included: true },
      { text: "Up to 30 Members Capacity", included: true },
      { text: "Siklo AI Assistant Access", included: true },
      { text: "Multi-Group & Multi-Cycle Overview", included: true },
      { text: "Downloadable Financial & Audit Statements", included: true },
      { text: "Custom Group Invite Links & Branding", included: true },
      { text: "Priority 24/7 Support Assistance", included: true },
      { text: "Early Access to New Features", included: true },
    ],
  },
];

export const PRICING_FAQS = [
  {
    question: "How does Siklo pricing work?",
    answer:
      "Siklo is free to start for your first group. Upgrade to Pro (₱99/mo) or Premium (₱199/mo) anytime to expand your group and member capacity with zero hidden transaction cuts.",
  },
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes, you can upgrade, downgrade, or switch between monthly and annual billing options whenever you need.",
  },
  {
    question: "Are there any hidden payout fees?",
    answer:
      "No. Siklo has simple subscription plans with zero hidden fees on your payout pools.",
  },
  {
    question: "Which plan includes Siklo AI Assistant?",
    answer:
      "Siklo AI Assistant is an exclusive feature on the Premium plan, offering intelligent automated group guidance, context-aware savings insights, and automated group management tools.",
  },
];
