"use client";
import { useState, type CSSProperties } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Command, Flame, ShieldCheck, Skull, Volume2, VolumeX, X } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { playUiSfx } from "@/lib/sounds";

const events = [
  { name: "BugWarz", type: "DEBUGGING ARENA", time: "10:30 AM — 12:00 PM", team: "2 players", color: "#e44337", icon: "01" },
  { name: "VisWiz", type: "DATA VISUALIZATION", time: "1:30 PM — 2:30 PM", team: "2 players", color: "#d3a84e", icon: "02" },
  { name: "DataFusion", type: "CONNECTIONS", time: "10:30 AM — 12:00 PM", team: "2 players", color: "#71a875", icon: "03" },
  { name: "PitchStorm", type: "SHARK TANK", time: "2:00 PM — 3:30 PM", team: "2 players", color: "#c55b47", icon: "04" },
  { name: "IQ Verse", type: "QUIZ COMBAT", time: "11:00 AM — 12:30 PM", team: "Up to 2", color: "#9a83bd", icon: "05" },
  { name: "Profusion", type: "PROJECT SHOWCASE", time: "10:00 AM — 12:30 PM", team: "Up to 2", color: "#569eaa", icon: "06" },
  { name: "Rodeo Hunt", type: "TREASURE HUNT", time: "11:00 AM — 12:00 PM", team: "2 players", color: "#cd8541", icon: "07" },
  { name: "Data Wear", type: "CREATIVE ARENA", time: "1:30 PM — 2:30 PM", team: "2 players", color: "#bf667d", icon: "08" },
];
const faqs = [
  ["Who can participate?", "Students representing colleges and universities can register. Check each event’s eligibility details before assembling your team."],
  ["Can I join more than one event?", "Yes, subject to the fest participation rules and event schedule. Check for timing conflicts before you register."],
  ["How do team registrations work?", "A college organiser creates the team entry, adds participant details, and receives an automatic confirmation when registration is complete."],
  ["What should I bring on event day?", "Bring your college ID and bonafide certificate. Keep your team confirmation details handy at the venue."],
];

function HelmetArtwork() {
  return <svg className="helmet-art" viewBox="0 0 560 620" role="img" aria-label="Original armored sentinel helmet illustration">
    <defs>
      <linearGradient id="armor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#88936e"/><stop offset=".28" stopColor="#35443a"/><stop offset=".6" stopColor="#18211e"/><stop offset="1" stopColor="#080c0c"/></linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7df9a"/><stop offset=".45" stopColor="#bd9042"/><stop offset="1" stopColor="#55412a"/></linearGradient>
      <linearGradient id="eye" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#ff3e27"/><stop offset=".5" stopColor="#ffd27a"/><stop offset="1" stopColor="#ff4b2f"/></linearGradient>
      <radialGradient id="aura"><stop stopColor="#bc3a2d" stopOpacity=".3"/><stop offset="1" stopColor="#bc3a2d" stopOpacity="0"/></radialGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="284" cy="294" r="270" fill="url(#aura)"/>
    <circle cx="284" cy="294" r="228" fill="none" stroke="#d3a84e" strokeOpacity=".28" strokeDasharray="2 10"/>
    <circle cx="284" cy="294" r="200" fill="none" stroke="#b58b45" strokeOpacity=".16"/>
    <path d="m74 273 33-117 70-58 107-28 103 29 68 64 34 111-32 177-89 103-111 34-115-39-83-102z" fill="#0c1010" stroke="url(#gold)" strokeWidth="5"/>
    <path d="m107 255 39-110 64-38 75-17 83 18 62 42 31 106-27 151-75 90-97 29-97-34-61-82z" fill="url(#armor)" stroke="#9c834b" strokeWidth="3"/>
    <path d="m142 225 67-74 80-35 88 37 54 71-67-22-58 21-30-18-30 18-61-20z" fill="#1a221f" stroke="#b09150" strokeWidth="3"/>
    <path d="m145 245 87 23 49 37-52 18-68-29zm276 0-87 23-49 37 52 18 68-29z" fill="#101617" stroke="url(#gold)" strokeWidth="4"/>
    <path d="m165 257 71 19 34 18-45 5-48-21zm236 0-71 19-34 18 45 5 48-21z" fill="url(#eye)" filter="url(#glow)"/>
    <path d="m277 302 17-8 18 8 25 82-43 38-42-38z" fill="#111716" stroke="#bd984f" strokeWidth="4"/>
    <path d="m292 326-15 57 17 17 19-17-15-57m-41 98 36-17 37 17-9 44-29 18-28-19z" fill="#222c28" stroke="url(#gold)" strokeWidth="3"/>
    <path d="m118 357-43 22 32 71 43 20m273-113 43 22-32 71-43 20M200 476l-26 45 85 44m116-89 26 45-85 44" fill="none" stroke="#8f7544" strokeWidth="7"/>
    <path d="M108 181 65 150m356 31 43-31M284 71V27" stroke="#e4c576" strokeOpacity=".7" strokeWidth="3"/>
  </svg>;
}

export function LandingPage() {
  const [sound, setSound] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [registered, setRegistered] = useState(false);
  function uiSound(kind: "select" | "confirm" = "select") { if (sound) playUiSfx(kind); }
  return <main className="landing-page min-h-screen overflow-hidden bg-[#090b0c] text-[#eee9dc]">
    <header className="landing-nav fixed inset-x-0 top-0 z-30 border-b border-white/10">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="TECHRODEO home"><span className="landing-logo"><Command size={18}/></span><span><strong className="block text-[13px] font-black tracking-[.17em]">TECH<span className="text-[#e9543b]">RODEO</span></strong><small className="mt-1 block text-[8px] font-bold tracking-[.24em] text-[#9d9687]">DOOMSDAY · 2026</small></span></a>
        <nav className={`landing-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation"><a href="#events" onClick={() => setMenuOpen(false)}>Events</a><a href="#story" onClick={() => setMenuOpen(false)}>The call</a><a href="#schedule" onClick={() => setMenuOpen(false)}>Schedule</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a><a className="mobile-register" href="#register" onClick={() => setMenuOpen(false)}>Register <ArrowRight size={14}/></a></nav>
        <div className="flex items-center gap-3"><button className="sound-toggle" onClick={() => { if (!sound) playUiSfx("confirm"); setSound(!sound); }} aria-label={sound ? "Turn sound off" : "Turn sound on"} title={sound ? "Sound on" : "Sound off"}>{sound ? <Volume2 size={17}/> : <VolumeX size={17}/>}<span className="hidden sm:inline">SOUND {sound ? "ON" : "OFF"}</span></button><a className="nav-register" href="#register" onClick={() => uiSound()}>ENTER THE ARENA <ArrowRight size={14}/></a><button className="menu-toggle md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19}/> : <span>MENU</span>}</button></div>
      </div>
    </header>

    <section id="top" className="doom-hero relative flex min-h-[780px] items-center pt-24 md:min-h-[850px]">
      <div className="hero-radial"/><div className="hero-scanlines"/><div className="hero-vertical-label">LOYOLA COLLEGE · CHENNAI · INDIA</div>
      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-4 px-5 pb-20 pt-12 md:grid-cols-[1.04fr_.96fr] md:px-10 md:pb-24">
        <div className="hero-copy relative z-10">
          <div className="eyebrow"><span className="live-dot"/> THE INTER-COLLEGIATE TECH FEST <span className="eyebrow-year">EDITION 2026</span></div>
          <h1 className="hero-title"><span>THE</span><span className="title-doom">DOOM<span className="title-period">.</span></span><span className="title-protocol">PROTOCOL</span></h1>
          <p className="hero-intro">Eight arenas. One day. Bring your sharpest minds to the edge of the known universe.</p>
          <div className="hero-actions"><a href="#events" className="hero-primary" onClick={() => uiSound()}>EXPLORE THE EVENTS <ArrowRight size={16}/></a><a href="#story" className="hero-secondary" onClick={() => uiSound()}>DISCOVER THE CALL <span>↓</span></a></div>
          <div className="hero-event-meta"><div className="meta-icon"><CalendarDays size={17}/></div><div><span>MARK YOUR CALENDAR</span><strong>04 DECEMBER <em>2026</em></strong></div><i/><div><span>THE BATTLE BEGINS</span><strong>LOYOLA COLLEGE, CHENNAI</strong></div></div>
        </div>
        <div className="hero-art-wrap" aria-label="Armored sentinel illustration"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-coordinate">13°03' N<br/>80°16' E</div><div className="hero-art-caption"><span>FIG. 01</span><span>THE SENTINEL // CLASSIFIED</span></div><HelmetArtwork/><img className="remote-sigil" src="https://api.iconify.design/tabler/shield-chevron.svg?color=%23d3a84e" alt="" aria-hidden="true"/><div className="crosshair crosshair-top"/><div className="crosshair crosshair-bottom"/></div>
        <a href="#story" className="scroll-cue"><span className="scroll-line"/> SCROLL TO DESCEND</a>
      </div>
    </section>

    <div className="ticker-band" aria-label="TECHRODEO 2026, December 4, eight events"><div className="ticker-track">{Array.from({ length: 4 }, (_, i) => <span key={i}>TECHRODEO 2026 <b>✦</b> 04 DECEMBER <b>✦</b> EIGHT ARENAS <b>✦</b> LOYOLA COLLEGE <b>✦</b> ANSWER THE CALL <b>✦</b></span>)}</div></div>

    <section id="story" className="story-section section-pad"><div className="section-kicker"><span>01</span> THE CALLING</div><div className="story-grid"><div><h2 className="section-title">WHEN THE<br/><span>WORLD NEEDS</span><br/>A NEW ANSWER.</h2></div><div className="story-copy"><p className="story-lead">This December, the arena belongs to the bold.</p><p>TECHRODEO brings together the sharpest student minds for a day of code, creativity, strategy, and spectacle. Eight challenges. Hundreds of ideas. One campus where the next generation steps forward.</p><p>Form your team. Choose your arena. Make your mark.</p><a href="#events" className="text-link" onClick={() => uiSound()}>MEET YOUR CHALLENGE <ArrowRight size={14}/></a></div></div>
      <div className="story-stats"><div><strong>08</strong><span>EVENT ARENAS</span></div><div><strong>01</strong><span>DAY OF ACTION</span></div><div><strong>∞</strong><span>WAYS TO RISE</span></div><div className="stat-emblem"><ShieldCheck size={25}/><span>STAND<br/>TOGETHER</span></div></div>
    </section>

    <section id="events" className="events-section section-pad"><div className="section-kicker"><span>02</span> SELECT YOUR ARENA</div><div className="section-heading-row"><div><h2 className="section-title">CHOOSE YOUR<br/><span>BATTLEFIELD.</span></h2><p className="section-subtitle">Find the challenge that calls to you. Registration closes before the gates do.</p></div><div className="event-date-stamp"><span>EVENT DAY</span><strong>04 <i>DEC</i></strong><small>2026 · CHENNAI</small></div></div>
      <div className="event-grid">{events.map((event, i) => <article key={event.name} className="event-card" style={{ "--event-accent": event.color, animationDelay: `${i * 75}ms` } as CSSProperties} onMouseEnter={() => uiSound()}><div className="event-card-top"><span>ARENA {event.icon}</span><span className="event-orbit"/></div><div className="event-glyph"><span>{event.icon}</span><img src={`https://api.iconify.design/tabler/${i % 2 === 0 ? "shield-chevron" : "meteor"}.svg?color=${encodeURIComponent(event.color)}`} alt="" aria-hidden="true" loading="lazy"/></div><div className="event-info"><div className="event-type">{event.type}</div><h3>{event.name}</h3><div className="event-details"><span><Clock3 size={13}/>{event.time}</span><span><ShieldCheck size={13}/>{event.team}</span></div><a href="#register" className="event-link" onClick={() => uiSound()}>VIEW CHALLENGE <ArrowRight size={13}/></a></div><div className="event-card-edge"/></article>)}</div>
      <p className="event-footnote"><span>*</span> All event timings are listed in Indian Standard Time. Team limits vary by event.</p>
    </section>

    <section id="schedule" className="schedule-section section-pad"><div className="section-kicker"><span>03</span> ONE DAY. ALL IN.</div><div className="schedule-layout"><div><h2 className="section-title">THE DAY<br/><span>UNFOLDS.</span></h2><p className="section-subtitle">Set your coordinates. The full schedule lands closer to launch.</p><div className="schedule-date-card"><CalendarDays size={19}/><div><span>GATES OPEN</span><strong>FRIDAY · 04.12.2026</strong></div><Flame size={21} className="schedule-flame"/></div></div><div className="timeline-list"><div className="timeline-item"><time>09:00</time><i/><div><strong>THE GATES OPEN</strong><span>Check in, find your crew, get ready.</span></div></div><div className="timeline-item"><time>10:00</time><i/><div><strong>FIRST WAVE</strong><span>Profusion and the morning arenas begin.</span></div></div><div className="timeline-item"><time>12:30</time><i/><div><strong>RESET & RECHARGE</strong><span>Take a breath. The next round is coming.</span></div></div><div className="timeline-item"><time>13:30</time><i/><div><strong>SECOND WAVE</strong><span>Visuals, design, and the final showdowns.</span></div></div><div className="timeline-item"><time>16:00</time><i/><div><strong>VICTORY ASSEMBLY</strong><span>Winners announced. Legends made.</span></div></div></div></div></section>

    <section id="register" className="register-section"><div className="register-runes" aria-hidden="true">✦　ᛟ　✦　ᚷ　✦　ᛟ　✦</div><div className="register-inner"><div className="section-kicker"><span>04</span> THE CHOICE IS YOURS</div><h2>ANSWER<br/><span>THE CALL.</span></h2><p>Your team. Your moment. Your story starts here.</p><button className="register-cta" onClick={() => { uiSound("confirm"); setRegistered(true); }}><span>{registered ? "YOU’RE ON THE LIST" : "SECURE YOUR PLACE"}</span>{registered ? <Check size={17}/> : <ArrowRight size={17}/>}</button><small>{registered ? "Registration interest saved in this preview." : "College organisers can register teams through the portal."}</small></div><div className="register-sigil"><Skull size={68}/><span>TECHRODEO<br/>2026</span></div></section>

    <section id="faq" className="faq-section section-pad"><div className="section-kicker"><span>05</span> KNOW BEFORE YOU GO</div><div className="faq-layout"><div><h2 className="section-title">QUESTIONS<br/><span>FROM THE</span><br/>FRONTLINES.</h2><p className="section-subtitle">Need more intel? Reach out to the organising team.</p><a href="mailto:techrodeo@loyola.edu" className="text-link">CONTACT THE TEAM <ArrowRight size={14}/></a></div><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? "faq-open" : ""}`} key={question}><button onClick={() => { uiSound(); setOpenFaq(openFaq === i ? null : i); }} aria-expanded={openFaq === i}><span><i>0{i + 1}</i>{question}</span><ChevronDown size={17}/></button>{openFaq === i && <p>{answer}</p>}</div>)}</div></div></section>

    <footer className="landing-footer"><div className="footer-top"><a href="#top" className="flex items-center gap-3"><span className="landing-logo"><Command size={17}/></span><span><strong className="block text-[12px] font-black tracking-[.15em]">TECH<span className="text-[#e9543b]">RODEO</span></strong><small className="text-[8px] tracking-[.2em] text-[#898276]">DOOMSDAY · 2026</small></span></a><span className="footer-coordinates">LOYOLA COLLEGE · CHENNAI · 13°03' N 80°16' E</span><div className="footer-links"><a href="#events">Events</a><a href="#schedule">Schedule</a><a href="#faq">FAQ</a><a href="/dashboard">Organiser portal <ArrowRight size={12}/></a></div></div><div className="footer-bottom"><span>© 2026 TECHRODEO · LOYOLA COLLEGE</span><span>BUILT FOR THE BOLD <span className="text-[#e9543b]">✦</span></span><span>04 DECEMBER 2026</span></div></footer>
  </main>;
}

