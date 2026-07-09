"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PolicyTab } from "../types/policy.types";
import { privacySections } from "../constants/policy.constants";
import { termsSections } from "@/features/terms/constants/terms.constants";
import { filterSections, scrollToSection } from "../utils/policy.utils";
import PolicyTabSwitcher from "../components/PolicyTabSwitcher";
import PolicyToolbar from "../components/PolicyToolbar";
import PolicyTableOfContents from "../components/PolicyTableOfContents";
import PolicyContent from "../components/PolicyContent";

export default function PolicySection() {
  const [activeTab, setActiveTab] = useState<PolicyTab>("privacy");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "privacy" || tab === "terms") {
        setActiveTab(tab);
      }
    }
  }, []);

  const sections = activeTab === "privacy" ? privacySections : termsSections;
  const filteredSections = filterSections(sections, searchQuery);

  const handleTabChange = (tab: PolicyTab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setActiveSection("");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/policy?tab=${activeTab}`;
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleSectionClick = (id: string) => {
    scrollToSection(id);
    setActiveSection(id);
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
          onClearSearch={() => setSearchQuery("")}
        />
      </div>
    </main>
  );
}
