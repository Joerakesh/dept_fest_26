"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "@/components/ui/icons";
import { useFestivalSound } from "@/components/festival-shell";

type FaqRecord = { id: string; question: string; answer: string };
export function FaqSection() {
  const { uiSound } = useFestivalSound();
  const [faqs, setFaqs] = useState<FaqRecord[]>([]);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/faqs", { cache: "no-store", signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error("FAQ query failed"); const payload: { data?: FaqRecord[] } = await response.json(); if (Array.isArray(payload.data)) { setFaqs(payload.data); setOpenFaq(payload.data[0]?.id ?? null); } })
      .catch((error: unknown) => { if (!(error instanceof DOMException && error.name === "AbortError")) setLoadError(true); });
    return () => controller.abort();
  }, []);
  return <section id="faq" className="relative bg-[#0c0e0d] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(207,173,96,0.3),transparent)] before:content-[''] px-[max(24px,calc((100vw-1240px)/2))] py-[120px] max-[767px]:px-[22px] max-[767px]:py-[80px]"><div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a]"><span>05</span> KNOW BEFORE YOU GO</div><div className="grid grid-cols-[.75fr_1.25fr] gap-[8%] max-[767px]:grid-cols-1 max-[767px]:gap-[32px]"><div><h2 className="m-0 text-[clamp(37px,6vw,73px)] font-black leading-[.99] tracking-[-.065em] text-[#ede8db] max-[767px]:text-[clamp(38px,11vw,60px)]">QUESTIONS<br/><span>FROM THE</span><br/>FRONTLINES.</h2><p className="mt-[17px] max-w-[410px] text-[12px] leading-[1.8] text-[#969386]">Need more intel? Reach out to the organising team.</p><a href={process.env.NEXT_PUBLIC_ORGANISER_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_ORGANISER_EMAIL}` : "mailto:"} className="mt-[11px] inline-flex items-center gap-[10px] text-[9px] font-black tracking-[.16em] text-[#e0b660] no-underline">CONTACT THE TEAM <ArrowRight size={14}/></a></div><div className="border-t border-white/[.12]">{faqs.map((faq, index) => <div className={`faq-item ${openFaq === faq.id ? "text-[#e4c37e]" : ""}`} key={faq.id}><button onClick={() => { uiSound(); setOpenFaq(openFaq === faq.id ? null : faq.id); }} aria-expanded={openFaq === faq.id}><span><i>{String(index + 1).padStart(2, "0")}</i>{faq.question}</span><ChevronDown size={17}/></button>{openFaq === faq.id && <p>{faq.answer}</p>}</div>)}{!loadError && faqs.length === 0 && <p className="px-4 py-8 text-sm text-[#999184]">Published answers will appear here.</p>}{loadError && <p role="status" className="px-4 py-8 text-sm text-[#999184]">FAQ information is temporarily unavailable.</p>}</div></div></section>;
}