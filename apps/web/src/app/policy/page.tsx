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
      <PolicySection />
      <Footer />
    </div>
  );
}
