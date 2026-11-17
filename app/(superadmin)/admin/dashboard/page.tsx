import { getDatabase } from "@/lib/db";
import { requirePortalRole } from "@/lib/server-auth";
import { getPortalOverview } from "@/lib/portal-data";
import { DashboardOverview } from "@/components/portal/dashboard-overview";

export default async function DashboardPage() {
  const user = await requirePortalRole(["superadmin"]);
  const role = "superadmin" as const;
  const data = await getPortalOverview(await getDatabase(), user, role);
  return <DashboardOverview role={role} data={data} />;
}