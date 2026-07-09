import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import PolicySection from "@/features/policy/ui/PolicySection";

export default function PolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <PolicySection />
      <Footer />
    </div>
  );
}
