import { Search } from "lucide-react";
import { PolicySection, PolicyTab } from "../types/policy.types";

type PolicyContentProps = {
  activeTab: PolicyTab;
  sections: PolicySection[];
  searchQuery: string;
  onClearSearch: () => void;
};

export default function PolicyContent({
  activeTab,
  sections,
  searchQuery,
  onClearSearch,
}: PolicyContentProps) {
  return (
    <div className="lg:col-span-9">
      <div className="border border-neutral-border/50 rounded-2xl bg-background p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-border/60 pb-6 mb-8 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h2>
            <p className="text-xs text-neutral-subtext mt-1">
              Last Updated: July 2, 2026
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-semibold rounded-full w-fit">
            Official Document
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none flex flex-col gap-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                {section.title}
              </h3>
              <div className="flex flex-col gap-3">
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-xs sm:text-sm text-neutral-subtext leading-relaxed"
                  >
                    {searchQuery ? (
                      <span>
                        {para
                          .split(new RegExp(`(${searchQuery})`, "gi"))
                          .map((part, index) =>
                            part.toLowerCase() ===
                            searchQuery.toLowerCase() ? (
                              <mark
                                key={index}
                                className="bg-yellow-200 dark:bg-yellow-800 text-foreground px-0.5 rounded-2xl"
                              >
                                {part}
                              </mark>
                            ) : (
                              part
                            )
                          )}
                      </span>
                    ) : (
                      para
                    )}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {sections.length === 0 && (
            <div className="py-12 text-center">
              <Search className="w-12 h-12 text-neutral-border/60 mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground">
                No matches found
              </p>
              <p className="text-xs text-neutral-subtext mt-1">
                We couldn&apos;t find any sections matching &quot;{searchQuery}
                &quot;. Try adjusting your keywords.
              </p>
              <button
                onClick={onClearSearch}
                className="mt-4 px-4 py-2 bg-brand-accent text-white text-xs font-bold rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
