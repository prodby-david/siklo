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
