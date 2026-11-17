import { CalendarDays, Flame } from "@/components/ui/icons";

export function ScheduleSection() {
  return (
<section
        id="schedule"
        className="bg-[#101210] px-[max(24px,calc((100vw-1240px)/2))] py-[120px] max-[767px]:px-[22px] max-[767px]:py-[80px]"
      >
        <div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a] max-[767px]:mb-[25px] max-[767px]:text-[8px]">
          <span>03</span> ONE DAY. ALL IN.
        </div>
        <div className="grid grid-cols-[.8fr_1.2fr] gap-[9%] max-[767px]:grid-cols-1 max-[767px]:gap-[38px]">
          <div>
            <h2 className="m-0 text-[clamp(37px,6vw,73px)] font-black leading-[.99] tracking-[-.065em] text-[#ede8db] max-[767px]:text-[clamp(38px,11vw,60px)]">
              THE DAY
              <br />
              <span>UNFOLDS.</span>
            </h2>
            <p className="mt-[17px] max-w-[410px] text-[12px] leading-[1.8] text-[#969386]">
              Set your coordinates. The full schedule lands closer to launch.
            </p>
            <div className="border border-[rgba(211,174,97,0.25)] bg-[linear-gradient(145deg,rgba(46,39,27,0.72),rgba(16,18,16,0.85))] p-7">
              <CalendarDays size={19} />
              <div>
                <span>GATES OPEN</span>
                <strong>FRIDAY · 04.12.2026</strong>
              </div>
              <Flame size={21} className="text-[#e65b3b]" />
            </div>
          </div>
          <div className="relative before:absolute before:bottom-0 before:left-[105px] before:top-0 before:w-px before:bg-[rgba(211,174,97,0.2)] max-[767px]:before:left-[67px]">
            <div className="relative grid grid-cols-[75px_1fr] gap-[60px] border-b border-white/[.07] py-[22px] max-[767px]:grid-cols-[49px_1fr] max-[767px]:gap-[35px] [&>i]:absolute [&>i]:left-[101px] max-[767px]:[&>i]:left-[63px]">
              <time>09:00</time>
              <i />
              <div>
                <strong>THE GATES OPEN</strong>
                <span>Check in, find your crew, get ready.</span>
              </div>
            </div>
            <div className="relative grid grid-cols-[75px_1fr] gap-[60px] border-b border-white/[.07] py-[22px] max-[767px]:grid-cols-[49px_1fr] max-[767px]:gap-[35px] [&>i]:absolute [&>i]:left-[101px] max-[767px]:[&>i]:left-[63px]">
              <time>10:00</time>
              <i />
              <div>
                <strong>FIRST WAVE</strong>
                <span>Profusion and the morning arenas begin.</span>
              </div>
            </div>
            <div className="relative grid grid-cols-[75px_1fr] gap-[60px] border-b border-white/[.07] py-[22px] max-[767px]:grid-cols-[49px_1fr] max-[767px]:gap-[35px] [&>i]:absolute [&>i]:left-[101px] max-[767px]:[&>i]:left-[63px]">
              <time>12:30</time>
              <i />
              <div>
                <strong>RESET & RECHARGE</strong>
                <span>Take a breath. The next round is coming.</span>
              </div>
            </div>
            <div className="relative grid grid-cols-[75px_1fr] gap-[60px] border-b border-white/[.07] py-[22px] max-[767px]:grid-cols-[49px_1fr] max-[767px]:gap-[35px] [&>i]:absolute [&>i]:left-[101px] max-[767px]:[&>i]:left-[63px]">
              <time>13:30</time>
              <i />
              <div>
                <strong>SECOND WAVE</strong>
                <span>Visuals, design, and the final showdowns.</span>
              </div>
            </div>
            <div className="relative grid grid-cols-[75px_1fr] gap-[60px] border-b border-white/[.07] py-[22px] max-[767px]:grid-cols-[49px_1fr] max-[767px]:gap-[35px] [&>i]:absolute [&>i]:left-[101px] max-[767px]:[&>i]:left-[63px]">
              <time>16:00</time>
              <i />
              <div>
                <strong>VICTORY ASSEMBLY</strong>
                <span>Winners announced. Legends made.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
