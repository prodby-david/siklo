"use client";

import Badge from "../components/Badge";
import CycleVisualizer from "../components/CycleVisualizer";
import Link from "next/link";
import Image from "next/image";
import { HeroProps } from "../types/hero.types";
import { BookOpen, Coins } from "lucide-react";
import GetStartedButton from "@/shared/components/buttons/GetStartedButton";
import { motion } from "framer-motion";
import {
  heroContainerVariants,
  heroVisualizerVariants,
  heroBadgeVariants,
  heroTitleVariants,
  heroSubtitleVariants,
  heroCtaVariants,
} from "../constants/hero.motion";

export const HeroSection = ({
  badgeText = "Paluwagan Savings Notebook",
  badgeLink = "Simple & Safe",
  title = (
    <>
      Organize your{" "}
      <span className="text-brand-accent font-extrabold">rotation savings</span>{" "}
      with total clarity
    </>
  ),
  subtitle = "Siklo is a simple online notebook for your saving group. Easily see who has paid, who gets paid next, and keep your savings organized without any stress.",
  primaryCtaText = "Let's Get Started",
  secondaryCtaText = "How Siklo Works",
  members,
  stats,
  isSplashFinished = false,
}: HeroProps) => {
  return (
    <section className="w-full min-h-[calc(100vh-3.5rem)] bg-background flex items-center justify-center relative overflow-hidden py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          className="relative w-full max-w-3xl flex flex-col items-center justify-center text-center gap-6 my-auto"
          variants={heroContainerVariants}
          initial="hidden"
          animate={isSplashFinished ? "visible" : "hidden"}
        >
          <motion.div variants={heroVisualizerVariants} className="w-full flex flex-col items-center">
            <CycleVisualizer members={members} stats={stats} isSplashFinished={isSplashFinished} />
          </motion.div>

          <motion.div variants={heroBadgeVariants}>
            <Badge text={badgeText} linkText={badgeLink} />
          </motion.div>

          <motion.h1
            variants={heroTitleVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight relative z-10"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={heroSubtitleVariants}
            className="max-w-2xl text-base sm:text-lg text-neutral-subtext leading-relaxed font-normal relative z-10"
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={heroCtaVariants}
            className="flex flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2 relative z-10"
          >
            <GetStartedButton
              size="md"
              text={primaryCtaText}
              icon={<Coins className="w-4 h-4" />}
            />
            <Link
              href="/how-it-works"
              className="flex h-11 px-6 items-center justify-center gap-2 rounded-2xl border border-neutral-border bg-background text-xs sm:text-sm font-extrabold text-neutral-subtext hover:bg-neutral-table-stripe hover:text-foreground cursor-pointer transition-all duration-150 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>{secondaryCtaText}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
