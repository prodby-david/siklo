import type { Metadata } from "next";
import AboutUI from "@/features/about/ui/AboutUI";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import DotsBackground from "@/shared/components/ui/DotsBackground";

export const metadata: Metadata = {
  title: "About Us | Siklo - Simple & Clear Paluwagan Savings Notebook",
  description: "Siklo is a clean online notebook for your Paluwagan. Easily see who has paid, who gets the money next, and keep your group savings records clear.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <DotsBackground />
      <main className="flex-1 flex flex-col w-full items-center overflow-x-clip">
        <AboutUI />
        <Footer />
      </main>
    </div>
  );
}
