import type { SessionUser } from "@/lib/auth";
import { PortalNavbar } from "@/components/portal/portal-navbar";
export function CoordinatorNavbar({ user }: { user: SessionUser }) {
  return <PortalNavbar user={user} title="Event operations" eyebrow="COORDINATOR · ASSIGNED EVENTS" accent="#8ebc79" links={[
    { label: "Overview", href: "/coordinator/dashboard" }, { label: "My events", href: "/coordinator/events" }, { label: "Registrations", href: "/coordinator/registrations" }, { label: "Participants", href: "/coordinator/participants" },
  ]} />;
}