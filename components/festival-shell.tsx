"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LandingNavbar } from "@/components/landing-navbar";
import { playUiSfx } from "@/lib/sounds";

type SoundContextValue = { uiSound: (kind?: "select" | "confirm") => void };
const SoundContext = createContext<SoundContextValue | null>(null);

export function useFestivalSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useFestivalSound must be used inside FestivalShell");
  return context;
}

export function FestivalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sound, setSound] = useState(false);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (sound) {
      audio.pause();
      setSound(false);
      return;
    }

    audio.volume = 0.28;
    void audio.play().then(() => setSound(true)).catch(() => setSound(false));
  }, [sound]);

  const uiSound = useCallback((kind: "select" | "confirm" = "select") => {
    if (sound) playUiSfx(kind);
  }, [sound]);

  return (
    <SoundContext.Provider value={{ uiSound }}>
      <div className="min-h-screen overflow-hidden bg-[#090b0c] text-[#eee9dc] [--ember:#eb593d] [--gold:#d3ae61] [--paper:#eee9dc] [--dim:#a19b8d] [--ink:#090b0c]">
        {!isLanding && <LandingNavbar sound={sound} onToggleSound={toggleSound} uiSound={uiSound} />}
        {!isLanding && <audio ref={audioRef} loop preload="metadata" aria-hidden="true"><source src="/audio/ambient.mp3" type="audio/mpeg" /></audio>}
        {children}
      </div>
    </SoundContext.Provider>
  );
}