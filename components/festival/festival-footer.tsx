"use client";
import Link from "next/link";
import { ArrowRight, Flame } from "@/components/ui/icons";
export function FestivalFooter() { return (
<footer className="bg-[#090b0b] text-[#eee9dc]">
        <div className="flex items-center justify-between gap-8 border-b border-white/[.1] px-10 py-10 max-[767px]:flex-wrap max-[767px]:px-[22px]">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center border border-[rgba(217,176,91,0.56)] bg-[linear-gradient(145deg,rgba(151,123,63,0.24),rgba(25,30,26,0.3))] text-[#ead091] shadow-[0_0_20px_rgba(183,55,41,0.15),inset_0_0_14px_rgba(215,176,91,0.07)]">
              <Flame size={17} />
            </span>
            <span>
              <strong className="block text-[12px] font-black tracking-[.15em]">
                TECH<span className="text-[#e9543b]">RODEO</span>
              </strong>
              <small className="text-[8px] tracking-[.2em] text-[#898276]">
                DOOMSDAY · 2026
              </small>
            </span>
          </Link>
          <span className="font-sans text-[8px] leading-[1.8] tracking-[.14em] text-[#837d70] max-[767px]:hidden">
            LOYOLA COLLEGE · CHENNAI · 13°03' N 80°16' E
          </span>
          <div className="flex items-center gap-6 [&_a]:text-[9px] [&_a]:font-bold [&_a]:tracking-[.1em] [&_a]:text-[#b5b0a5] [&_a]:no-underline [&_a:hover]:text-[#f2c773] max-[767px]:w-full max-[767px]:justify-between">
            <Link href="/events">Events</Link>
            <Link href="/schedule">Schedule</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/participate">Participate</Link>
            <Link href="/dashboard">
              Organiser portal <ArrowRight size={12} />
            </Link>
          </div>
        </div>
        <div className="flex justify-between gap-4 px-10 py-5 font-sans text-[8px] tracking-[.12em] text-[#716d63] max-[767px]:flex-wrap max-[767px]:px-[22px] max-[767px]:text-[7px]">
          <span>© 2026 TECHRODEO · LOYOLA COLLEGE</span>
          <span>
            BUILT FOR THE BOLD <span className="text-[#e9543b]">✦</span>
          </span>
          <span>04 DECEMBER 2026</span>
        </div>
      </footer>
); }
