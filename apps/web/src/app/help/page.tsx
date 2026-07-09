import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import HelpSection from "@/features/help-support/ui/HelpSection";

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <HelpSection />
      <Footer />
    </div>
  );
}
