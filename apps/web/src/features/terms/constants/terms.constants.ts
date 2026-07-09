import { PolicySection } from "../types/terms.type";

export const termsSections: PolicySection[] = [
  {
    id: "agreement-to-terms",
    title: "1. Agreement to Terms",
    paragraphs: [
      "By creating an account or using Siklo, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the application."
    ]
  },
  {
    id: "financial-disclaimer",
    title: "2. Financial Disclaimer & Nature of Service",
    paragraphs: [
      "Siklo is a digital tracking tool and digital ledger for managing rotating savings and credit associations (locally known as Paluwagan).",
      "Siklo is NOT a bank, financial institution, trust, credit agency, or licensed money transmitter. We do not hold, receive, transfer, invest, or process physical or digital funds.",
      "All monetary contributions and distributions are made directly between members of each group. Siklo is entirely a ledger of record."
    ]
  },
  {
    id: "group-rules-default",
    title: "3. Group Management & Defaults",
    paragraphs: [
      "Group administrators are solely responsible for configuring group rules, payout turns, contribution amounts, and validating payment receipts.",
      "Siklo is not responsible or liable for any member defaults, unpaid contributions, disputes, or administrative mistakes made within a group.",
      "Members participate at their own risk and are responsible for establishing mutual trust before joining any shared ledger."
    ]
  },
  {
    id: "user-conduct",
    title: "4. User Accounts and Conduct",
    paragraphs: [
      "You must provide accurate and complete information when registering an account.",
      "You are responsible for safeguarding your credentials. You agree not to disclose your password to any third party.",
      "You may not use Siklo for illegal purposes, fraudulent record keeping, or money laundering activities."
    ]
  },
  {
    id: "limitation-of-liability",
    title: "5. Limitation of Liability",
    paragraphs: [
      "Siklo is provided on an 'as-is' and 'as-available' basis without warranties of any kind.",
      "To the maximum extent permitted by law, Siklo and its creators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from user defaults or app downtime."
    ]
  },
  {
    id: "governing-law",
    title: "6. Governing Law",
    paragraphs: [
      "These terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law principles."
    ]
  }
];
