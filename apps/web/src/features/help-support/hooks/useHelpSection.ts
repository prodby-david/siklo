"use client";

import { useState, useMemo } from "react";
import { helpCategories } from "../constants/help.constants";
import { searchHelpFaq } from "../utils/help.utils";

export function useHelpSection() {
  const [activeCategoryId, setActiveCategoryId] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(
    () => searchHelpFaq(helpCategories, searchQuery),
    [searchQuery],
  );
  const isSearching = searchQuery.length > 0;

  const currentCategory = useMemo(
    () => helpCategories.find((c) => c.id === activeCategoryId),
    [activeCategoryId],
  );
  const currentFaqs = currentCategory ? currentCategory.items : [];

  return {
    activeCategoryId,
    setActiveCategoryId,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    currentCategory,
    currentFaqs,
    helpCategories,
  };
}
