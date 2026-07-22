import React from "react";
import AboutCard from "../components/AboutCard";
import AboutStatusCard from "../components/AboutStatusCard";
import { AboutProps } from "../types/about.types";
import { ShieldCheck } from "lucide-react";

export default function AboutSection({
  title,
  description,
  items,
}: AboutProps) {
  return (
    <section className="w-full bg-background py-16 sm:py-24 flex items-center justify-center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center justify-center w-full">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold self-start">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>About Siklo</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {title}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
                {description}
              </p>
            </div>

            <AboutStatusCard />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {items.map((item) => (
              <AboutCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
