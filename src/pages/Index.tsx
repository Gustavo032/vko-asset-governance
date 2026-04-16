import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Governance from "@/components/landing/Governance";
import ValueSection from "@/components/landing/ValueSection";
import InteractiveTools from "@/components/landing/InteractiveTools";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ValueSection />
      <Governance />
      <InteractiveTools />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
