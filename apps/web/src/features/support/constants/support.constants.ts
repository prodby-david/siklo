import { ConcernCategory, ConcernItem } from "../types/support.types";

export const CONCERN_CATEGORIES: { id: ConcernCategory; label: string }[] = [
  { id: "all", label: "All Topics" },
  { id: "contributions", label: "Payments & Receipts" },
  { id: "payouts", label: "Turns & Payouts" },
  { id: "invites", label: "Groups & Invites" },
  { id: "account", label: "Account & Settings" },
];

export const CONCERN_ITEMS: ConcernItem[] = [
  {
    id: "payment-receipt-upload",
    category: "contributions",
    question: "How do I submit my payment receipt for my circle?",
    answer: "Go to your circle under Groups, select your upcoming contribution cycle, and upload a clear screenshot of your GCash or Maya payment receipt. The circle organizer will review and approve it.",
    actionHint: "Make sure the reference number and date are visible in your screenshot.",
  },
  {
    id: "payment-confirmation-delayed",
    category: "contributions",
    question: "My payment was sent, but the status is still pending. What should I do?",
    answer: "Your circle organizer manually verifies and confirms receipts to keep the ledger accurate. If it has been more than 24 hours, you can send a reminder message directly to the circle organizer.",
    actionHint: "Your uploaded receipt remains safe in the circle records as proof.",
  },
  {
    id: "payout-turn-schedule",
    category: "payouts",
    question: "How do I know when it is my turn to receive the group payout?",
    answer: "Open your group page to see the full rotation schedule. Each member is assigned a specific turn number and date based on the circle agreement established when the group was formed.",
    actionHint: "Your assigned payout date cannot be changed without organizer and group consent.",
  },
  {
    id: "payout-method-update",
    category: "payouts",
    question: "Where will my payout money be sent?",
    answer: "Payouts are sent directly to the GCash, Maya, or bank account you saved in your Account Settings. Ensure your account details are up to date before your scheduled turn date arrives.",
    actionHint: "Double-check your registered mobile number in Settings to avoid delays.",
  },
  {
    id: "invite-code-how-to-join",
    category: "invites",
    question: "How do I join a circle using an invite code?",
    answer: "From your Groups page, click the 'Join Group' button. Enter the 12-character invitation code provided by your group organizer, review the circle contribution terms, and confirm joining.",
    actionHint: "Invite codes are unique to each circle and should not be shared publicly.",
  },
  {
    id: "circle-member-limits",
    category: "invites",
    question: "What is the maximum number of members allowed in a circle?",
    answer: "Member limits depend on the circle organizer's subscription tier: Starter circles hold up to 8 members, Pro circles hold up to 15 members, and Premium circles hold up to 30 members.",
    actionHint: "Circles cannot accept new members once the member limit is reached.",
  },
  {
    id: "account-phone-update",
    category: "account",
    question: "How do I update my name, email, or GCash number?",
    answer: "Click on Settings at the bottom of the dashboard sidebar. You can update your display name, contact phone number, and payment account details at any time.",
    actionHint: "Changes to payment accounts take effect immediately for upcoming cycles.",
  },
  {
    id: "account-security-reminder",
    category: "account",
    question: "Does Siklo ever ask for my MPIN, OTP, or password?",
    answer: "No. Siklo staff, organizers, and support agents will never ask for your MPIN, one-time passwords (OTP), or account passwords. Always keep these credentials private.",
    actionHint: "Never share confidential banking PINs with anyone.",
  },
];

export const SUPPORT_CONTACT_INFO = {
  email: "support@siklo.ph",
  serviceHours: "Monday to Saturday, 8:00 AM – 8:00 PM (PST)",
  averageResponseTime: "Typically within 2 to 4 hours during service hours",
  emergencyNote: "For urgent concerns with an active payout cycle, please reach out to your group organizer first.",
};
