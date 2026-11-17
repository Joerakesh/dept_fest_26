import { HeroSection } from "@/components/festival/hero-section";
import { StorySection } from "@/components/festival/StorySection";
import { EventsSection } from "@/components/festival/events-section";
import { ScheduleSection } from "@/components/festival/ScheduleSection";
import { RegistrationSection } from "@/components/festival/RegistrationSection";
import { FaqSection } from "@/components/festival/faq-section";
import { FestivalFooter } from "@/components/festival/festival-footer";
import { FestivalTicker } from "@/components/festival/festival-ticker";

export function LandingPage() {
  return (
    <main className="[--ember:#eb593d] [--gold:#d3ae61] [--paper:#eee9dc] [--dim:#a19b8d] [--ink:#090b0c] min-h-screen overflow-hidden text-[#eee9dc]">
      <HeroSection />
      <FestivalTicker />
      <StorySection />
      <EventsSection />
      <ScheduleSection />
      <RegistrationSection />
      <FaqSection />
      <FestivalFooter />
    </main>
  );
}