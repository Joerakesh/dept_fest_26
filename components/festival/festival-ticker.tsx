"use client";

import { useEffect, useState } from "react";
import { Marquee } from "@/components/ui/marquee";

type Summary = { eventDate?: string | null; eventCount?: number };
export function FestivalTicker() {
  const [summary, setSummary] = useState<Summary | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/public/summary", { cache: "no-store", signal: controller.signal }).then(async (response) => { if (!response.ok) throw new Error("Summary unavailable"); const payload: { data?: Summary } = await response.json(); setSummary(payload.data ?? null); }).catch(() => setSummary(null));
    return () => controller.abort();
  }, []);
  const dateLabel = summary?.eventDate ? summary.eventDate.split("-").reverse().join(".") : "EVENT DATE TBA";
  const year = summary?.eventDate?.slice(0, 4) ?? "";
  return <Marquee className="relative z-[2] -rotate-1 scale-[1.03] border-y border-[rgba(203,164,83,0.35)] bg-[#171714] py-3 text-[11px] font-extrabold tracking-[.18em] text-[#d7bd81]" duration={38} aria-label={`TECHRODEO ${year}, ${dateLabel}, ${summary?.eventCount ?? 0} events`}><span>TECHRODEO {year} <b className="mx-5 text-[#e44337]">✦</b> {dateLabel} <b className="mx-5 text-[#e44337]">✦</b> {summary?.eventCount ?? "—"} ARENAS <b className="mx-5 text-[#e44337]">✦</b> LOYOLA COLLEGE <b className="mx-5 text-[#e44337]">✦</b> ANSWER THE CALL <b className="mx-5 text-[#e44337]">✦</b></span></Marquee>;
}