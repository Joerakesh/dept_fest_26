"use client";

import { useState } from "react";
import { ArrowRight, Command, Volume2, VolumeX, X } from "@/components/ui/icons";

type LandingNavbarProps = {
  sound: boolean;
  onToggleSound: () => void;
  uiSound: () => void;
};

export function LandingNavbar({ sound, onToggleSound, uiSound }: LandingNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-0 bg-[linear-gradient(180deg,rgba(5,7,8,0.72),rgba(5,7,8,0))] backdrop-blur-none fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 md:px-8 max-[767px]:h-[70px] mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="TECHRODEO home">
          <span className="grid size-9 place-items-center border border-[rgba(217,176,91,0.56)] bg-[linear-gradient(145deg,rgba(151,123,63,0.24),rgba(25,30,26,0.3))] text-[#ead091] shadow-[0_0_20px_rgba(183,55,41,0.15),inset_0_0_14px_rgba(215,176,91,0.07)]"><Command size={19}/></span>
          <span>
            <strong className="block text-[13px] font-black tracking-[.17em]">TECH<span className="text-[#e9543b]">RODEO</span></strong>
            <small className="mt-1 block text-[8px] font-bold tracking-[.24em] text-[#9d9687]">DOOMSDAY · 2026</small>
          </span>
        </a>

        <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[clamp(16px,2.1vw,31px)] rounded-full border border-white/[.19] bg-[rgba(17,19,19,0.34)] px-[clamp(19px,2.4vw,34px)] py-3 shadow-[inset_.5px_1px_3px_rgba(255,255,255,0.24),0_9px_32px_rgba(0,0,0,0.13)] backdrop-blur-[18px] max-[1050px]:gap-[15px] max-[1050px]:px-[17px] max-[767px]:hidden [&_a]:whitespace-nowrap [&_a]:text-[clamp(10px,.88vw,13px)] [&_a]:font-semibold [&_a]:tracking-[.01em] [&_a]:text-[#f1eee7] [&_a]:normal-case [&_a:hover]:text-[#f0bd72]" aria-label="Main navigation">
          <a href="#events">Events</a>
          <a href="#story">The Call</a>
          <a href="#schedule">Schedule</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="flex shrink-0 items-center gap-3 flex shrink-0 items-center gap-3">
          <button
            className="flex size-[43px] items-center justify-center gap-[7px] rounded-full border border-white/[.18] bg-[rgba(17,19,19,0.32)] text-[9px] font-extrabold tracking-[.13em] text-[#b9b2a3] shadow-[inset_.5px_1px_3px_rgba(255,255,255,0.18)] backdrop-blur-2xl hover:text-[#f0ca77] max-[767px]:size-[39px]"
            onClick={onToggleSound}
            aria-label={sound ? "Turn sound off" : "Turn sound on"}
            title={sound ? "Sound on" : "Sound off"}
          >
            {sound ? <Volume2 size={17}/> : <VolumeX size={17}/>}
            <span className="hidden sm:inline">SOUND {sound ? "ON" : "OFF"}</span>
          </button>
          <a className="inline-flex min-h-[45px] items-center justify-center gap-3 rounded-full border border-white/[.24] bg-[rgba(17,19,19,0.32)] px-[21px] text-[9px] font-black tracking-[.13em] text-[#f8f2e9] no-underline shadow-[inset_.5px_1px_3px_rgba(255,255,255,0.2)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-[rgba(240,190,114,0.62)] hover:bg-black/30 max-[1050px]:px-[15px] max-[1050px]:text-[8px] max-[767px]:hidden" href="#register" onClick={uiSound}>
            ENTER THE ARENA <ArrowRight size={14}/>
          </a>
          <button
            className="hidden items-center justify-center rounded-full border border-white/20 bg-[rgba(17,19,19,0.4)] text-[#f1eee7] shadow-[inset_.5px_1px_3px_rgba(255,255,255,0.2)] backdrop-blur-[14px] max-[767px]:flex max-[767px]:size-[42px]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21}/> : <span className="flex w-[18px] flex-col gap-1 [&_i]:block [&_i]:h-0.5 [&_i]:w-[18px] [&_i]:rounded-full [&_i]:bg-[#f1eee7] [&_i:nth-child(2)]:ml-auto [&_i:nth-child(2)]:w-[13px]"><i/><i/><i/></span>}
          </button>
        </div>
      </div>

      <div className={"fixed inset-0 -z-10 hidden overflow-hidden bg-[rgba(5,7,8,0.97)] transition-[clip-path,opacity,visibility] duration-500 max-[767px]:block " + (menuOpen ? "visible opacity-100 [clip-path:circle(150vmax_at_calc(100%-42px)_35px)]" : "invisible opacity-0 [clip-path:circle(0px_at_calc(100%-42px)_35px)]")} aria-hidden={!menuOpen}>
        <nav className="flex min-h-full w-full flex-col justify-center gap-0 px-[34px] pb-[42px] pt-[92px]" aria-label="Mobile navigation">
          <span className="mb-6 font-mono text-[9px] tracking-[.2em] text-[#c9a965]">TECHRODEO · DOOMSDAY 2026</span>
          <a href="#top" onClick={() => setMenuOpen(false)}><span>00</span>Home<ArrowRight size={17}/></a>
          <a href="#events" onClick={() => setMenuOpen(false)}><span>01</span>Events<ArrowRight size={17}/></a>
          <a href="#story" onClick={() => setMenuOpen(false)}><span>02</span>The Call<ArrowRight size={17}/></a>
          <a href="#schedule" onClick={() => setMenuOpen(false)}><span>03</span>Schedule<ArrowRight size={17}/></a>
          <a href="#faq" onClick={() => setMenuOpen(false)}><span>04</span>FAQ<ArrowRight size={17}/></a>
          <a className="mt-[27px] flex min-h-[52px] items-center justify-between rounded-full border border-[rgba(213,174,97,0.48)] bg-[rgba(211,174,97,0.08)] px-[19px] text-[10px] font-black tracking-[.15em] text-[#f2d18c] no-underline" href="#register" onClick={() => setMenuOpen(false)}>
            ENTER THE ARENA <ArrowRight size={17}/>
          </a>
          <p>LOYOLA COLLEGE · CHENNAI · INDIA</p>
        </nav>
      </div>
    </header>
  );
}
