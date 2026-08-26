import { PricingPlan } from "../types/pricing.types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    description:
      "Great for individuals starting their first savings group with family or friends.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    isPopular: false,
    ctaText: "Start Free",
    ctaHref: "/signup",
    features: [
      { text: "1 Active Paluwagan Group", included: true },
      { text: "Up to 10 Members per Circle", included: true },
      { text: "Automated Turn & Schedule Math", included: true },
      { text: "First Come, First Serve Payout Sequence", included: true },
      { text: "E-wallets, Cash & Bank Payment Types", included: true },
      { text: "Proof Upload & Verification Logs", included: true },
      { text: "Basic In-App Notifications & Activity Feed", included: true },
      { text: "Siklo AI Assistant Access", included: false },
      { text: "Advance Payout Requests & Disbursements", included: false },
      { text: "Exportable PDF Financial Statements", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    description:
      "Ideal for active organizers running multiple savings circles and larger teams.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    isPopular: true,
    isComingSoon: true,
    ctaText: "Coming Soon",
    ctaHref: "#",
    features: [
      { text: "Up to 5 Active Paluwagan Groups", included: true },
      { text: "Up to 25 Members per Circle", included: true },
      { text: "All Rotation Draw & Free Choice Slot Rules", included: true },
      { text: "Broadcast Group Announcements to Members", included: true },
      { text: "Advance Payout Requests & Disbursements", included: true },
      { text: "Real-Time Group Activity Feed & History", included: true },
      { text: "Exportable Financial & Audit Reports", included: true },
      { text: "Siklo AI Assistant Access", included: false },
      { text: "Custom Group Invite Branding", included: false },
      { text: "Priority 24/7 Support Assistance", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    description:
      "Designed for community leaders, large cooperatives, and high-volume circles.",
    monthlyPrice: 99,
    yearlyPrice: 89,
    isPopular: false,
    isComingSoon: true,
    ctaText: "Coming Soon",
    ctaHref: "#",
    features: [
      { text: "Unlimited Active Paluwagan Groups", included: true },
      { text: "Up to 50 Members Capacity", included: true },
      {
        text: "Siklo AI Assistant Access",
        included: true,
      },
      { text: "Multi-Group & Multi-Cycle Overview", included: true },
      { text: "Broadcast Announcements Across All Groups", included: true },
      { text: "Advance Payout Tracking & Audit Export", included: true },
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
      "Siklo is free to start for your first group. Upgrade to Pro (₱49/mo) or Premium (₱99/mo) anytime to expand your group and member capacity with zero hidden transaction cuts.",
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
