import {
  BookOpen,
  Scale,
  Eye,
  ShieldCheck,
  ListOrdered,
  Calculator,
  Lightbulb,
  LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface NavLinkItem {
  name: string;
  href: string;
  subItems?: NavSubItem[];
}

export const NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    subItems: [
      {
        id: "about-overview",
        name: "Overview",
        description: "Simple online notebook for Paluwagan savings circles.",
        href: "/about#overview",
        icon: BookOpen,
      },
      {
        id: "about-pillars",
        name: "Core Pillars",
        description: "Built on radical transparency, equity, and trust.",
        href: "/about#core-pillars",
        icon: Scale,
      },
      {
        id: "about-transparency",
        name: "Guaranteed Transparency",
        description: "100% shared visibility and zero middleman fees.",
        href: "/about#transparency",
        icon: Eye,
      },
      {
        id: "about-safety",
        name: "Safety & Governance",
        description: "Direct transfers and immutable activity audit logs.",
        href: "/about#safety-standards",
        icon: ShieldCheck,
      },
    ],
  },
  {
    name: "How it works",
    href: "/how-it-works",
    subItems: [
      {
        id: "how-steps",
        name: "3-Step Guide",
        description: "Create circle, track payments, receive payout pot.",
        href: "/how-it-works#how-it-works-steps",
        icon: ListOrdered,
      },
      {
        id: "how-simulator",
        name: "Cycle Calculator",
        description: "Interactive turn schedule and payout simulator.",
        href: "/how-it-works#cycle-calculator",
        icon: Calculator,
      },
      {
        id: "how-practices",
        name: "Best Practices",
        description: "Group guidelines for safe community saving.",
        href: "/how-it-works#best-practices",
        icon: Lightbulb,
      },
    ],
  },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
];
