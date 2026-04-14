import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Governance from "@/components/landing/Governance";
import ValueSection from "@/components/landing/ValueSection";
import Differentials from "@/components/landing/Differentials";
import Application from "@/components/landing/Application";
import Benefits from "@/components/landing/Benefits";
import InteractiveTools from "@/components/landing/InteractiveTools";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Governance />
      <ValueSection />
      <Differentials />
      <Application />
      <Benefits />
      <InteractiveTools />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
