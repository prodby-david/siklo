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
