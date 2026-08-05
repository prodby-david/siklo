import type { Metadata } from "next";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import HelpSection from "@/features/help-support/ui/HelpSection";

export const metadata: Metadata = {
  title: "Help & Support | Siklo",
  description: "Find answers to frequently asked questions, user guides, and contact support for managing your Siklo savings group.",
};

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#30363d_1px,transparent_1px)] [background-size:16px_16px] z-0" />
      <HelpSection />
      <Footer />
    </div>
  );
}
