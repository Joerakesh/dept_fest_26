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
    <header className="landing-nav fixed inset-x-0 top-0 z-50">
      <div className="landing-nav-inner mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="TECHRODEO home">
          <span className="landing-logo"><Command size={19}/></span>
          <span>
            <strong className="block text-[13px] font-black tracking-[.17em]">TECH<span className="text-[#e9543b]">RODEO</span></strong>
            <small className="mt-1 block text-[8px] font-bold tracking-[.24em] text-[#9d9687]">DOOMSDAY · 2026</small>
          </span>
        </a>

        <nav className="landing-links" aria-label="Main navigation">
          <a href="#events">Events</a>
          <a href="#story">The Call</a>
          <a href="#schedule">Schedule</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="landing-nav-actions flex shrink-0 items-center gap-3">
          <button
            className="sound-toggle"
            onClick={onToggleSound}
            aria-label={sound ? "Turn sound off" : "Turn sound on"}
            title={sound ? "Sound on" : "Sound off"}
          >
            {sound ? <Volume2 size={17}/> : <VolumeX size={17}/>}
            <span className="hidden sm:inline">SOUND {sound ? "ON" : "OFF"}</span>
          </button>
          <a className="nav-register" href="#register" onClick={uiSound}>
            ENTER THE ARENA <ArrowRight size={14}/>
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21}/> : <span className="menu-bars"><i/><i/><i/></span>}
          </button>
        </div>
      </div>

      <div className={`mobile-nav-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav-panel" aria-label="Mobile navigation">
          <span className="mobile-nav-kicker">TECHRODEO · DOOMSDAY 2026</span>
          <a href="#top" onClick={() => setMenuOpen(false)}><span>00</span>Home<ArrowRight size={17}/></a>
          <a href="#events" onClick={() => setMenuOpen(false)}><span>01</span>Events<ArrowRight size={17}/></a>
          <a href="#story" onClick={() => setMenuOpen(false)}><span>02</span>The Call<ArrowRight size={17}/></a>
          <a href="#schedule" onClick={() => setMenuOpen(false)}><span>03</span>Schedule<ArrowRight size={17}/></a>
          <a href="#faq" onClick={() => setMenuOpen(false)}><span>04</span>FAQ<ArrowRight size={17}/></a>
          <a className="mobile-nav-register" href="#register" onClick={() => setMenuOpen(false)}>
            ENTER THE ARENA <ArrowRight size={17}/>
          </a>
          <p>LOYOLA COLLEGE · CHENNAI · INDIA</p>
        </nav>
      </div>
    </header>
  );
}
