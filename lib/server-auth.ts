import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDatabase } from "@/lib/db";
import { getSessionUser, SESSION_COOKIE, type PortalRole, type SessionUser } from "@/lib/auth";

export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return getSessionUser(await getDatabase(), token);
}

export function dashboardForRole(user: SessionUser) {
  if (user.roles.includes("superadmin")) return "/admin/dashboard";
  if (user.roles.includes("college_admin") || user.roles.includes("organiser")) return "/organiser/dashboard";
  if (user.roles.includes("coordinator")) return "/coordinator/dashboard";
  return "/login";
}

export async function requirePortalRole(allowed: PortalRole[]) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.roles.some((role) => allowed.includes(role))) redirect(dashboardForRole(user));
  return user;
}