import { notFound } from "next/navigation";
import type { PortalRole, SessionUser } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { getPortalModuleRecords } from "@/lib/portal-data";

export async function PortalRecordsPage({ role, user, module }: { role: PortalRole; user: SessionUser; module: string }) {
  const data = await getPortalModuleRecords(await getDatabase(), user, role, module);
  if (!data) notFound();
  const columns = Array.from(new Set(data.rows.flatMap((row) => Object.keys(row)))).filter((key) => key !== "id").slice(0, 8);
  return <main className="mx-auto min-h-[calc(100vh-64px)] max-w-[1500px] px-5 py-10 text-[#eee9dc] lg:px-8"><div className="mb-7"><div className="text-[9px] font-black uppercase tracking-[.2em] text-[#c7a45c]">Database records · {role.replace("_", " ")}</div><h1 className="mt-2 text-3xl font-black tracking-[-.04em]">{data.title}</h1><p className="mt-2 text-xs text-[#938c81]">Showing {data.rows.length} record{data.rows.length === 1 ? "" : "s"} from the current database query.</p></div><section className="overflow-hidden border border-white/10 bg-[#121514]">{data.rows.length === 0 ? <p className="px-5 py-10 text-sm text-[#999184]">No matching records exist yet.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-xs"><thead><tr>{columns.map((key) => <th key={key} className="border-b border-white/10 px-5 py-3 font-bold uppercase tracking-wider text-[#928b80]">{key.replace(/([A-Z])/g, " $1")}</th>)}</tr></thead><tbody>{data.rows.map((row, index) => <tr key={String(row.id ?? index)} className="border-b border-white/[.06] last:border-0">{columns.map((key) => <td key={key} className="max-w-[320px] truncate px-5 py-3.5 text-[#d5cec2]">{String(row[key] ?? "—")}</td>)}</tr>)}</tbody></table></div>}</section></main>;
}