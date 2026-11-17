import { redirect } from "next/navigation";
import { getCurrentUser, dashboardForRole } from "@/lib/server-auth";

export default async function DashboardRedirect() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  redirect(dashboardForRole(user));
}