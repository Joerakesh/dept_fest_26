import type { PortalRole } from "@/lib/auth";
import type { PortalOverview } from "@/lib/portal-data";

const headings: Record<PortalRole, string> = { superadmin: "Platform overview", college_admin: "College overview", organiser: "College overview", coordinator: "Coordinator overview" };

export function DashboardOverview({ role, data }: { role: PortalRole; data: PortalOverview }) {
  const columns = Array.from(new Set(data.recent.flatMap((row) => Object.keys(row)))).filter((key) => key !== "id").slice(0, 5);
  return <main className="mx-auto min-h-[calc(100vh-64px)] max-w-[1500px] px-5 py-10 text-[#eee9dc] lg:px-8">
    <div className="mb-8"><div className="text-[9px] font-black uppercase tracking-[.2em] text-[#c7a45c]">Live data · {role.replace("_", " ")}</div><h1 className="mt-2 text-3xl font-black tracking-[-.04em]">{headings[role]}</h1></div>
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Current platform totals">{data.metrics.map((metric) => <article key={metric.label} className="border border-white/10 bg-[#151716] p-5"><h2 className="text-[10px] font-bold uppercase tracking-[.15em] text-[#999184]">{metric.label}</h2><p className="mt-3 text-3xl font-black text-[#e6bd70]">{metric.value.toLocaleString()}</p></article>)}</section>
    <section className="mt-8 border border-white/10 bg-[#121514]"><div className="border-b border-white/10 px-5 py-4"><h2 className="text-xs font-black uppercase tracking-[.15em]">Recent registrations</h2></div>{data.recent.length === 0 ? <p className="px-5 py-10 text-sm text-[#999184]">No registration records are available for this account yet.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-xs"><thead><tr>{columns.map((key) => <th key={key} className="border-b border-white/10 px-5 py-3 font-bold uppercase tracking-wider text-[#928b80]">{key.replace(/([A-Z])/g, " $1")}</th>)}</tr></thead><tbody>{data.recent.map((row, index) => <tr key={String(row.id ?? index)} className="border-b border-white/[.06] last:border-0">{columns.map((key) => <td key={key} className="max-w-[280px] truncate px-5 py-3.5 text-[#d5cec2]">{String(row[key] ?? "—")}</td>)}</tr>)}</tbody></table></div>}</section>
  </main>;
}