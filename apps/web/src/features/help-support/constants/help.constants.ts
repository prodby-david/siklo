import { HelpCategory } from "../types/help.type";

export const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: "BookOpen",
    items: [
      {
        question: "What is Siklo?",
        answer: "Siklo is a transparent digital notebook and tracking tool designed for Paluwagan (rotating savings and credit community groups) in the Philippines. It helps groups stay organized, eliminate manual bookkeeping errors, and build trust."
      },
      {
        question: "How do I create a Paluwagan group on Siklo?",
        answer: "Once logged in, click on the 'Create Group' button from your dashboard. Fill in the group name, individual contribution amounts, cycle frequency (weekly, semi-monthly, or monthly), and add your member list."
      },
      {
        question: "Is Siklo free to use?",
        answer: "Yes, Siklo is 100% free to use for tracking and managing your Paluwagan savings cycles with your friends, family, or colleagues."
      }
    ]
  },
  {
    id: "group-management",
    name: "Group Management",
    icon: "Users",
    items: [
      {
        question: "Who can edit the group records?",
        answer: "Only the group creator (administrator) has permissions to modify records, update payment statuses, and advance cycles. Members have access to a read-only view where they can verify logs."
      },
      {
        question: "Can I change the payout order after starting a cycle?",
        answer: "Yes, group administrators can reorder the payout turns in the group settings page, provided the cycle has not yet passed those turns."
      },
      {
        question: "How do I add or remove members?",
        answer: "Navigate to your Group Dashboard, click on 'Manage Members', and select 'Add Member' or 'Remove Member'. Note that members cannot be removed if they have already received a payout in the current active cycle."
      }
    ]
  },
  {
    id: "payouts",
    name: "Payouts & Contributions",
    icon: "DollarSign",
    items: [
      {
        question: "How does payment verification work?",
        answer: "Siklo is a ledger-only app. Contributions are sent directly between members using GCash, Maya, bank transfer, or cash. Once sent, the administrator verifies the payment and marks the member as 'Paid' in Siklo."
      },
      {
        question: "What happens if a member defaults on a payment?",
        answer: "Siklo provides clear visual indicators and history logs for late or pending payments. However, since Siklo is not a financial intermediary and does not hold funds, resolution of member defaults is handled directly by the group administrator and members according to group agreements."
      },
      {
        question: "Does Siklo take any commission or fee from payouts?",
        answer: "No, Siklo never touches your funds. We do not charge fees, commissions, or transaction cuts. All contributions go 100% directly to the member whose turn it is."
      }
    ]
  },
  {
    id: "security",
    name: "Security & Accounts",
    icon: "ShieldAlert",
    items: [
      {
        question: "Is my personal data secure on Siklo?",
        answer: "Yes. We protect your account details with industry-standard security. Ledger records are restricted to members of your specific group."
      },
      {
        question: "How do I delete my account?",
        answer: "You can request account deletion from the Account Settings page. Deleting your account will anonymize your name on past group records to preserve ledger integrity for other group members."
      },
      {
        question: "Can anyone join my Paluwagan group?",
        answer: "No. Your Paluwagan group is private. Only users who are explicitly added by the group administrator or who join via the group's secure invitation link can view the ledger."
      }
    ]
  }
];
