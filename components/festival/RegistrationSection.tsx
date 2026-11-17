"use client";
import Link from "next/link";
import { useFestivalSound } from "@/components/festival-shell";
import { ArrowRight, Skull } from "@/components/ui/icons";
export function RegistrationSection() {
  const { uiSound } = useFestivalSound();
  return (
<section
        id="register"
        className="relative overflow-hidden bg-[linear-gradient(115deg,#371d19,#151715_60%,#242016)] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_78%_50%,rgba(222,143,62,0.16),transparent_38%)] before:content-['']"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        >
          ✦　ᛟ　✦　ᚷ　✦　ᛟ　✦
        </div>
        <div className="relative mx-auto flex max-w-[1240px] flex-col items-start px-7 py-[105px] max-[767px]:px-[22px] max-[767px]:py-[72px]">
          <div className="mb-[34px] flex items-center gap-[13px] text-[9px] font-extrabold tracking-[.2em] text-[#c9bd9a] max-[767px]:mb-[25px] max-[767px]:text-[8px]">
            <span>04</span> THE CHOICE IS YOURS
          </div>
          <h2>
            ANSWER
            <br />
            <span>THE CALL.</span>
          </h2>
          <p>Your team. Your moment. Your story starts here.</p>
          <Link
            href="/register"
            className="mt-7 inline-flex min-h-[48px] items-center gap-3 border border-[#d8a65d] bg-[linear-gradient(135deg,#ba633e,#6a3026)] px-6 text-[9px] font-black tracking-[.15em] text-[#fff1dc] no-underline shadow-[0_8px_35px_rgba(174,71,42,0.2)]"
            onClick={() => uiSound("confirm")}
          >
            <span>SECURE YOUR PLACE</span>
            <ArrowRight size={17} />
          </Link>
          <small>
            Already registered?{" "}
            <Link
              href="/login"
              className="text-[#e5b86b] underline underline-offset-4"
            >
              Sign in
            </Link>{" "}
            with your generated username.
          </small>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#b8aa9b]">
            College organisers can register teams through the portal.
          </p>
        </div>
        <div className="absolute right-[10%] top-1/2 grid size-[220px] -translate-y-1/2 place-items-center rounded-full border border-[rgba(211,174,97,0.23)] text-[#d4ad62] before:absolute before:inset-3 before:rounded-full before:border before:border-dashed before:border-[rgba(211,174,97,0.25)] max-[900px]:right-[5%] max-[900px]:size-[180px] max-[767px]:right-[-56px] max-[767px]:size-[160px] max-[767px]:opacity-35">
          <Skull size={68} />
          <span>
            TECHRODEO
            <br />
            2026
          </span>
        </div>
      </section>
  );
}
