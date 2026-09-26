export type SupportSection = "concerns" | "inquiry" | "channels";

export type ConcernCategory =
  | "all"
  | "contributions"
  | "payouts"
  | "invites"
  | "account";

export interface ConcernItem {
  id: string;
  category: ConcernCategory;
  question: string;
  answer: string;
  actionHint?: string;
}

export interface SupportInquiryFormState {
  fullName: string;
  email: string;
  category: ConcernCategory;
  groupName: string;
  details: string;
}
