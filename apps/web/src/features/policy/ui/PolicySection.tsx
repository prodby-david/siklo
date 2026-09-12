"use client";

import PolicyTabSwitcher from "../components/PolicyTabSwitcher";
import PolicyToolbar from "../components/PolicyToolbar";
import PolicyTableOfContents from "../components/PolicyTableOfContents";
import PolicyContent from "../components/PolicyContent";
import { usePolicySection } from "../hooks/usePolicySection";

export default function PolicySection() {
  const {
    activeTab,
    searchQuery,
    setSearchQuery,
    activeSection,
    filteredSections,
    handleTabChange,
    handleShare,
    handlePrint,
    handleSectionClick,
    handleClearSearch,
  } = usePolicySection();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          Legal & Policy Center
        </h1>
        <p className="text-sm sm:text-base text-neutral-subtext">
          Please read these documents carefully to understand how we protect
          your information and the terms governing your use of Siklo.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-border/60 pb-6 mb-8">
        <PolicyTabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />
        <PolicyToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onPrint={handlePrint}
          onShare={handleShare}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <PolicyTableOfContents
          sections={filteredSections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
        <PolicyContent
          activeTab={activeTab}
          sections={filteredSections}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />
      </div>
    </main>
  );
}
