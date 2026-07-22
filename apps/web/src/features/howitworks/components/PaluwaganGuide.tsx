import React from "react";
import { BookOpen } from "lucide-react";
import { schemesData } from "../constants/schemes.constants";
import { bestPractices } from "../constants/howitworks.constants";
import PayoutSchemeItem from "./PayoutSchemeItem";
import BestPracticeItem from "./BestPracticeItem";

export default function PaluwaganGuide() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Schemes & Best Practices</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Paluwagan Guide & Guidelines
        </h3>

        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
          Select the best turn scheme for your circle and follow community-proven best practices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <h4 className="text-base font-extrabold text-foreground pb-2 border-b border-neutral-border/60">
            Understanding Payout Schemes
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schemesData.map((scheme) => (
              <PayoutSchemeItem
                key={scheme.id}
                title={scheme.title}
                desc={scheme.desc}
                icon={scheme.icon}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-5">
          <h4 className="text-base font-extrabold text-foreground pb-2 border-b border-neutral-border/60">
            Circle Best Practices
          </h4>

          <div className="flex flex-col gap-3.5">
            {bestPractices.map((practice) => (
              <BestPracticeItem key={practice.id} practice={practice} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
