"use client";

import { Search, Layers, HelpCircle } from "lucide-react";
import { useSupportAssistance } from "../hooks/useSupportAssistance";
import { CONCERN_CATEGORIES } from "../constants/support.constants";
import SupportHeader from "../components/SupportHeader";
import SupportSectionPills from "../components/SupportSectionPills";
import SupportConcernCard from "../components/SupportConcernCard";
import SupportInquiryForm from "../components/SupportInquiryForm";
import SupportChannelsCard from "../components/SupportChannelsCard";

export default function DashboardSupportAssistance() {
  const {
    activeSection,
    setActiveSection,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    expandedConcernId,
    toggleExpand,
    filteredConcerns,
    formState,
    handleFormFieldChange,
    handleSubmitInquiry,
    isSubmitting,
  } = useSupportAssistance();

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <SupportHeader
        activeSection={activeSection}
        onNavigateSection={setActiveSection}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <SupportSectionPills
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {activeSection === "concerns" && (
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-subtext" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="w-full h-9 pl-9 pr-3 text-xs rounded-2xl bg-neutral-table-stripe border border-neutral-border text-foreground placeholder:text-neutral-subtext focus:border-brand-accent focus:outline-none transition-colors"
            />
          </div>
        )}
      </div>

      {activeSection === "concerns" && (
        <div className="space-y-6">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {CONCERN_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand-accent text-brand-accent-foreground shadow-2xs font-bold"
                      : "text-neutral-subtext hover:text-foreground hover:bg-neutral-table-stripe border border-transparent"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {filteredConcerns.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-border/80 bg-card p-10 text-center space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-subtext/10 text-neutral-subtext mx-auto flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground">
                  No matching concerns found
                </h3>
                <p className="text-xs text-neutral-subtext max-w-sm mx-auto">
                  Try searching with different keywords or submit a direct concern to our care team.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-table-stripe border border-neutral-border text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredConcerns.map((item) => (
                <SupportConcernCard
                  key={item.id}
                  item={item}
                  isExpanded={expandedConcernId === item.id}
                  onToggle={() => toggleExpand(item.id)}
                />
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-neutral-border/70 bg-gradient-to-r from-brand-accent/5 to-transparent p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                Did not find the answer to your specific issue?
              </h4>
              <p className="text-xs text-neutral-subtext">
                Send a message directly with your circle details and our customer care team will assist you.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSection("inquiry")}
              className="px-4 py-2 rounded-2xl bg-brand-accent text-brand-accent-foreground text-xs font-bold shadow-xs hover:bg-brand-accent-hover transition-all cursor-pointer shrink-0 active:scale-98"
            >
              Submit Your Concern
            </button>
          </div>
        </div>
      )}

      {activeSection === "inquiry" && (
        <SupportInquiryForm
          formState={formState}
          onChangeField={handleFormFieldChange}
          onSubmit={handleSubmitInquiry}
          isSubmitting={isSubmitting}
        />
      )}

      {activeSection === "channels" && <SupportChannelsCard />}
    </div>
  );
}
