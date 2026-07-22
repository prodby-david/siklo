"use client";

import Badge from "../components/Badge";
import CycleVisualizer from "../components/CycleVisualizer";
import Link from "next/link";
import Image from "next/image";
import { HeroProps } from "../types/hero.types";
import { ArrowRight, BookOpen } from "lucide-react";

export const HeroSection = ({
  badgeText = "Paluwagan Savings Notebook",
  badgeLink = "Simple & Safe",
  title = (
    <>
      Keep track of your{" "}
      <span className="text-brand-accent font-extrabold">Paluwagan</span>{" "}
      savings group
    </>
  ),
  subtitle = "Siklo is a simple online notebook for your saving group. Easily see who has paid, who gets paid next, and keep your savings organized without any stress.",
  primaryCtaText = "Let's Get Started",
  secondaryCtaText = "How Siklo Works",
  members,
  stats,
}: HeroProps) => {
  return (
    <section className="w-full min-h-[calc(100vh-3.5rem)] bg-background flex items-center justify-center relative overflow-hidden py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center justify-center text-center">
        <div className="relative w-full max-w-3xl flex flex-col items-center justify-center text-center gap-6 my-auto">
          <CycleVisualizer members={members} stats={stats} />

          <div className="flex sm:hidden justify-center my-1 animate-siklo-float">
            <Image
              src="/images/siklo-waving.svg"
              alt="Siklo Mascot Waving"
              width={120}
              height={120}
              priority
            />
          </div>

          <Badge text={badgeText} linkText={badgeLink} />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight relative z-10">
            {title}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-neutral-subtext leading-relaxed font-normal relative z-10">
            {subtitle}
          </p>

          <div className="flex flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2 relative z-10">
            <Link
              href="/signin"
              className="flex h-11 px-6 items-center justify-center gap-2 rounded-2xl bg-brand-accent text-xs sm:text-sm font-extrabold text-white hover:bg-brand-accent-hover cursor-pointer transition-all duration-150 active:scale-95 shadow-md hover:shadow-brand-accent/20"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="flex h-11 px-6 items-center justify-center gap-2 rounded-2xl border border-neutral-border bg-background text-xs sm:text-sm font-extrabold text-neutral-subtext hover:bg-neutral-table-stripe hover:text-foreground cursor-pointer transition-all duration-150 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>{secondaryCtaText}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
