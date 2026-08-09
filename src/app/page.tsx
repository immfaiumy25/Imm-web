import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DivisionsSection from "@/components/DivisionsSection";
import DocumentationSection from "@/components/DocumentationSection";
import NewsSection from "@/components/NewsSection";
import AgendaSection from "@/components/AgendaSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import LeadershipSection from "@/components/LeadershipSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DivisionsSection />
        <DocumentationSection />
        <NewsSection />
        <AgendaSection />
        <VisionMissionSection />
        <LeadershipSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
