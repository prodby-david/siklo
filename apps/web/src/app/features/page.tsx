import type { Metadata } from "next";
import Navbar from "@/shared/components/nav/Navbar";
import FeaturesSection from "@/features/features/ui/FeaturesSection";
import Footer from "@/shared/components/footer/Footer";

export const metadata: Metadata = {
  title: "Features | Siklo - Digital Paluwagan Notebook Capabilities",
  description: "Explore Siklo features: automated turn scheduling, transparent audit ledgers, encrypted backups, and digital payment verification for your savings circle.",
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center">
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
