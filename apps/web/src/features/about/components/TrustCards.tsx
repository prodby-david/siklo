import { trustItems } from "../constants/about.constants";
import getIcon from "../utils/getIcon";

export default function TrustCards() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">Why Trust Siklo?</h3>
        <p className="text-xs text-neutral-subtext">
          How we ensure transparency, clarity, and reliability in your cycles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {trustItems.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-lg border border-neutral-border bg-background flex flex-col gap-3 hover:border-brand-accent"
          >
            <div className="h-9 w-9 rounded-md bg-brand-accent/10 flex items-center justify-center">
              {getIcon(item.id)}
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-bold text-foreground">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
