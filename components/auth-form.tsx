"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

type Mode = "register" | "login";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createdUsername, setCreatedUsername] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "register" ? { name, college, department, password } : { username, password }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Something went wrong.");
      if (mode === "register") {
        setCreatedUsername(payload.user.username);
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0d0d] px-5 py-12 text-[#f5eee5]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(190,75,48,.17),transparent_38%),linear-gradient(rgba(214,190,127,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(214,190,127,.035)_1px,transparent_1px)] bg-[size:auto,52px_52px,52px_52px]" />
    <section className="relative w-full max-w-[440px] border border-white/10 bg-[#141615]/95 p-7 shadow-[0_24px_90px_rgba(0,0,0,.48)] sm:p-9">
      <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#a69b8b] hover:text-[#e6b66c]"><ArrowLeft size={14}/> Back to TECHRODEO</Link>
      <div className="mt-9 flex items-center gap-2 text-[9px] font-black tracking-[.2em] text-[#d5ad67]"><ShieldCheck size={15}/> TECHRODEO 2026 / PARTICIPANT PORTAL</div>
      {createdUsername ? <>
        <h1 className="mt-6 text-3xl font-black tracking-[-.05em]">YOU’RE IN.</h1>
        <p className="mt-3 text-sm leading-6 text-[#b6aca0]">Your account is ready. Save this generated username — you’ll use it every time you sign in.</p>
        <div className="mt-6 border border-[#d5ad67]/40 bg-[#d5ad67]/[.07] p-5">
          <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#b8a783]">Your username</div>
          <div className="mt-2 break-all font-mono text-2xl font-bold tracking-wide text-[#f0c878]">{createdUsername}</div>
          <button onClick={() => navigator.clipboard.writeText(createdUsername)} className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#e5b86b] underline underline-offset-4">Copy username</button>
        </div>
        <Link href="/login" className="mt-6 flex h-11 items-center justify-center gap-2 bg-[#a94330] text-[10px] font-black uppercase tracking-[.14em] hover:bg-[#c45239]">Continue to sign in <ArrowRight size={14}/></Link>
      </> : <>
        <h1 className="mt-6 text-3xl font-black uppercase tracking-[-.055em]">{mode === "register" ? "Claim your place." : "Welcome back."}</h1>
        <p className="mt-2 text-sm leading-6 text-[#a79d91]">{mode === "register" ? "Create your participant account. We’ll generate your username." : "Sign in with the username created during registration."}</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          {mode === "register" ? <>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#c9bd9a]">Full name<input required minLength={2} maxLength={80} autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="mt-2 h-11 w-full border border-white/10 bg-[#0c0e0e] px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#d5ad67]" /></label>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#c9bd9a]">College<input required minLength={2} maxLength={120} autoComplete="organization" value={college} onChange={e => setCollege(e.target.value)} placeholder="Your college name" className="mt-2 h-11 w-full border border-white/10 bg-[#0c0e0e] px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#d5ad67]" /></label>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#c9bd9a]">Department<input required minLength={2} maxLength={100} autoComplete="organization-title" value={department} onChange={e => setDepartment(e.target.value)} placeholder="Your department (e.g. Data Science)" className="mt-2 h-11 w-full border border-white/10 bg-[#0c0e0e] px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#d5ad67]" /></label>
          </> : <label className="block text-[10px] font-bold uppercase tracking-wider text-[#c9bd9a]">Username<input required autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Generated username" className="mt-2 h-11 w-full border border-white/10 bg-[#0c0e0e] px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#d5ad67]" /></label>}
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#c9bd9a]">Password<input required minLength={mode === "register" ? 8 : undefined} type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === "register" ? "At least 8 characters" : "Your password"} className="mt-2 h-11 w-full border border-white/10 bg-[#0c0e0e] px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#d5ad67]" /></label>
          {error && <p role="alert" className="border border-red-400/25 bg-red-400/5 px-3 py-2 text-xs text-red-300">{error}</p>}
          <button disabled={busy} className="flex h-11 w-full items-center justify-center gap-2 border border-[#e37b4e] bg-[linear-gradient(135deg,#a94330,#6e2c25)] text-[10px] font-black uppercase tracking-[.15em] text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{busy ? "Please wait…" : mode === "register" ? "Create account" : "Sign in"} <ArrowRight size={14}/></button>
        </form>
        <p className="mt-6 text-center text-xs text-[#91877c]">{mode === "register" ? "Already registered?" : "New to TECHRODEO?"} <Link className="font-bold text-[#e5b86b] underline underline-offset-4" href={mode === "register" ? "/login" : "/register"}>{mode === "register" ? "Sign in" : "Create an account"}</Link></p>
      </>}
    </section>
  </main>;
}
