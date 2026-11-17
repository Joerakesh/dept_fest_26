"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { PortalRow } from "@/lib/portal-data";

const initialForm = { name: "", category: "", description: "", eventDate: "", startTime: "", endTime: "", venue: "", minTeamSize: "1", maxTeamSize: "2", status: "DRAFT", registrationStatus: "CLOSED" };
export function EventManagement({ rows }: { rows: PortalRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setSaved("");
    try {
      const response = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, minTeamSize: Number(form.minTeamSize), maxTeamSize: Number(form.maxTeamSize) }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Event save failed.");
      setSaved("Event saved to MongoDB."); setForm(initialForm); router.refresh();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Event save failed."); }
    finally { setBusy(false); }
  }
  const fields: { name: keyof typeof initialForm; label: string; type?: string }[] = [
    { name: "name", label: "Event name" }, { name: "category", label: "Category" }, { name: "eventDate", label: "Date", type: "date" }, { name: "startTime", label: "Start", type: "time" }, { name: "endTime", label: "End", type: "time" }, { name: "venue", label: "Venue" }, { name: "minTeamSize", label: "Minimum team size", type: "number" }, { name: "maxTeamSize", label: "Maximum team size", type: "number" },
  ];
  const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row)))).filter((key) => key !== "id").slice(0, 7);
  return <main className="mx-auto max-w-[1500px] px-5 py-10 text-[#eee9dc] lg:px-8"><div className="mb-7"><div className="text-[9px] font-black uppercase tracking-[.2em] text-[#c7a45c]">Super Admin · MongoDB</div><h1 className="mt-2 text-3xl font-black">Event catalogue</h1><p className="mt-2 text-xs text-[#938c81]">Create and publish event configuration used by public pages and organiser workspaces.</p></div><form onSubmit={submit} className="mb-8 grid gap-4 border border-white/10 bg-[#121514] p-5 sm:grid-cols-2 xl:grid-cols-4">{fields.map((field) => <label key={field.name} className="text-[9px] font-bold uppercase tracking-wider text-[#b9ad99]">{field.label}<input required={field.name !== "venue"} min={field.type === "number" ? 1 : undefined} max={field.type === "number" ? 20 : undefined} type={field.type ?? "text"} value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} className="mt-2 h-10 w-full border border-white/10 bg-[#0b0d0d] px-3 text-xs normal-case tracking-normal text-white outline-none focus:border-[#d3ae61]"/></label>)}<label className="text-[9px] font-bold uppercase tracking-wider text-[#b9ad99]">Catalogue visibility<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 h-10 w-full border border-white/10 bg-[#0b0d0d] px-3 text-xs text-white"><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></label><label className="text-[9px] font-bold uppercase tracking-wider text-[#b9ad99]">Registration state<select value={form.registrationStatus} onChange={(e) => setForm({ ...form, registrationStatus: e.target.value })} className="mt-2 h-10 w-full border border-white/10 bg-[#0b0d0d] px-3 text-xs text-white"><option value="CLOSED">Closed</option><option value="OPEN">Open</option></select></label><label className="sm:col-span-2 xl:col-span-4 text-[9px] font-bold uppercase tracking-wider text-[#b9ad99]">Description<textarea required maxLength={4000} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-2 w-full border border-white/10 bg-[#0b0d0d] p-3 text-xs normal-case tracking-normal text-white outline-none focus:border-[#d3ae61]"/></label>{error && <p role="alert" className="text-xs text-red-300 sm:col-span-2 xl:col-span-4">{error}</p>}{saved && <p role="status" className="text-xs text-emerald-300 sm:col-span-2 xl:col-span-4">{saved}</p>}<div className="sm:col-span-2 xl:col-span-4"><button disabled={busy} className="border border-[#b95038] bg-[#5c2b22] px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#f5ddbe] disabled:opacity-50">{busy ? "Saving…" : "Save event"}</button></div></form><section className="overflow-hidden border border-white/10 bg-[#121514]"><h2 className="border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[.15em]">Database events · {rows.length}</h2>{rows.length === 0 ? <p className="px-5 py-8 text-sm text-[#999184]">No events have been created yet.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-xs"><thead><tr>{columns.map((key) => <th key={key} className="border-b border-white/10 px-4 py-3 uppercase text-[#928b80]">{key}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={String(row.id ?? index)} className="border-b border-white/[.06]">{columns.map((key) => <td key={key} className="max-w-[280px] truncate px-4 py-3 text-[#d5cec2]">{String(row[key] ?? "—")}</td>)}</tr>)}</tbody></table></div>}</section></main>;
}