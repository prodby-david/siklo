import { PolicySection } from "../types/policy.type";

type PolicyTableOfContentsProps = {
  sections: PolicySection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
};

export default function PolicyTableOfContents({
  sections,
  activeSection,
  onSectionClick,
}: PolicyTableOfContentsProps) {
  return (
    <aside className="lg:col-span-3 hidden lg:block">
      <div className="sticky top-20 border border-neutral-border/50 rounded-2xl p-5 bg-neutral-table-stripe/20">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
          Table of Contents
        </h2>
        <nav className="flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`text-left text-xs py-1 transition-all cursor-pointer border-l-2 pl-3 ${
                activeSection === section.id
                  ? "text-brand-accent border-brand-accent font-semibold"
                  : "text-neutral-subtext border-transparent hover:text-foreground hover:border-neutral-border"
              }`}
            >
              {section.title}
            </button>
          ))}
          {sections.length === 0 && (
            <p className="text-xs text-neutral-subtext italic">
              No sections match search
            </p>
          )}
        </nav>
      </div>
    </aside>
  );
}
