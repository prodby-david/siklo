export type AboutItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type AboutProps = {
  title: string;
  description: string;
  items: AboutItem[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TrustItem = {
  id: string;
  title: string;
  description: string;
};

export type CoreValueItem = {
  id: string;
  title: string;
  description: string;
  highlightText: string;
  iconName: string;
};
