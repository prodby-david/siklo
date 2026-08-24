import { HelpCategory, FaqItem } from "../types/help.types";

export type FilteredFaqResult = {
  categoryName: string;
  categoryId: string;
  item: FaqItem;
};

export function searchHelpFaq(
  categories: HelpCategory[],
  query: string
): FilteredFaqResult[] {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  const results: FilteredFaqResult[] = [];

  for (const category of categories) {
    for (const item of category.items) {
      if (
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          categoryName: category.name,
          categoryId: category.id,
          item,
        });
      }
    }
  }

  return results;
}
