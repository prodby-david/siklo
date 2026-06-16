import { FeatureItem } from "../types/features.types";

export const defaultFeatures: FeatureItem[] = [
  {
    id: "ledger",
    title: "Shared Ledger",
    description: "Every member gets immediate visibility of the contribution history. No hidden notebook entries or secret updates.",
    iconName: "BookOpen",
  },
  {
    id: "turns",
    title: "Automatic Payout Order",
    description: "Compute payouts, member turns, and cycle progression instantly. Say goodbye to manual calculation mistakes.",
    iconName: "Calendar",
  },
  {
    id: "tags",
    title: "Live Status Tags",
    description: "Easily identify who has contributed, who is next in line, and who has an overdue payment with clear color-coded tags.",
    iconName: "Tag",
  },
  {
    id: "local",
    title: "Built for GCash & Maya",
    description: "Tailored for the Filipino savings culture (Paluwagan) with support for mobile wallet payment logging.",
    iconName: "Wallet",
  },
  {
    id: "mobile",
    title: "Mobile-First Design",
    description: "Runs smoothly on Safari, Chrome, or any mobile browser. Access your group on any device without installing anything.",
    iconName: "Smartphone",
  },
  {
    id: "security",
    title: "Secure Bookkeeping",
    description: "Keep records safe in the cloud. We don't touch your money—Siklo only keeps tracking organized and transparent.",
    iconName: "Shield",
  },
];
