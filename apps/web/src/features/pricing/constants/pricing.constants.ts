import { PricingPlan } from "../types/pricing.types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Great for individuals starting their first savings group with family or friends.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    isPopular: false,
    ctaText: "Start Free",
    ctaHref: "/signup",
    features: [
      { text: "1 Active Savings Group", included: true },
      { text: "Up to 5 Members per Group", included: true },
      { text: "Standard Payout Schedule & Queue", included: true },
      { text: "Real-Time Activity Audit Logs", included: true },
      { text: "Custom Rotation Cycles", included: false },
      { text: "Broadcast Announcements", included: false },
      { text: "Priority Support Assistance", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Ideal for active organizers running multiple savings circles and larger teams.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    isPopular: true,
    ctaText: "Choose Pro",
    ctaHref: "/signup",
    features: [
      { text: "Up to 5 Active Savings Groups", included: true },
      { text: "Up to 15 Members per Group", included: true },
      { text: "Standard & Free-Choice Queue", included: true },
      { text: "Real-Time Activity Audit Logs", included: true },
      { text: "Custom Rotation Cycles", included: true },
      { text: "Broadcast Announcements", included: true },
      { text: "Priority Support Assistance", included: true },
      { text: "Dedicated Account Manager", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "Designed for community leaders, large cooperatives, and high-volume circles.",
    monthlyPrice: 199,
    yearlyPrice: 159,
    isPopular: false,
    ctaText: "Choose Premium",
    ctaHref: "/signup",
    features: [
      { text: "Unlimited Active Savings Groups", included: true },
      { text: "Unlimited Members Capacity", included: true },
      { text: "All Queue Types (FCFS, Free-Choice, Random)", included: true },
      { text: "Real-Time Activity Audit Logs", included: true },
      { text: "Custom Rotation Cycles & Start Dates", included: true },
      { text: "Unlimited Broadcast Announcements", included: true },
      { text: "Priority Support Assistance", included: true },
      { text: "Dedicated Account Manager & 24/7 Support", included: true },
    ],
  },
];

export const PRICING_FAQS = [
  {
    question: "How does Siklo pricing work?",
    answer: "Siklo is free to start for your first group. Upgrade to Pro (₱99/mo) or Premium (₱199/mo) anytime to expand your group and member capacity.",
  },
  {
    question: "Can I switch plans anytime?",
    answer: "Yes, you can upgrade, downgrade, or switch between monthly and annual billing options whenever you need.",
  },
  {
    question: "Are there any hidden payout fees?",
    answer: "No. Siklo has simple subscription plans with zero hidden fees on your payout pools.",
  },
];
