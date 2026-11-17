"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "@/components/ui/icons";
import { useFestivalSound } from "@/components/festival-shell";

export function StorySection() {
  const { uiSound } = useFestivalSound();
  return (
<section
        id="story"
        className="relative bg-[linear-gradient(180deg,#0c0e0e,#111310)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(207,173,96,0.3),transparent)] before:content-[''] px-[max(24px,calc((100vw-1240px)/2))] py-[120px] max-[767px]:px-[22px] max-[767px]:py-[80px]"
      >
        <div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a] max-[767px]:mb-[25px] max-[767px]:text-[8px]">
          <span>01</span> THE CALLING
        </div>
        <div className="grid grid-cols-[1.1fr_.9fr] items-center gap-[8%] max-[767px]:grid-cols-1 max-[767px]:gap-[33px]">
          <div>
            <h2 className="m-0 text-[clamp(37px,6vw,73px)] font-black leading-[.99] tracking-[-.065em] text-[#ede8db] max-[767px]:text-[clamp(38px,11vw,60px)]">
              WHEN THE
              <br />
              <span>WORLD NEEDS</span>
              <br />A NEW ANSWER.
            </h2>
          </div>
          <div className="max-w-[480px] text-[13px] leading-[1.95] text-[#a9a497] max-[767px]:max-w-none">
            <p className="text-[18px] font-semibold leading-[1.5] text-[#e4ddcf]">
              This December, the arena belongs to the bold.
            </p>
            <p>
              TECHRODEO brings together the sharpest student minds for a day of
              code, creativity, strategy, and spectacle. Eight challenges.
              Hundreds of ideas. One campus where the next generation steps
              forward.
            </p>
            <p>Form your team. Choose your arena. Make your mark.</p>
            <Link
              href="/events"
              className="mt-[11px] inline-flex items-center gap-[10px] text-[9px] font-black tracking-[.16em] text-[#e0b660] no-underline"
              onClick={() => uiSound()}
            >
              MEET YOUR CHALLENGE <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="mt-[78px] grid grid-cols-4 border-y border-white/10 max-[767px]:mt-[48px] max-[767px]:grid-cols-2">
          <div>
            <strong>08</strong>
            <span>EVENT ARENAS</span>
          </div>
          <div>
            <strong>01</strong>
            <span>DAY OF ACTION</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>WAYS TO RISE</span>
          </div>
          <div className="flex-row items-center gap-[13px] border-r-0 text-[#c4a961] [&_span]:leading-[1.7] [&_span]:text-[#c9bd9a]">
            <ShieldCheck size={25} />
            <span>
              STAND
              <br />
              TOGETHER
            </span>
          </div>
        </div>
      </section>
  );
}
