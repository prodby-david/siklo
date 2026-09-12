export type FaqItem = {
  question: string;
  answer: string;
};

export type HelpCategory = {
  id: string;
  name: string;
  icon: string;
  items: FaqItem[];
};

export interface HelpToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export interface HelpFaqAccordionProps {
  items: FaqItem[];
}

export interface HelpCategorySelectorProps {
  categories: HelpCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}
