export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Create Group", href: "/group/create" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Rotation Simulator", href: "/how-it-works" },
      { label: "Group Ledger", href: "/features" },
    ],
  },
  {
    title: "Legal & Support",
    links: [
      { label: "Privacy Policy", href: "/policy?tab=privacy" },
      { label: "Terms of Service", href: "/policy?tab=terms" },
      { label: "Help & Support", href: "/help" },
    ],
  },
];
