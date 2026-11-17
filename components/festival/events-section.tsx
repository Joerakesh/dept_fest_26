"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useFestivalSound } from "@/components/festival-shell";
import { ArrowRight, Clock3, ShieldCheck } from "@/components/ui/icons";

type EventRecord = {
  id: string;
  name: string;
  category?: string;
  description?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  registrationStatus?: string;
};
const accents = ["#e44337", "#d3a84e", "#71a875", "#c55b47", "#9a83bd", "#569eaa", "#cd8541", "#bf667d"];

export function EventsSection() {
  const { uiSound } = useFestivalSound();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/events", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Event catalogue unavailable");
        const payload: { data?: EventRecord[] } = await response.json();
        if (Array.isArray(payload.data)) setEvents(payload.data);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setLoadError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const eventDay = events.find((event) => event.eventDate)?.eventDate;
  const eventDateLabel = eventDay
    ? new Date(`${eventDay}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase()
    : "DATE TBA";

  return (
    <section id="events" className="relative bg-[#0a0c0c] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(207,173,96,0.3),transparent)] before:content-[''] px-[max(24px,calc((100vw-1240px)/2))] py-[120px] max-[767px]:px-[22px] max-[767px]:py-[80px]">
      <div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a] max-[767px]:mb-[25px] max-[767px]:text-[8px]"><span>02</span> SELECT YOUR ARENA</div>
      <div className="mb-[42px] flex items-end justify-between gap-[30px] max-[767px]:items-start max-[410px]:gap-[10px]">
        <div><h2 className="m-0 text-[clamp(37px,6vw,73px)] font-black leading-[.99] tracking-[-.065em] text-[#ede8db] max-[767px]:text-[clamp(38px,11vw,60px)]">CHOOSE YOUR<br/><span>BATTLEFIELD.</span></h2><p className="mt-[17px] max-w-[410px] text-[12px] leading-[1.8] text-[#969386]">Find the challenge that calls to you. Registration closes before the gates do.</p></div>
        <div className="flex flex-col items-end gap-0.5 border-r-2 border-[#d94e36] px-[13px] py-2 pl-6 text-right max-[767px]:mt-[10px] max-[767px]:px-2 max-[767px]:text-[7px]"><span>EVENT DAY</span><strong>{eventDateLabel}</strong><small>{eventDay ? new Date(`${eventDay}T00:00:00`).getFullYear() : "DATE TO BE SET"}</small></div>
      </div>
      {loading ? <div className="grid grid-cols-4 border-l border-t border-[rgba(221,193,124,0.17)] max-[900px]:grid-cols-2 max-[410px]:grid-cols-1" aria-label="Loading event catalogue">{Array.from({ length: 4 }, (_, index) => <div key={index} className="min-h-[300px] animate-pulse border-b border-r border-white/10 bg-white/[.02]" />)}</div> : loadError ? <p role="status" className="border border-white/10 p-6 text-sm text-[#b8aa9b]">The event catalogue is temporarily unavailable. Please try again shortly.</p> : events.length === 0 ? <p className="border border-white/10 p-6 text-sm text-[#b8aa9b]">The event catalogue is being prepared. Published event details will appear here.</p> : (
        <div className="grid grid-cols-4 border-l border-t border-[rgba(221,193,124,0.17)] [perspective:1200px] max-[900px]:grid-cols-2 max-[410px]:grid-cols-1">
          {events.map((event, i) => {
            const color = accents[i % accents.length];
            const minTeam = event.minTeamSize ?? 1;
            const maxTeam = event.maxTeamSize ?? minTeam;
            const teamLabel = minTeam === maxTeam ? `${maxTeam} player${maxTeam === 1 ? "" : "s"}` : `${minTeam}–${maxTeam} players`;
            const timeLabel = event.startTime && event.endTime ? `${event.startTime} — ${event.endTime}` : "TIME TO BE ANNOUNCED";
            return <article key={event.id} className="group relative flex min-h-[300px] flex-col overflow-hidden border-b border-r border-[rgba(221,193,124,0.17)] bg-[linear-gradient(145deg,rgba(28,31,28,0.8),rgba(13,15,15,0.92))] p-[18px] transition duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:[transform:rotateX(1.5deg)] hover:bg-[linear-gradient(145deg,rgba(49,39,31,0.94),rgba(18,19,18,0.98))] max-[767px]:min-h-[275px] max-[767px]:p-[13px] max-[410px]:min-h-[255px]" style={{ "--event-accent": color, animationDelay: `${i * 75}ms` } as CSSProperties} onMouseEnter={() => uiSound()}>
              <div className="flex items-center justify-between font-sans text-[8px] tracking-[.12em] text-[#898477]"><span>ARENA {String(i + 1).padStart(2, "0")}</span><span className="size-[7px] rounded-full border border-[var(--event-accent)] shadow-[0_0_9px_color-mix(in_srgb,var(--event-accent),transparent_15%)]"/></div>
              <div className="relative flex h-[85px] items-center justify-between overflow-hidden px-[6px] [&_span]:font-sans [&_span]:text-[42px] [&_span]:font-extrabold [&_span]:opacity-[.18]"><span>{String(i + 1).padStart(2, "0")}</span><span className="absolute right-3 top-1/2 size-14 -translate-y-1/2 rounded-full border border-[var(--event-accent)]/30 shadow-[0_0_35px_var(--event-accent)] transition-transform duration-500 group-hover:scale-125" /><span className="absolute right-7 top-1/2 size-6 -translate-y-1/2 rotate-45 border border-[var(--event-accent)]/70" /></div>
              <div className="mt-auto [&_h3]:text-[19px] [&_h3]:font-black [&_h3]:tracking-[-.03em] max-[767px]:[&_h3]:text-[17px]"><div className="text-[8px] font-black tracking-[.17em] text-[var(--event-accent)]">{event.category ?? "EVENT ARENA"}</div><h3 className="my-2 text-[#eee8db]">{event.name}</h3>{event.description && <p className="mb-3 line-clamp-2 text-[10px] leading-relaxed text-[#9b9588]">{event.description}</p>}<div className="mb-4 flex flex-wrap gap-2 text-[9px] text-[#aba495]"><span className="inline-flex items-center gap-1.5"><Clock3 size={13}/>{timeLabel}</span><span className="inline-flex items-center gap-1.5"><ShieldCheck size={13}/>{teamLabel}</span></div><Link href="/register" className="inline-flex items-center gap-2 text-[9px] font-black tracking-[.12em] text-[#e2bb70] no-underline" onClick={() => uiSound()}>VIEW CHALLENGE <ArrowRight size={13}/></Link></div>
              <div className="event-card-edge"/>
            </article>;
          })}
        </div>
      )}
      <p className="mt-7 text-[9px] tracking-[.1em] text-[#847d70]">Event timings and team limits are loaded from the published event settings.</p>
    </section>
  );
}