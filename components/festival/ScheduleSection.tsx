"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "@/components/ui/icons";

type ScheduleEvent = { id: string; name: string; category?: string; eventDate?: string; startTime?: string; endTime?: string; venue?: string };
export function ScheduleSection() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/events", { cache: "no-store", signal: controller.signal }).then(async (response) => { if (!response.ok) throw new Error("Schedule unavailable"); const payload: { data?: ScheduleEvent[] } = await response.json(); if (Array.isArray(payload.data)) setEvents(payload.data); }).catch(() => setEvents([])).finally(() => setLoaded(true));
    return () => controller.abort();
  }, []);
  const eventDate = events.find((event) => event.eventDate)?.eventDate;
  return <section id="schedule" className="bg-[#101210] px-[max(24px,calc((100vw-1240px)/2))] py-[120px] max-[767px]:px-[22px] max-[767px]:py-[80px]"><div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a]"><span>03</span> EVENT SCHEDULE</div><div className="grid grid-cols-[.8fr_1.2fr] gap-[9%] max-[767px]:grid-cols-1 max-[767px]:gap-[38px]"><div><h2 className="m-0 text-[clamp(37px,6vw,73px)] font-black leading-[.99] tracking-[-.065em] text-[#ede8db] max-[767px]:text-[clamp(38px,11vw,60px)]">THE DAY<br/><span>UNFOLDS.</span></h2><p className="mt-[17px] max-w-[410px] text-[12px] leading-[1.8] text-[#969386]">Published event times and venues are loaded from the event catalogue.</p><div className="mt-8 flex items-center gap-4 border border-[rgba(211,174,97,0.25)] bg-[linear-gradient(145deg,rgba(46,39,27,0.72),rgba(16,18,16,0.85))] p-6"><CalendarDays size={19}/><div className="flex flex-col gap-2"><span className="text-[8px] font-extrabold tracking-[.15em] text-[#a99d83]">EVENT DATE</span><strong className="text-[13px] tracking-[.08em] text-[#e9d7ad]">{eventDate ?? "TO BE ANNOUNCED"}</strong></div></div></div><div className="relative before:absolute before:bottom-0 before:left-[105px] before:top-0 before:w-px before:bg-[rgba(211,174,97,0.2)] max-[767px]:before:left-[67px]">{events.map((event, index) => <div key={event.id} className="relative grid grid-cols-[75px_1fr] gap-[60px] border-b border-white/[.07] py-[22px] max-[767px]:grid-cols-[49px_1fr] max-[767px]:gap-[35px] [&>i]:absolute [&>i]:left-[101px] max-[767px]:[&>i]:left-[63px]"><time>{event.startTime ?? "TBA"}</time><i/><div className="flex flex-col gap-[7px]"><strong className="text-[11px] tracking-[.12em] text-[#e7e0d2]">{event.name}</strong><span className="text-[11px] leading-[1.6] text-[#999487]">{event.category ?? "Event"}{event.endTime ? ` · until ${event.endTime}` : ""}{event.venue ? ` · ${event.venue}` : ""}</span></div></div>)}{loaded && events.length === 0 && <p className="py-8 text-sm text-[#999184]">The schedule will appear when events are published.</p>}</div></div></section>;
}