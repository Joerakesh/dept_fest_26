import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { Db, ObjectId } from "mongodb";

const scrypt = promisify(scryptCallback);
export const SESSION_COOKIE = "techrodeo_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type PortalRole = "superadmin" | "college_admin" | "organiser" | "coordinator";
export type CollegeMembership = { collegeId: string; collegeName: string; role: "college_admin" | "organiser" };
export type SessionUser = {
  id: string;
  username: string;
  email: string;
  name: string;
  role: PortalRole | null;
  roles: PortalRole[];
  college: string;
  department: string;
  collegeMemberships: CollegeMembership[];
  eventIds: string[];
};
export interface UserRecord {
  _id: ObjectId;
  username: string;
  email?: string;
  name: string;
  college?: string;
  department?: string;
  passwordHash: string;
  role?: string;
  roles?: string[];
  status?: "ACTIVE" | "SUSPENDED" | "PENDING";
  createdAt: Date;
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [saltHex, keyHex] = stored.split(":");
  if (!saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = (await scrypt(password, Buffer.from(saltHex, "hex"), expected.length)) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function generateSessionToken() {
  return randomBytes(32).toString("base64url");
}

export async function createSession(db: Db, userId: ObjectId) {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.collection("sessions").insertOne({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
    createdAt: new Date(),
  });
  return { token, expiresAt };
}

const roleSet = new Set<PortalRole>(["superadmin", "college_admin", "organiser", "coordinator"]);
function normaliseRole(role: string): PortalRole | null {
  if (role === "organizer") return "organiser";
  return roleSet.has(role as PortalRole) ? role as PortalRole : null;
}

export async function getSessionUser(db: Db, token?: string | null): Promise<SessionUser | null> {
  if (!token) return null;
  const session = await db.collection("sessions").findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  });
  if (!session) return null;
  const user = await db.collection<UserRecord>("users").findOne({ _id: session.userId as ObjectId });
  if (!user || (user.status !== undefined && user.status !== "ACTIVE")) return null;

  const [membershipDocs, assignmentDocs] = await Promise.all([
    db.collection("college_memberships").find({ userId: user._id, status: { $nin: ["REMOVED", "SUSPENDED"] } }).toArray(),
    db.collection("event_coordinator_assignments").find({ userId: user._id, status: { $nin: ["REMOVED", "SUSPENDED"] } }).toArray(),
  ]);
  const memberships: CollegeMembership[] = [];
  for (const membership of membershipDocs) {
    if (membership.role !== "college_admin" && membership.role !== "organiser") continue;
    const college = await db.collection<{ name?: string; status?: string }>("colleges").findOne({ _id: membership.collegeId });
    if (!college || (college.status && college.status !== "ACTIVE")) continue;
    memberships.push({ collegeId: String(membership.collegeId), collegeName: college.name ?? "College workspace", role: membership.role });
  }

  const roles = new Set<PortalRole>();
  for (const role of user.roles ?? []) {
    const normalised = normaliseRole(role);
    if (normalised === "superadmin") roles.add(normalised);
  }
  const directRole = user.role ? normaliseRole(user.role) : null;
  if (directRole === "superadmin") roles.add(directRole);
  for (const membership of memberships) roles.add(membership.role);
  if (assignmentDocs.length) roles.add("coordinator");
  const rolePriority: PortalRole[] = ["superadmin", "college_admin", "organiser", "coordinator"];
  const orderedRoles = rolePriority.filter((candidate) => roles.has(candidate));

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email ?? "",
    name: user.name,
    college: memberships[0]?.collegeName ?? user.college ?? "",
    department: user.department ?? "",
    role: orderedRoles[0] ?? null,
    roles: orderedRoles,
    collegeMemberships: memberships,
    eventIds: assignmentDocs.map((assignment) => String(assignment.eventId)),
  };
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
};