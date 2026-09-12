export type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PolicyTab = "privacy" | "terms";

export interface PolicyTableOfContentsProps {
  sections: PolicySection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export interface PolicyToolbarProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onPrint?: () => void;
  onShare: () => void;
}

export interface PolicyTabSwitcherProps {
  activeTab: PolicyTab;
  onTabChange: (tab: PolicyTab) => void;
}

export interface PolicyContentProps {
  activeTab: PolicyTab;
  sections: PolicySection[];
  searchQuery: string;
  onClearSearch: () => void;
}
