import type { SessionUser } from "@/lib/auth";
import { PortalNavbar } from "@/components/portal/portal-navbar";
export function SuperAdminNavbar({ user }: { user: SessionUser }) {
  return <PortalNavbar user={user} title="Platform control" eyebrow="SUPER ADMIN · GLOBAL OPERATIONS" accent="#ef5138" links={[
    { label: "Overview", href: "/admin/dashboard" }, { label: "Colleges", href: "/admin/colleges" }, { label: "Users", href: "/admin/users" }, { label: "Events", href: "/admin/events" }, { label: "Coordinators", href: "/admin/coordinators" }, { label: "Registrations", href: "/admin/registrations" }, { label: "Settings", href: "/admin/settings" }, { label: "FAQs", href: "/admin/faqs" }, { label: "Audit log", href: "/admin/audit-logs" },
  ]} />;
}