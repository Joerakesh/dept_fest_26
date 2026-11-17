import { getDatabase } from "@/lib/db";
import { requirePortalRole } from "@/lib/server-auth";
import { getPortalModuleRecords } from "@/lib/portal-data";
import { EventManagement } from "@/components/portal/event-management";

export default async function EventsAdminPage() {
  const user = await requirePortalRole(["superadmin"]);
  const data = await getPortalModuleRecords(await getDatabase(), user, "superadmin", "events");
  return <EventManagement rows={data?.rows ?? []} />;
}