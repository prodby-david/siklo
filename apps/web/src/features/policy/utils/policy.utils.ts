import { PolicySection } from "../types/policy.type";

export function filterSections(
  sections: PolicySection[],
  query: string
): PolicySection[] {
  if (!query) return sections;
  const lowerQuery = query.toLowerCase();
  return sections.filter(
    (section) =>
      section.title.toLowerCase().includes(lowerQuery) ||
      section.paragraphs.some((para) =>
        para.toLowerCase().includes(lowerQuery)
      )
  );
}

export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
