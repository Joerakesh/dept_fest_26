import type { SessionUser } from "@/lib/auth";
import { PortalNavbar } from "@/components/portal/portal-navbar";
export function OrganiserNavbar({ user }: { user: SessionUser }) {
  return <PortalNavbar user={user} title="College workspace" eyebrow="ORGANISER · COLLEGE OPERATIONS" accent="#d3ae61" links={[
    { label: "Overview", href: "/organiser/dashboard" }, { label: "Events", href: "/organiser/events" }, { label: "Register team", href: "/organiser/register" }, { label: "Registrations", href: "/organiser/registrations" }, { label: "Members", href: "/organiser/members" }, { label: "College profile", href: "/organiser/profile" },
  ]} />;
}