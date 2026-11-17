"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { HeroFigure3D } from "@/components/hero-figure-3d";
import { ArrowUpRight, CalendarDays, MapPin, RotateCcw, Sparkles } from "lucide-react";

type EventRecord = {
  id: string; name: string; category: string; description: string;
  startTime: string; endTime: string; minTeamSize: number; maxTeamSize: number; rules: string[];
};
const themes = [
  { name:"THUNDER",color:"#7dd3fc",glow:"rgba(56,189,248,.5)" },{ name:"VANGUARD",color:"#cbd5e1",glow:"rgba(148,163,184,.5)" },
  { name:"GAMMA",color:"#00ff66",glow:"rgba(0,255,102,.5)" },{ name:"MYSTIC",color:"#f59e0b",glow:"rgba(245,158,11,.5)" },
  { name:"BOTANIC",color:"#86efac",glow:"rgba(34,197,94,.5)" },{ name:"QUANTUM",color:"#fb7185",glow:"rgba(244,63,94,.5)" },
  { name:"DOOMSDAY",color:"#a3e635",glow:"rgba(163,230,53,.5)" },{ name:"NOVA",color:"#c4b5fd",glow:"rgba(167,139,250,.5)" },
];
const zipEvents: EventRecord[] = [
 {id:"bugwarz",name:"BugWarz",category:"DEBUGGING",description:"A two-stage debugging challenge: qualify through an MCQ assessment, then solve Python debugging problems.",startTime:"10:30 AM",endTime:"12:00 PM",minTeamSize:2,maxTeamSize:2,rules:["Preliminary round is an objective-type MCQ assessment.","The top ten teams advance to the final round.","Each team must be represented by two members from the same department.","Teams must complete debugging tasks within the allotted time.","The competition uses Python."]},
 {id:"viswiz",name:"VisWiz",category:"DATA VISUALIZATION",description:"Turn data into insight through visualization questions, clue interpretation and a final data storytelling round.",startTime:"1:30 PM",endTime:"2:30 PM",minTeamSize:2,maxTeamSize:2,rules:["Two participants per team.","Three rounds: Preliminary, Intermediate and Final.","Communication must take place only in English.","Preliminary: a 10-minute elimination round with objective visualization questions.","Intermediate: one player gives technical clues while the other identifies the chart/design concept within one minute per team.","Final: teams receive a dataset and construct one narrative with their conclusions."]},
 {id:"datafusion",name:"Data Fusion",category:"CONNECTIONS",description:"Connect images, words and fragments to uncover technology and data concepts across three rounds.",startTime:"10:30 AM",endTime:"12:00 PM",minTeamSize:2,maxTeamSize:2,rules:["Each team must consist of two participants.","Round 1: identify a tech term by connecting two or three images or words; this is an elimination round.","Round 2: combine two to four fragments such as images, letters or syllables to form a tech word.","Round 3: identify all four related technology/data terms from clues within the time limit."]},
 {id:"pitchstorm",name:"PitchStorm",category:"SHARK TANK",description:"Pitch an original technology-based business idea and defend its innovation, feasibility and market potential.",startTime:"2:00 PM",endTime:"3:30 PM",minTeamSize:2,maxTeamSize:2,rules:["Each team must have two participants and present an original tech-based business idea using a PPT.","Presentation: six minutes, followed by two minutes of Q&A.","Ideas must be legal and ethical; participants must register before the deadline.","Depending on turnout, the event may have an on-spot case-study preliminary followed by a final pitch, or one direct PPT round.","Teams must bring their own laptops.","Tie-breakers consider clarity, uniqueness and practical feasibility."]},
 {id:"iq-verse",name:"IQ Verse",category:"QUIZ",description:"A competitive quiz spanning Data Science, Computer Science, Statistics and Mathematics.",startTime:"11:00 AM",endTime:"12:30 PM",minTeamSize:1,maxTeamSize:2,rules:["A team may consist of a maximum of two participants.","Two rounds: Preliminary and Final.","Questions cover Data Science, Computer Science, Statistics and Mathematics.","Top-performing teams in the Preliminary qualify for the Final.","There is no negative marking for incorrect or unanswered questions.","Mobile phones and smart devices are prohibited during all rounds.","Time limits are strictly enforced; tie-breaker questions may be used."]},
 {id:"profusion",name:"Profusion",category:"PROJECT PRESENTATION",description:"Present a project in Data Analysis, Machine Learning, Deep Learning, NLP or Statistics to the judging panel.",startTime:"10:00 AM",endTime:"12:30 PM",minTeamSize:1,maxTeamSize:2,rules:["Maximum two participants per team.","Choose a project topic related to Data Analysis, Machine Learning, Deep Learning, NLP or Statistics.","Each team has five minutes: one minute technical preparation, three minutes presentation and one minute Q&A.","A buzzer is played one minute before the four-minute presentation/Q&A period ends.","Judging considers technical depth, clarity, practical application and Q&A.","Bring your own laptop; slides must be PPT/PDF. Use appropriate language, visuals and citations.","Internet access will not be provided. Report 10–15 minutes before your slot."]},
 {id:"rodeo-hunt",name:"Rodeo Hunt",category:"TREASURE HUNT",description:"Solve aptitude, puzzle and computing challenges in a campus-wide treasure hunt.",startTime:"11:00 AM",endTime:"12:00 PM",minTeamSize:2,maxTeamSize:2,rules:["Two participants per team.","The event has preliminary and final rounds.","Preliminary (25 minutes): general aptitude, puzzles, crosswords and similar challenges.","Final (25 minutes): basic Mathematics, Statistics and Computer Science, including Python and Java, with an emphasis on problem-solving.","Mobile phones, smartwatches, Bluetooth devices and internet access are prohibited."]},
 {id:"data-wear",name:"Data Wear",category:"T-SHIRT PAINTING",description:"Create original artwork on a plain T-shirt based on a theme announced on the spot.",startTime:"1:30 PM",endTime:"2:30 PM",minTeamSize:2,maxTeamSize:2,rules:["Two participants per team.","Artwork must relate to the theme announced on the spot.","Bring your own plain white/black T-shirt (size L), paints, glitter, brushes, mixing plate, pencil, pen and eraser.","Pictorial references and ready-made stickers are prohibited.","Tracing or copying in any form is not allowed.","Judging considers creativity, visual impact, application quality and expression of the theme.","Mobile phones, smartwatches and Bluetooth devices are prohibited."]}
];
function FogCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let frame = 0; let raf = 0;
    const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 1.5); canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
    const motes = Array.from({length:48},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+0.4,v:Math.random()*.35+.08,a:Math.random()*.55+.1}));
    resize(); addEventListener("resize",resize);
    const draw=()=>{frame++;ctx.clearRect(0,0,innerWidth,innerHeight);
      const g=ctx.createRadialGradient(innerWidth*.5,innerHeight*.55,0,innerWidth*.5,innerHeight*.55,innerWidth*.7);g.addColorStop(0,"rgba(0,100,48,.08)");g.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=g;ctx.fillRect(0,0,innerWidth,innerHeight);
      motes.forEach(m=>{m.y-=m.v;m.x+=Math.sin(frame*.004+m.r)*.18;if(m.y< -10){m.y=innerHeight+10;m.x=Math.random()*innerWidth;}ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,255,102,${m.a})`;ctx.shadowBlur=12;ctx.shadowColor="#00ff66";ctx.fill();});
      ctx.shadowBlur=0;raf=requestAnimationFrame(draw);};
    draw(); return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-50"/>;
}

function EntryIntro({ onDone }: { onDone:()=>void }) {
  useEffect(()=>{const t=window.setTimeout(onDone,2600);return()=>clearTimeout(t);},[onDone]);
  return <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030705]" initial={{opacity:1}} exit={{opacity:0,scale:1.04}} transition={{duration:.65}}>
    <motion.div className="absolute h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full border border-[#00ff66]/20" animate={{rotate:360,scale:[.92,1.04,.92]}} transition={{duration:9,repeat:Infinity,ease:"linear"}}/>
    <motion.div className="absolute h-[min(54vw,400px)] w-[min(54vw,400px)] rounded-full border border-dashed border-[#00ff66]/35" animate={{rotate:-360}} transition={{duration:16,repeat:Infinity,ease:"linear"}}/>
    <div className="relative text-center">
      <motion.p initial={{opacity:0,letterSpacing:".8em"}} animate={{opacity:1,letterSpacing:".32em"}} transition={{duration:.9}} className="text-[10px] font-bold text-[#00ff66]">LOYOLA COLLEGE PRESENTS</motion.p>
      <motion.h1 initial={{opacity:0,y:30,scale:.9}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.35,duration:.8}} className="mt-5 font-serif text-5xl font-black tracking-[.12em] text-white sm:text-7xl">DATAVERSE</motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} className="mt-4 font-mono text-[10px] tracking-[.42em] text-[#9eaaa4]">DATAVERSE · BEYOND THE DATA</motion.p>
      <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:.65,duration:1.2}} className="mx-auto mt-9 h-px w-48 origin-left bg-gradient-to-r from-transparent via-[#00ff66] to-transparent"/>
    </div>
  </motion.div>;
}

function HeroFigure({ theme }: {theme:number}) {
  return <div className="relative mx-auto aspect-square w-full max-w-[440px]">
    <div className="absolute inset-[8%] rounded-full border border-[#00ff66]/20 [transform:rotateX(68deg)]"/>
    <div className="absolute inset-[15%] rounded-full border border-dashed border-[#00ff66]/20 [transform:rotateX(68deg)_rotate(28deg)]"/>
    <HeroFigure3D theme={theme} className="relative z-10 h-full w-full"/>
  </div>;
}

export function SymposiumLandingExperience() {
  const router=useRouter();
  const [events,setEvents]=useState<EventRecord[]>([]);
  const [intro,setIntro]=useState(true);
  const [transition,setTransition]=useState<{event:EventRecord,index:number}|null>(null);
  const [selectedEvent,setSelectedEvent]=useState<{event:EventRecord,index:number}|null>(null);
  useEffect(()=>{const c=new AbortController();fetch("/api/events",{cache:"no-store",signal:c.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(p=>setEvents(Array.isArray(p.data)?p.data:(Array.isArray(p.events)?p.events:[]))).catch(()=>setEvents([]));return()=>c.abort();},[]);
  const visibleEvents=zipEvents;
  const summary=useMemo(()=>({count:visibleEvents.length,date:visibleEvents.find(e=>e.eventDate)?.eventDate}),[visibleEvents]);
  const startTransition=useCallback((event:EventRecord,index:number)=>setTransition({event,index}),[]);
  const finishTransition=useCallback(()=>{if(!transition)return;setSelectedEvent(transition);setTransition(null);},[transition]);
  useEffect(()=>{if(!transition)return;const timer=window.setTimeout(finishTransition,1250);return()=>window.clearTimeout(timer);},[transition,finishTransition]);
  const dateLabel=summary.date?new Date(summary.date+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}):"DATE TO BE ANNOUNCED";
  return <div className="relative min-h-screen overflow-hidden bg-[#050806] text-[#e6ece9] selection:bg-[#00ff66]/30">
    <FogCanvas/>
    <AnimatePresence>{intro&&<EntryIntro onDone={()=>setIntro(false)}/>}</AnimatePresence>
    <AnimatePresence>{transition&&<motion.div key={transition.event.id} className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[#020503]/95" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.18}}>
      <motion.div className="absolute inset-0" style={{background:`radial-gradient(circle at center,${themes[transition.index%7].glow},transparent 65%)`}} initial={{scale:.2,opacity:0}} animate={{scale:[.2,1.4,2],opacity:[0,.85,0]}} transition={{duration:1.15}}/>
      <motion.div className="absolute inset-0" initial={{scale:.5,rotate:-25,opacity:0}} animate={{scale:1.5,rotate:35,opacity:[0,1,0]}} transition={{duration:1.15}}><svg viewBox="0 0 1000 1000" className="h-full w-full"><g fill="none" stroke={themes[transition.index%7].color} strokeWidth="3"><circle cx="500" cy="500" r="220" strokeDasharray="14 10"/><circle cx="500" cy="500" r="320"/><path d="M0 0L500 500 1000 0M0 1000L500 500 1000 1000M500 0V1000M0 500H1000"/></g></svg></motion.div>
      <motion.div initial={{scale:.35,y:50,opacity:0}} animate={{scale:1,y:0,opacity:1}} transition={{duration:.55,delay:.12}}><HeroFigure theme={transition.index}/></motion.div>
      <motion.div className="absolute bottom-12 text-center" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.2}}><p className="font-serif text-2xl font-black tracking-[.2em] text-white">{transition.event.name.toUpperCase()}</p><p className="mt-2 font-mono text-[10px] tracking-[.25em] text-[#00ff66]">ENTERING ARENA</p></motion.div>
      <motion.div className="absolute inset-0 bg-white" initial={{opacity:0}} animate={{opacity:[0,.85,0]}} transition={{duration:.25,delay:.82}}/>
    </motion.div>}</AnimatePresence>

    <AnimatePresence>{selectedEvent&&<motion.div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelectedEvent(null)}>
      <motion.section role="dialog" aria-modal="true" aria-labelledby="event-detail-title" onClick={e=>e.stopPropagation()} initial={{opacity:0,y:28,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:18,scale:.97}} transition={{duration:.3}} className="relative my-8 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#00ff66]/30 bg-[#07100b] p-6 shadow-[0_0_70px_rgba(0,255,102,.12)] sm:p-8">
        <button type="button" onClick={()=>setSelectedEvent(null)} aria-label="Close event details" className="absolute right-5 top-5 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 hover:border-[#00ff66] hover:text-white">Close ✕</button>
        <p className="font-mono text-[10px] tracking-[.28em] text-[#00ff66]">DATAVERSE · EVENT INTEL</p>
        <h2 id="event-detail-title" className="mt-3 pr-16 font-serif text-3xl font-black text-white sm:text-4xl">{selectedEvent.event.name}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#a8b5b0]">{selectedEvent.event.description}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="font-mono text-[10px] text-[#8e9b97]">SCHEDULE</p><p className="mt-2 text-sm font-semibold text-white">{selectedEvent.event.startTime} – {selectedEvent.event.endTime}</p></div>
          <div className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="font-mono text-[10px] text-[#8e9b97]">TEAM SIZE</p><p className="mt-2 text-sm font-semibold text-white">{selectedEvent.event.minTeamSize===selectedEvent.event.maxTeamSize?selectedEvent.event.maxTeamSize+" participants":"Up to "+selectedEvent.event.maxTeamSize+" participants"}</p></div>
        </div>
        <div className="mt-7"><h3 className="font-serif text-xl font-bold text-white">Event rules</h3><ol className="mt-4 space-y-3">{selectedEvent.event.rules.map((rule,i)=><li key={i} className="flex gap-3 text-sm leading-relaxed text-[#c4d0ca]"><span className="font-mono text-xs text-[#00ff66]">{String(i+1).padStart(2,"0")}</span><span>{rule}</span></li>)}</ol></div>
        <p className="mt-7 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-[#829089]">General participant instructions are available in the DATAVERSE rulebook. Contact the event organisers for any clarification.</p>
      </motion.section>
    </motion.div>}</AnimatePresence>
    <header className="sticky top-0 z-30 border-b border-[#8e9b97]/15 bg-[#050806]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-5 px-5 sm:px-8">
        <a href="#top" className="shrink-0 font-serif text-lg font-black tracking-[.17em] text-white">TECH<span className="text-[#00ff66]">RODEO</span></a>
        <nav className="hidden items-center gap-8 text-sm text-[#8e9b97] md:flex"><a href="#events" className="hover:text-white">Events</a><a href="#schedule" className="hover:text-white">Schedule</a><a href="#venue" className="hover:text-white">Venue</a></nav>
        <div className="flex items-center gap-2">
          <button onClick={()=>setIntro(true)} className="hidden items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-[#aab5af] sm:flex"><RotateCcw size={14}/> Replay intro</button>
          <button onClick={()=>document.getElementById("events")?.scrollIntoView({behavior:"smooth"})} className="rounded-lg bg-[#00ff66] px-4 py-2.5 text-xs font-bold text-[#041008] hover:bg-emerald-400">Explore events</button>
        </div>
      </div>
    </header>

    <main id="top" className="relative z-10">
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-12 lg:pb-28">
        <motion.div className="lg:col-span-7" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.2,ease:[.16,1,.3,1]}}>
          <p className="font-mono text-xs tracking-[.25em] text-[#00ff66]">LOYOLA COLLEGE · INTER-COLLEGIATE TECH FEST</p>
          <h1 className="metallic-title mt-5 font-serif text-5xl font-black leading-[1.04] tracking-[.08em] sm:text-6xl lg:text-7xl">THE<br/>DOOMSDAY<br/><span className="text-[#00ff66]">PROTOCOL</span></h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-[#a8b5b0] sm:text-lg">Choose your arena. Trigger its cinematic hero sequence. Bring your sharpest ideas to DATAVERSE.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#events" className="inline-flex items-center gap-2 rounded-xl bg-[#00ff66] px-6 py-3.5 text-sm font-bold text-[#050806] shadow-[0_0_28px_rgba(0,255,102,.25)]">Explore {summary.count||"the"} events <ArrowUpRight size={16}/></a></div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-7"><div><strong className="font-mono text-2xl text-white">{summary.date?new Date(summary.date+"T00:00:00").toLocaleDateString("en-IN",{month:"short",day:"numeric"}):"TBA"}</strong><p className="mt-1 text-xs text-[#8e9b97]">Event date</p></div><div><strong className="font-mono text-2xl text-white">{String(summary.count).padStart(2,"0")}</strong><p className="mt-1 text-xs text-[#8e9b97]">Published arenas</p></div><div><strong className="font-mono text-2xl text-[#00ff66]">GO</strong><p className="mt-1 text-xs text-[#8e9b97]">Your moment</p></div></div>
        </motion.div>
        <motion.div className="lg:col-span-5" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:1,delay:.35}}><HeroFigure theme={6}/><p className="text-center font-mono text-[10px] tracking-[.3em] text-[#8e9b97]">DOOMSDAY PROTOCOL · {dateLabel.toUpperCase()}</p></motion.div>
      </section>

      <section id="events" className="mx-auto max-w-6xl border-t border-white/10 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-mono text-xs tracking-[.22em] text-[#00ff66]">SELECT YOUR ARENA</p><h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">Choose your battlefield</h2></div><p className="max-w-md text-sm text-[#8e9b97]">Explore all eight events. Select a card to play its cinematic sequence and read the event rules.</p></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{visibleEvents.map((event,i)=>{const t=themes[i%themes.length];return <motion.button key={event.id} type="button" onClick={()=>startTransition(event,i)} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.45,delay:(i%3)*.07}} whileHover={{y:-7,rotateX:2}} className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#0a100d]/85 p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.04)] hover:border-[#00ff66]/50 ${event.id==="tech-arena"?"md:col-span-2 lg:col-span-3":""}`} style={{transformStyle:"preserve-3d"}}><div className="absolute -right-10 -top-10 size-40 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-30" style={{background:t.color}}/><div><div className="flex items-center justify-between font-mono text-[10px] text-[#8e9b97]"><span>{String(i+1).padStart(2,"0")} · {event.category||"EVENT"}</span><span style={{color:t.color}}>{event.startTime||"TIME TBA"}</span></div><div className="my-5 flex items-center gap-4"><div className="relative size-24 shrink-0 overflow-hidden rounded-xl border bg-[#030705]/70" style={{borderColor:t.color+"55",boxShadow:`0 0 24px ${t.glow}`}}><HeroFigure3D theme={i} className="h-full w-full"/></div><div><h3 className="font-serif text-xl font-bold text-white group-hover:text-[#00ff66]">{event.name}</h3><p className="mt-1 text-xs" style={{color:t.color}}>{t.name} · Hero Arena</p></div></div><p className="text-sm leading-relaxed text-[#8e9b97]">{event.description||"Enter the arena and take on the challenge."}</p></div><div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs"><span className="text-[#8e9b97]">{event.minTeamSize===event.maxTeamSize?event.maxTeamSize+" participants":"Up to "+event.maxTeamSize+" participants"}</span><span className="inline-flex items-center gap-1 font-semibold text-[#00ff66]">View event <ArrowUpRight size={14}/></span></div></motion.button>;})}</div>
      </section>

      <section id="schedule" className="mx-auto max-w-6xl border-t border-white/10 px-5 py-16 sm:px-8 sm:py-24"><div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="font-mono text-xs tracking-[.22em] text-[#00ff66]">EVENT TIMELINE</p><h2 className="mt-2 font-serif text-3xl font-bold text-white">Schedule & venue</h2><p className="mt-4 text-sm leading-relaxed text-[#8e9b97]">Event timings and venues are loaded from the published event catalogue.</p><div id="venue" className="mt-8 space-y-4 text-sm"><p className="flex items-center gap-3"><CalendarDays className="text-[#00ff66]" size={16}/>{dateLabel}</p><p className="flex items-center gap-3"><MapPin className="text-[#00ff66]" size={16}/>Loyola College, Chennai</p><p className="flex items-center gap-3"><Sparkles className="text-[#00ff66]" size={16}/>Select an event to view its rules</p></div></div><div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-7">{visibleEvents.map((e,i)=><div key={e.id} className="flex flex-wrap items-center justify-between gap-4 py-4"><div className="flex items-center gap-5"><span className="w-20 font-mono text-xs text-[#00ff66]">{e.startTime||"TBA"}</span><div><p className="text-sm font-semibold text-white">{e.name}</p><p className="text-xs text-[#8e9b97]">{e.category} · {e.endTime}</p></div></div><button onClick={()=>startTransition(e,i)} className="text-xs text-[#8e9b97] hover:text-[#00ff66]">Enter →</button></div>)}</div></div></section>
    </main>
    <footer className="relative z-10 border-t border-white/10 py-10"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-xs text-[#8e9b97] sm:flex-row sm:px-8"><span className="font-serif tracking-[.18em] text-white">DATAVERSE</span><span>LOYOLA COLLEGE · CHENNAI · DOOMSDAY PROTOCOL</span><button onClick={()=>document.getElementById("events")?.scrollIntoView({behavior:"smooth"})} className="text-[#00ff66]">Explore events ↗</button></div></footer>
  </div>;
}
