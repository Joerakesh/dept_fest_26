import { Marquee } from "@/components/ui/marquee";

export function FestivalTicker() {
  return (
    <Marquee
      className="relative z-[2] -rotate-1 scale-[1.03] border-y border-[rgba(203,164,83,0.35)] bg-[#171714] py-3 text-[11px] font-extrabold tracking-[.18em] text-[#d7bd81]"
      duration={38}
      aria-label="TECHRODEO 2026, December 4, eight events"
    >
      <span>
        TECHRODEO 2026 <b className="mx-5 text-[#e44337]">✦</b> 04 DECEMBER <b className="mx-5 text-[#e44337]">✦</b> EIGHT ARENAS <b className="mx-5 text-[#e44337]">✦</b> LOYOLA COLLEGE <b className="mx-5 text-[#e44337]">✦</b> ANSWER THE CALL <b className="mx-5 text-[#e44337]">✦</b>
      </span>
    </Marquee>
  );
}