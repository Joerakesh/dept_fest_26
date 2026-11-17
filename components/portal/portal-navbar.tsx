import Link from "next/link";
import type { PortalRole, SessionUser } from "@/lib/auth";
import { LogoutButton } from "@/components/portal/logout-button";

type NavLink = { label: string; href: string };

export function PortalNavbar({ user, title, eyebrow, links, accent }: {
  user: SessionUser;
  title: string;
  eyebrow: string;
  links: NavLink[];
  accent: string;
}) {
  const destinations: Partial<Record<PortalRole, string>> = {
    superadmin: "/admin/dashboard",
    college_admin: "/organiser/dashboard",
    organiser: "/organiser/dashboard",
    coordinator: "/coordinator/dashboard",
  };
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111313]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1500px] items-center gap-6 px-5 lg:px-8">
        <Link href={links[0]?.href ?? "/dashboard"} className="min-w-[190px]">
          <span className="block text-[12px] font-black tracking-[.16em] text-white">TECH<span style={{ color: accent }}>RODEO</span></span>
          <span className="mt-1 block text-[8px] font-bold tracking-[.2em] text-[#8d877d]">{eyebrow}</span>
        </Link>
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto" aria-label={`${title} navigation`}>
          {links.map((link) => <Link key={link.href} href={link.href} className="whitespace-nowrap rounded px-3 py-2 text-[11px] font-semibold text-[#beb8ad] transition hover:bg-white/[.05] hover:text-white">{link.label}</Link>)}
        </nav>
        <div className="hidden items-end text-right sm:flex sm:flex-col">
          <strong className="max-w-48 truncate text-[11px] text-[#eee9dc]">{user.name}</strong>
          <span className="max-w-48 truncate text-[9px] text-[#898276]">{title === "College workspace" ? user.college : user.email}</span>
        </div>
        {user.roles.length > 1 && <div className="hidden items-center gap-2 border-l border-white/10 pl-4 md:flex" aria-label="Switch role">
          {user.roles.map((role) => destinations[role] && <Link key={role} href={destinations[role]!} className="text-[9px] uppercase tracking-wider text-[#c5ad7b] hover:text-white">{role.replace("_", " ")}</Link>)}
        </div>}
        <LogoutButton />
      </div>
    </header>
  );
}