import AboutCard from "../components/AboutCard";
import { AboutProps } from "../types/about.types";

export default function AboutSection({
  title,
  description,
  items,
}: AboutProps) {
  return (
    <section className="w-full bg-background py-12 md:py-20 flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-brand-accent">
                Group Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
                {description}
              </p>
            </div>

            <div className="border border-neutral-border rounded-lg p-4 bg-neutral-table-stripe/30 flex flex-col gap-2.5 max-w-md">
              <div className="flex justify-between items-center text-xs text-neutral-subtext font-bold">
                <span>Notebook Status</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              </div>
              <div className="flex justify-between text-xs font-semibold text-neutral-subtext">
                <span>Record Keeping:</span>
                <span className="text-brand-accent">Safe & Saved</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-neutral-subtext">
                <span>Payout Turns:</span>
                <span className="text-foreground">Fixed & Fair</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-neutral-subtext">
                <span>Group Rules:</span>
                <span className="text-foreground">Clear to Everyone</span>
              </div>
            </div>
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
