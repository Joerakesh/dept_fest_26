"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "@/components/ui/icons";
import { useFestivalSound } from "@/components/festival-shell";
const faqs = [
  [
    "Who can participate?",
    "Students representing colleges and universities can register. Check each event’s eligibility details before assembling your team.",
  ],
  [
    "Can I join more than one event?",
    "Yes, subject to the fest participation rules and event schedule. Check for timing conflicts before you register.",
  ],
  [
    "How do team registrations work?",
    "A college organiser creates the team entry, adds participant details, and receives an automatic confirmation when registration is complete.",
  ],
  [
    "What should I bring on event day?",
    "Bring your college ID and bonafide certificate. Keep your team confirmation details handy at the venue.",
  ],
];
export function FaqSection() {
  const { uiSound } = useFestivalSound();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
<section
        id="faq"
        className="relative bg-[#0c0e0d] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(207,173,96,0.3),transparent)] before:content-[''] px-[max(24px,calc((100vw-1240px)/2))] py-[120px] max-[767px]:px-[22px] max-[767px]:py-[80px]"
      >
        <div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a] max-[767px]:mb-[25px] max-[767px]:text-[8px]">
          <span>05</span> KNOW BEFORE YOU GO
        </div>
        <div className="grid grid-cols-[.75fr_1.25fr] gap-[8%] max-[767px]:grid-cols-1 max-[767px]:gap-[32px]">
          <div>
            <h2 className="m-0 text-[clamp(37px,6vw,73px)] font-black leading-[.99] tracking-[-.065em] text-[#ede8db] max-[767px]:text-[clamp(38px,11vw,60px)]">
              QUESTIONS
              <br />
              <span>FROM THE</span>
              <br />
              FRONTLINES.
            </h2>
            <p className="mt-[17px] max-w-[410px] text-[12px] leading-[1.8] text-[#969386]">
              Need more intel? Reach out to the organising team.
            </p>
            <Link
              href={
                process.env.NEXT_PUBLIC_ORGANISER_EMAIL
                  ? `mailto:${process.env.NEXT_PUBLIC_ORGANISER_EMAIL}`
                  : "mailto:"
              }
              className="mt-[11px] inline-flex items-center gap-[10px] text-[9px] font-black tracking-[.16em] text-[#e0b660] no-underline"
            >
              CONTACT THE TEAM <ArrowRight size={14} />
            </Link>
          </div>
          <div className="border-t border-white/[.12]">
            {faqs.map(([question, answer], i) => (
              <div
                className={`faq-item ${openFaq === i ? "text-[#e4c37e]" : ""}`}
                key={question}
              >
                <button
                  onClick={() => {
                    uiSound();
                    setOpenFaq(openFaq === i ? null : i);
                  }}
                  aria-expanded={openFaq === i}
                >
                  <span>
                    <i>0{i + 1}</i>
                    {question}
                  </span>
                  <ChevronDown size={17} />
                </button>
                {openFaq === i && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
