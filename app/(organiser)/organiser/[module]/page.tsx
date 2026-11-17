import { requirePortalRole } from "@/lib/server-auth";
import { PortalRecordsPage } from "@/components/portal/records-page";

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const user = await requirePortalRole(["college_admin", "organiser"]);
  return <PortalRecordsPage role="organiser" user={user} module={module} />;
}