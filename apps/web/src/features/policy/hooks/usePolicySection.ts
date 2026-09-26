"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import type { PolicyTab } from "../types/policy.types";
import { privacySections } from "../constants/policy.constants";
import { termsSections } from "@/features/terms/constants/terms.constants";
import { filterSections, scrollToSection } from "../utils/policy.utils";

export function usePolicySection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab");
  const activeTab: PolicyTab = tabParam === "terms" ? "terms" : "privacy";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const sections = activeTab === "privacy" ? privacySections : termsSections;
  const filteredSections = filterSections(sections, searchQuery);
  const activeSection = selectedSectionId || (filteredSections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSelectedSectionId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      },
    );

    filteredSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredSections]);

  const handleTabChange = (tab: PolicyTab) => {
    setSelectedSectionId("");
    setSearchQuery("");
    router.replace(`/policy?tab=${tab}`, { scroll: false });
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
    setSelectedSectionId(id);
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
