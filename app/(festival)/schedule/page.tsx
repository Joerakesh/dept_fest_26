import { ScheduleSection } from "@/components/festival/ScheduleSection";
import { FestivalFooter } from "@/components/festival/festival-footer";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden text-[#eee9dc]">
      <ScheduleSection />
      <FestivalFooter />
    </main>
  );
}
