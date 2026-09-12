import type { Metadata } from "next";
import HowItWorksUI from "@/features/howitworks/ui/HowItWorksUI";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import DotsBackground from "@/shared/components/ui/DotsBackground";

export const metadata: Metadata = {
  title: "How It Works | Siklo - 3-Step Rotation Savings Guide",
  description: "Learn how Siklo simplifies Paluwagan rotation savings in 3 easy steps. Simulate contributions, preview payout turns, and follow circle best practices.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <DotsBackground />
      <main className="flex-1 flex flex-col w-full items-center overflow-x-clip">
        <HowItWorksUI />
      </main>
      <Footer />
    </div>
  );
}
