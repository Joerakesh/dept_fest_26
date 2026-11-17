"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "@/components/ui/icons";
import { useFestivalSound } from "@/components/festival-shell";
function HelmetArtwork() {
  return (
    <svg
      className="relative z-[2] w-full max-w-[560px] max-h-[610px] overflow-visible animate-[helmet-float_7s_ease-in-out_infinite] [filter:drop-shadow(0_22px_45px_rgba(0,0,0,0.45))]"
      viewBox="0 0 560 620"
      role="img"
      aria-label="Original armored sentinel helmet illustration"
    >
      <defs>
        <linearGradient id="armor" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#88936e" />
          <stop offset=".28" stopColor="#35443a" />
          <stop offset=".6" stopColor="#18211e" />
          <stop offset="1" stopColor="#080c0c" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f7df9a" />
          <stop offset=".45" stopColor="#bd9042" />
          <stop offset="1" stopColor="#55412a" />
        </linearGradient>
        <linearGradient id="eye" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#ff3e27" />
          <stop offset=".5" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#ff4b2f" />
        </linearGradient>
        <radialGradient id="aura">
          <stop stopColor="#bc3a2d" stopOpacity=".3" />
          <stop offset="1" stopColor="#bc3a2d" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="284" cy="294" r="270" fill="url(#aura)" />
      <circle
        cx="284"
        cy="294"
        r="228"
        fill="none"
        stroke="#d3a84e"
        strokeOpacity=".28"
        strokeDasharray="2 10"
      />
      <circle
        cx="284"
        cy="294"
        r="200"
        fill="none"
        stroke="#b58b45"
        strokeOpacity=".16"
      />
      <path
        d="m74 273 33-117 70-58 107-28 103 29 68 64 34 111-32 177-89 103-111 34-115-39-83-102z"
        fill="#0c1010"
        stroke="url(#gold)"
        strokeWidth="5"
      />
      <path
        d="m107 255 39-110 64-38 75-17 83 18 62 42 31 106-27 151-75 90-97 29-97-34-61-82z"
        fill="url(#armor)"
        stroke="#9c834b"
        strokeWidth="3"
      />
      <path
        d="m142 225 67-74 80-35 88 37 54 71-67-22-58 21-30-18-30 18-61-20z"
        fill="#1a221f"
        stroke="#b09150"
        strokeWidth="3"
      />
      <path
        d="m145 245 87 23 49 37-52 18-68-29zm276 0-87 23-49 37 52 18 68-29z"
        fill="#101617"
        stroke="url(#gold)"
        strokeWidth="4"
      />
      <path
        d="m165 257 71 19 34 18-45 5-48-21zm236 0-71 19-34 18 45 5 48-21z"
        fill="url(#eye)"
        filter="url(#glow)"
      />
      <path
        d="m277 302 17-8 18 8 25 82-43 38-42-38z"
        fill="#111716"
        stroke="#bd984f"
        strokeWidth="4"
      />
      <path
        d="m292 326-15 57 17 17 19-17-15-57m-41 98 36-17 37 17-9 44-29 18-28-19z"
        fill="#222c28"
        stroke="url(#gold)"
        strokeWidth="3"
      />
      <path
        d="m118 357-43 22 32 71 43 20m273-113 43 22-32 71-43 20M200 476l-26 45 85 44m116-89 26 45-85 44"
        fill="none"
        stroke="#8f7544"
        strokeWidth="7"
      />
      <path
        d="M108 181 65 150m356 31 43-31M284 71V27"
        stroke="#e4c576"
        strokeOpacity=".7"
        strokeWidth="3"
      />
    </svg>
  );
}

export function HeroSection() {
  const [eventDate, setEventDate] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/public/summary", { cache: "no-store", signal: controller.signal }).then((response) => response.json()).then((payload: { data?: { eventDate?: string | null } }) => setEventDate(payload.data?.eventDate ?? null)).catch(() => setEventDate(null));
    return () => controller.abort();
  }, []);
  const dateParts = eventDate?.split("-");
  const dateLabel = dateParts?.length === 3 ? `${dateParts[2]} ${["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"][Number(dateParts[1]) - 1]}` : "EVENT DATE TBA";
  const { uiSound } = useFestivalSound();
  return (
<section
        id="top"
        className="isolate relative flex min-h-[780px] items-center bg-[radial-gradient(ellipse_at_76%_49%,rgba(115,60,38,0.2),transparent_40%),radial-gradient(ellipse_at_2%_78%,rgba(111,37,34,0.18),transparent_38%),linear-gradient(180deg,#101311_0%,#0b0e0e_68%,#090b0c_100%)] pt-24 max-[767px]:min-h-0 max-[767px]:pt-[95px] md:min-h-[850px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(214,190,127,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(214,190,127,0.045)_1px,transparent_1px)] [background-size:56px_56px] opacity-45 [mask-image:linear-gradient(90deg,transparent,#000_35%,#000_75%,transparent)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[repeating-linear-gradient(0deg,transparent_0,rgba(0,0,0,0.13)_1px,transparent_3px)] opacity-35" />
        <div className="absolute right-6 top-[46%] [writing-mode:vertical-rl] text-[8px] font-bold tracking-[.23em] text-[#77776c] max-[767px]:hidden">
          LOYOLA COLLEGE · CHENNAI · INDIA
        </div>
        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-4 px-5 pb-20 pt-12 md:grid-cols-[1.04fr_.96fr] md:px-10 md:pb-24">
          <div className="hero-copy relative z-10">
            <div className="flex items-center gap-2.5 text-[9px] font-extrabold tracking-[.2em] text-[#b2a57e]">
              <span className="size-[7px] animate-[landing-pulse_1.8s_ease-in-out_infinite] rounded-full bg-[#e8593d] shadow-[0_0_11px_#e8593d]" />{" "}
              THE INTER-COLLEGIATE TECH FEST{" "}
              <span className="ml-[5px] border border-[rgba(211,174,97,0.35)] px-[7px] py-[5px] text-[8px] text-[#d7bd80]">
                EDITION {dateParts?.[0] ?? "TBA"}
              </span>
            </div>
            <h1 className="my-[30px] flex flex-col text-[clamp(56px,9.5vw,134px)] font-black leading-[.75] tracking-[-.085em] text-[#ede7da] max-[767px]:mt-6 max-[767px]:text-[clamp(60px,18vw,106px)]">
              <span>THE</span>
              <span className="relative w-max text-[#f0e8d7] [text-shadow:0_3px_0_#827f70,0_8px_36px_rgba(228,69,50,0.15)] after:absolute after:-bottom-2 after:left-[5%] after:right-0 after:h-0.5 after:bg-[linear-gradient(90deg,#ae3d31,#c7a75d,transparent)] after:content-['']">
                DOOM<span className="text-[#dc5138]">.</span>
              </span>
              <span className="mt-[11px] text-[.34em] leading-[1.2] tracking-[.36em] text-[#b7a775]">
                PROTOCOL
              </span>
            </h1>
            <p className="ml-1 mt-[25px] max-w-[440px] text-[14px] leading-[1.8] text-[#afa99c] max-[767px]:max-w-[380px] max-[767px]:text-[13px]">
              Eight arenas. One day. Bring your sharpest minds to the edge of
              the known universe.
            </p>
            <div className="my-[27px] mb-[34px] ml-1 flex flex-wrap items-center gap-[23px]">
              <Link
                href="/events"
                className="inline-flex min-h-[49px] min-w-[210px] items-center justify-center gap-3 border border-[#a13f2e] bg-[linear-gradient(135deg,#8a3027,#4c211f)] px-5 text-[10px] font-black tracking-[.13em] text-[#f7ede0] no-underline shadow-[inset_0_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(128,32,26,0.16)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#ec7950] hover:shadow-[0_10px_35px_rgba(220,80,50,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ae61] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b0c]"
                onClick={() => uiSound()}
              >
                EXPLORE THE EVENTS <ArrowRight size={16} />
              </Link>
              <Link
                href="/story"
                className="inline-flex items-center gap-[9px] text-[9px] font-extrabold tracking-[.13em] text-[#bab2a4] no-underline"
                onClick={() => uiSound()}
              >
                DISCOVER THE CALL <span>↓</span>
              </Link>
            </div>
            <div className="hero-event-meta flex max-w-[530px] items-center gap-[14px] border-t border-[rgba(215,193,135,0.18)] px-1 pt-[18px] max-[767px]:flex-wrap max-[767px]:gap-[10px]">
              <div className="grid size-[38px] shrink-0 place-items-center border border-[rgba(212,174,97,0.3)] bg-[rgba(206,165,81,0.06)] text-[#e0bb6c]">
                <CalendarDays size={17} />
              </div>
              <div className="hero-meta-copy">
                <span>MARK YOUR CALENDAR</span>
                <strong>
                  {dateLabel} {dateParts?.[0] && <em>{dateParts[0]}</em>}
                </strong>
              </div>
              <i />
              <div className="hero-meta-copy">
                <span>THE BATTLE BEGINS</span>
                <strong>LOYOLA COLLEGE, CHENNAI</strong>
              </div>
            </div>
          </div>
          <div
            className="relative grid min-h-[560px] place-items-center max-[767px]:absolute max-[767px]:right-[-165px] max-[767px]:top-[118px] max-[767px]:w-[75%] max-[767px]:min-h-[370px] max-[767px]:opacity-20"
            aria-label="Armored sentinel illustration"
          >
            <div className="absolute z-0 aspect-square w-[72%] rounded-full border border-[rgba(216,178,94,0.15)] [transform:rotateX(64deg)_rotate(-22deg)] animate-[orbit-spin_38s_linear_infinite]" />
            <div className="absolute z-0 aspect-square w-[72%] rounded-full border border-[rgba(216,178,94,0.15)] w-[84%] border-dashed border-[rgba(172,63,47,0.18)] [transform:rotateX(68deg)_rotate(35deg)] animate-[orbit-spin_48s_linear_infinite_reverse]" />
            <div className="absolute left-0 top-[21%] z-[4] font-sans text-[9px] leading-[1.8] tracking-[.1em] text-[#a59772]">
              13°03' N<br />
              80°16' E
            </div>
            <div className="absolute bottom-[11%] left-[9%] right-[1%] z-[4] flex justify-between border-t border-[rgba(212,174,97,0.3)] pt-[9px] font-sans text-[8px] tracking-[.14em] text-[#8e8675]">
              <span>FIG. 01</span>
              <span>THE SENTINEL // CLASSIFIED</span>
            </div>
            <HelmetArtwork />
            <img
              className="absolute right-[9%] top-[16%] z-[3] w-[35px] opacity-75 [filter:drop-shadow(0_0_12px_rgba(211,168,78,0.5))]"
              src="https://api.iconify.design/tabler/shield-chevron.svg?color=%23d3a84e"
              alt=""
              aria-hidden="true"
            />
            <div className="absolute z-[4] size-[18px] border-[rgba(211,174,97,0.7)] left-[10%] top-[17%] border-l border-t" />
            <div className="absolute z-[4] size-[18px] border-[rgba(211,174,97,0.7)] bottom-[23%] right-[4%] border-b border-r" />
          </div>
          <Link
            href="/story"
            className="absolute bottom-[29px] left-1/2 flex -translate-x-1/2 items-center gap-[10px] text-[8px] font-extrabold tracking-[.19em] text-[#898578] no-underline max-[767px]:left-6 max-[767px]:translate-x-0"
          >
            <span className="h-px w-9 animate-[scroll-pulse_1.5s_ease-in-out_infinite] bg-[#c69b4f]" />{" "}
            SCROLL TO DESCEND
          </Link>
        </div>
      </section>
  );
}
