import { CheckCircle2, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import { schemesData } from "../constants/schemes.constants";

export default function PaluwaganGuide() {
  const bestPractices = [
    {
      title: "Choose a Trusted Organizer",
      desc: "Since Siklo handles record keeping and not funds, choose an organizer who is highly trustworthy, accessible, and organized.",
    },
    {
      title: "Agree on Late Fees Early",
      desc: "Late payments delay everyone's payouts. Setting up a small late penalty per day encourages members to contribute on time.",
    },
    {
      title: "Keep a Small Backup Fund",
      desc: "Veteran saving circles often contribute a small extra amount (e.g. 5% of one contribution) as a reserve to cover temporary delays.",
    },
    {
      title: "Use Clear Payment Channels",
      desc: "Standardize GCash, Maya, or bank transfers. Instruct members to send references or receipts directly to the organizer for verification.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Understanding Payout Schemes
            </h3>
            <p className="text-xs text-neutral-subtext mt-1">
              Select the best turn order system that matches your circle's
              goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schemesData.map((scheme) => {
              const Icon = scheme.icon;
              return (
                <div
                  key={scheme.id}
                  className="p-4 rounded-2xl border border-neutral-border bg-neutral-table-stripe/20 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-brand-accent shrink-0" />
                    <h4 className="text-xs font-bold text-foreground">
                      {scheme.title}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
                    {scheme.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Circle Best Practices
            </h3>
            <p className="text-xs text-neutral-subtext mt-1">
              Follow these community-proven guidelines to keep your cycles run
              smoothly.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {bestPractices.map((practice, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-neutral-border bg-background flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-xs font-bold text-brand-accent">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-foreground">
                    {practice.title}
                  </h4>
                </div>
                <p className="text-xs text-neutral-subtext leading-relaxed font-normal ml-7">
                  {practice.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
