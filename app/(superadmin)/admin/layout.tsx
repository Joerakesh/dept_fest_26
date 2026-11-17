import { requirePortalRole } from "@/lib/server-auth";
import { SuperAdminNavbar } from "@/components/portal/superadmin-navbar";

export default async function RoleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await requirePortalRole(["superadmin"]);
  return <div className="min-h-screen bg-[#0c0e0d]"><SuperAdminNavbar user={user} />{children}</div>;
}