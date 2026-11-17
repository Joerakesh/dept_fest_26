"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
const events = [
  {
    name: "BugWarz",
    type: "DEBUGGING ARENA",
    time: "10:30 AM — 12:00 PM",
    team: "2 players",
    color: "#e44337",
    icon: "01",
  },
  {
    name: "VisWiz",
    type: "DATA VISUALIZATION",
    time: "1:30 PM — 2:30 PM",
    team: "2 players",
    color: "#d3a84e",
    icon: "02",
  },
  {
    name: "DataFusion",
    type: "CONNECTIONS",
    time: "10:30 AM — 12:00 PM",
    team: "2 players",
    color: "#71a875",
    icon: "03",
  },
  {
    name: "PitchStorm",
    type: "SHARK TANK",
    time: "2:00 PM — 3:30 PM",
    team: "2 players",
    color: "#c55b47",
    icon: "04",
  },
  {
    name: "IQ Verse",
    type: "QUIZ COMBAT",
    time: "11:00 AM — 12:30 PM",
    team: "Up to 2",
    color: "#9a83bd",
    icon: "05",
  },
  {
    name: "Profusion",
    type: "PROJECT SHOWCASE",
    time: "10:00 AM — 12:30 PM",
    team: "Up to 2",
    color: "#569eaa",
    icon: "06",
  },
  {
    name: "Rodeo Hunt",
    type: "TREASURE HUNT",
    time: "11:00 AM — 12:00 PM",
    team: "2 players",
    color: "#cd8541",
    icon: "07",
  },
  {
    name: "Data Wear",
    type: "CREATIVE ARENA",
    time: "1:30 PM — 2:30 PM",
    team: "2 players",
    color: "#bf667d",
    icon: "08",
  },
];
import { useFestivalSound } from "@/components/festival-shell";
import { ArrowRight, Clock3, ShieldCheck } from "@/components/ui/icons";
export function EventsSection() {
  const { uiSound } = useFestivalSound();
  return (
<section
        id="events"
        className="relative bg-[#0a0c0c] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(207,173,96,0.3),transparent)] before:content-[''] px-[max(24px,calc((100vw-1240px)/2))] py-[120px] max-[767px]:px-[22px] max-[767px]:py-[80px]"
      >
        <div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a] max-[767px]:mb-[25px] max-[767px]:text-[8px]">
          <span>02</span> SELECT YOUR ARENA
        </div>
        <div className="mb-[42px] flex items-end justify-between gap-[30px] max-[767px]:items-start max-[410px]:gap-[10px]">
          <div>
            <h2 className="m-0 text-[clamp(37px,6vw,73px)] font-black leading-[.99] tracking-[-.065em] text-[#ede8db] max-[767px]:text-[clamp(38px,11vw,60px)]">
              CHOOSE YOUR
              <br />
              <span>BATTLEFIELD.</span>
            </h2>
            <p className="mt-[17px] max-w-[410px] text-[12px] leading-[1.8] text-[#969386]">
              Find the challenge that calls to you. Registration closes before
              the gates do.
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5 border-r-2 border-[#d94e36] px-[13px] py-2 pl-6 text-right max-[767px]:mt-[10px] max-[767px]:px-2 max-[767px]:text-[7px]">
            <span>EVENT DAY</span>
            <strong>
              04 <i>DEC</i>
            </strong>
            <small>2026 · CHENNAI</small>
          </div>
        </div>
        <div className="grid grid-cols-4 border-l border-t border-[rgba(221,193,124,0.17)] max-[900px]:grid-cols-2 max-[410px]:grid-cols-1">
          {events.map((event, i) => (
            <article
              key={event.name}
              className="group relative flex min-h-[300px] flex-col overflow-hidden border-b border-r border-[rgba(221,193,124,0.17)] bg-[linear-gradient(145deg,rgba(28,31,28,0.8),rgba(13,15,15,0.92))] p-[18px] transition duration-300 hover:-translate-y-1 hover:bg-[linear-gradient(145deg,rgba(49,39,31,0.94),rgba(18,19,18,0.98))] max-[767px]:min-h-[275px] max-[767px]:p-[13px] max-[410px]:min-h-[255px]"
              style={
                {
                  "--event-accent": event.color,
                  animationDelay: `${i * 75}ms`,
                } as CSSProperties
              }
              onMouseEnter={() => uiSound()}
            >
              <div className="flex items-center justify-between font-sans text-[8px] tracking-[.12em] text-[#898477]">
                <span>ARENA {event.icon}</span>
                <span className="size-[7px] rounded-full border border-[var(--event-accent)] shadow-[0_0_9px_color-mix(in_srgb,var(--event-accent),transparent_15%)]" />
              </div>
              <div className="flex h-[85px] items-center justify-between px-[6px] [&_span]:font-sans [&_span]:text-[42px] [&_span]:font-extrabold [&_span]:opacity-[.18]">
                <span>{event.icon}</span>
                <img
                  src={`https://api.iconify.design/tabler/${i % 2 === 0 ? "shield-chevron" : "meteor"}.svg?color=${encodeURIComponent(event.color)}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              </div>
              <div className="[&_h3]:text-[19px] [&_h3]:font-black [&_h3]:tracking-[-.03em] max-[767px]:[&_h3]:text-[17px]">
                <div className="text-[8px] font-black tracking-[.17em] text-[var(--event-accent)]">
                  {event.type}
                </div>
                <h3>{event.name}</h3>
                <div className="text-[9px] text-[#aba495] max-[767px]:text-[8px]">
                  <span>
                    <Clock3 size={13} />
                    {event.time}
                  </span>
                  <span>
                    <ShieldCheck size={13} />
                    {event.team}
                  </span>
                </div>
                <Link
                  href="/register"
                  className="text-[9px] font-black tracking-[.12em] text-[#e2bb70] no-underline"
                  onClick={() => uiSound()}
                >
                  VIEW CHALLENGE <ArrowRight size={13} />
                </Link>
              </div>
              <div className="event-card-edge" />
            </article>
          ))}
        </div>
        <p className="mt-7 text-[9px] tracking-[.1em] text-[#847d70]">
          <span>*</span> All event timings are listed in Indian Standard Time.
          Team limits vary by event.
        </p>
      </section>
  );
}
