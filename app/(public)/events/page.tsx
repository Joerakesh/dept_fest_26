import { EventsSection } from "@/components/festival/events-section";
import { FestivalFooter } from "@/components/festival/festival-footer";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden text-[#eee9dc]">
      <EventsSection />
      <FestivalFooter />
    </main>
  );
}
