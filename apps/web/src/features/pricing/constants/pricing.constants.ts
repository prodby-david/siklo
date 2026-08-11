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
      { text: "Up to 5 Members per Circle", included: true },
      { text: "Automated Turn Schedule Math", included: true },
      { text: "Read-Only Shared Ledger View", included: true },
      { text: "Mobile Wallet Receipt Logs", included: true },
      { text: "Basic In-App Notifications", included: true },
      { text: "Custom Rotation Draw Rules", included: false },
      { text: "Exportable Audit Statements", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    description:
      "Ideal for active organizers running multiple savings circles and larger teams.",
    monthlyPrice: 99,
    yearlyPrice: 89,
    isPopular: true,
    isComingSoon: true,
    ctaText: "Coming Soon",
    ctaHref: "#",
    features: [
      { text: "Up to 5 Active Paluwagan Groups", included: true },
      { text: "Up to 15 Members per Circle", included: true },
      { text: "Custom Draw & Slot Reservation", included: true },
      { text: "Real-Time Group Activity Feed", included: true },
      { text: "Automated Payment Reminders", included: true },
      { text: "Exportable PDF/Excel Reports", included: true },
      { text: "Broadcast Group Announcements", included: true },
      { text: "Dedicated Community Manager", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    description:
      "Designed for community leaders, large cooperatives, and high-volume circles.",
    monthlyPrice: 199,
    yearlyPrice: 179,
    isPopular: false,
    isComingSoon: true,
    ctaText: "Coming Soon",
    ctaHref: "#",
    features: [
      { text: "Unlimited Active Paluwagan Groups", included: true },
      { text: "Unlimited Members Capacity", included: true },
      { text: "Multi-Cycle & Multi-Group View", included: true },
      { text: "Priority 24/7 Support Assistance", included: true },
      { text: "Dedicated Community Manager", included: true },
      { text: "Custom Group Invite Branding", included: true },
      { text: "Automated Audit & Compliance", included: true },
      { text: "Early Access to New Features", included: true },
    ],
  },
];

export const PRICING_FAQS = [
  {
    question: "How does Siklo pricing work?",
    answer:
      "Siklo is free to start for your first group. Upgrade to Pro (₱49/mo) or Premium (₱99/mo) anytime to expand your group and member capacity.",
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
];
