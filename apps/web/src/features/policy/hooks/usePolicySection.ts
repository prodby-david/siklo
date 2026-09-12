"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { PolicyTab } from "../types/policy.types";
import { privacySections } from "../constants/policy.constants";
import { termsSections } from "@/features/terms/constants/terms.constants";
import { filterSections, scrollToSection } from "../utils/policy.utils";

export function usePolicySection() {
  const [activeTab, setActiveTab] = useState<PolicyTab>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "privacy" || tab === "terms") {
        return tab;
      }
    }
    return "privacy";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");

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

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return {
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
  };
}
