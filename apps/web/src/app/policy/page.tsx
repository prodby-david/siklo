import type { Metadata } from "next";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import PolicySection from "@/features/policy/ui/PolicySection";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms | Siklo",
  description: "Read Siklo's Privacy Policy and Terms of Service for data protection, transparent Paluwagan ledger guidelines, and user rights.",
};

export default function PolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#30363d_1px,transparent_1px)] [background-size:16px_16px] z-0" />
      <PolicySection />
      <Footer />
    </div>
  );
}
