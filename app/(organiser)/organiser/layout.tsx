import { requirePortalRole } from "@/lib/server-auth";
import { OrganiserNavbar } from "@/components/portal/organiser-navbar";

export default async function RoleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await requirePortalRole(["college_admin", "organiser"]);
  return <div className="min-h-screen bg-[#0c0e0d]"><OrganiserNavbar user={user} />{children}</div>;
}