import type { Metadata } from "next";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import HelpSection from "@/features/help-support/ui/HelpSection";
import DotsBackground from "@/shared/components/ui/DotsBackground";

export const metadata: Metadata = {
  title: "Help & Support | Siklo",
  description: "Find answers to frequently asked questions, user guides, and contact support for managing your Siklo savings group.",
};

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <DotsBackground />
      <HelpSection />
      <Footer />
    </div>
  );
}
