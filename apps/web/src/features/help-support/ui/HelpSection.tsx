"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { helpCategories } from "../constants/help.constants";
import { searchHelpFaq } from "../utils/help.utils";
import HelpCategorySelector from "../components/HelpCategorySelector";
import HelpFaqAccordion from "../components/HelpFaqAccordion";
import HelpContactForm from "../components/HelpContactForm";
import HelpToolbar from "../components/HelpToolbar";

export default function HelpSection() {
  const [activeCategoryId, setActiveCategoryId] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchHelpFaq(helpCategories, searchQuery);
  const isSearching = searchQuery.length > 0;

  const currentCategory = helpCategories.find(
    (c) => c.id === activeCategoryId
  );
  const currentFaqs = currentCategory ? currentCategory.items : [];

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          Help & Support Center
        </h1>
        <p className="text-sm sm:text-base text-neutral-subtext">
          How can we help you today? Find answers to frequently asked questions
          or contact support.
        </p>
      </div>

      <HelpToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {isSearching ? (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSearchQuery("")}
              className="flex items-center gap-2 text-xs font-semibold text-brand-accent hover:opacity-90 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Categories
            </button>
            <span className="text-xs text-neutral-subtext">
              Found {searchResults.length} result(s) for &quot;{searchQuery}&quot;
            </span>
          </div>

          {searchResults.length > 0 ? (
            <HelpFaqAccordion items={searchResults.map((res) => res.item)} />
          ) : (
            <div className="text-center py-12 border border-dashed border-neutral-border/60 rounded-2xl bg-background">
              <Search className="w-12 h-12 text-neutral-border/60 mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground">
                No matching answers found
              </p>
              <p className="text-xs text-neutral-subtext mt-1">
                Try searching for other terms or submit a request below.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-12">
          <HelpCategorySelector
            categories={helpCategories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={setActiveCategoryId}
          />

          <div className="mb-8">
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-4">
              {currentCategory?.name}
            </h2>
            <HelpFaqAccordion items={currentFaqs} />
          </div>
        </div>
      )}

      <div className="border-t border-neutral-border/60 pt-10">
        <HelpContactForm />
      </div>
    </main>
  );
}
