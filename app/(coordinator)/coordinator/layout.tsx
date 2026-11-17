import { requirePortalRole } from "@/lib/server-auth";
import { CoordinatorNavbar } from "@/components/portal/coordinator-navbar";

export default async function RoleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await requirePortalRole(["coordinator"]);
  return <div className="min-h-screen bg-[#0c0e0d]"><CoordinatorNavbar user={user} />{children}</div>;
}