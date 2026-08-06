import { PolicySection } from "../types/policy.types";

export const privacySections: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    paragraphs: [
      "Welcome to Siklo. We are committed to protecting your privacy and ensuring a transparent, secure environment for your Paluwagan activities.",
      "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application."
    ]
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    paragraphs: [
      "Account Data: When you sign up, we collect personal information such as your name, email address, and profile picture to identify you within your group.",
      "Paluwagan Group Data: We store group settings, member lists, total contribution amounts, payout schedules, and payout turns created by the group administrator.",
      "Ledger Information: We keep records of payment statuses (such as paid, pending, or late) and cycle payout distribution details as recorded by you or your group administrator.",
      "Technical Data: We collect standard logs, including IP addresses, browser types, and device configurations, to monitor app health and security."
    ]
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Your Information",
    paragraphs: [
      "To provide, operate, and maintain the ledger synchronization features of our application.",
      "To send transactional notifications, updates, and payment alerts related to your Paluwagan cycles.",
      "To identify and resolve technical issues, prevent fraudulent activities, and maintain system stability."
    ]
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing and Disclosure",
    paragraphs: [
      "Group Transparency: Within a specific Paluwagan group, members can view other members' names, payout queue position, and payment histories to ensure collective accountability.",
      "No Commercial Selling: We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
      "Legal Requirements: We may disclose information if required to do so by law or in response to valid requests by public authorities."
    ]
  },
  {
    id: "data-security",
    title: "5. Data Security",
    paragraphs: [
      "We employ industry-standard administrative and technical security measures to protect your database records from unauthorized access, modification, or disclosure.",
      "However, please note that no method of transmission over the internet or database storage is completely secure, and we cannot guarantee absolute security."
    ]
  },
  {
    id: "account-deletion",
    title: "6. Your Rights and Deletion",
    paragraphs: [
      "You have the right to access and update your account details at any time through your profile page.",
      "You can request account deletion. Upon deletion, your personal information will be anonymized, but group ledger histories may be preserved for transparency to other members."
    ]
  }
];
