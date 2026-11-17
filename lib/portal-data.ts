import { ObjectId, type Db } from "mongodb";
import type { PortalRole, SessionUser } from "@/lib/auth";

export type PortalRow = Record<string, string | number | boolean | null>;
export type PortalMetric = { label: string; value: number };
export type PortalOverview = { metrics: PortalMetric[]; recent: PortalRow[] };

function objectId(value: string) {
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}
function activeRegistrationsFilter() {
  return { status: { $nin: ["CANCELLED", "CANCELED", "ARCHIVED"] } };
}
function serialise(value: unknown): string | number | boolean | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (value instanceof Date) return value.toISOString();
  if (value instanceof ObjectId) return value.toHexString();
  return JSON.stringify(value);
}
export function toPortalRows(documents: Record<string, unknown>[]): PortalRow[] {
  return documents.map((document) => Object.fromEntries(
    Object.entries(document)
      .filter(([key]) => !["passwordHash", "tokenHash", "resetToken", "verificationToken"].includes(key))
      .map(([key, value]) => [key === "_id" ? "id" : key, serialise(value)]),
  ));
}

export async function getPortalOverview(db: Db, user: SessionUser, role: PortalRole): Promise<PortalOverview> {
  const colleges = db.collection("colleges");
  const users = db.collection("users");
  const events = db.collection("events");
  const registrations = db.collection("registrations");

  if (role === "superadmin") {
    const [collegeCount, userCount, eventCount, registrationCount, recent] = await Promise.all([
      colleges.countDocuments({ status: { $ne: "SUSPENDED" } }),
      users.countDocuments({ status: { $ne: "SUSPENDED" } }),
      events.countDocuments({ status: { $ne: "ARCHIVED" } }),
      registrations.countDocuments(activeRegistrationsFilter()),
      registrations.find({}, { projection: { teamName: 1, registrationCode: 1, eventName: 1, status: 1, createdAt: 1, collegeName: 1 } }).sort({ createdAt: -1 }).limit(8).toArray(),
    ]);
    return { metrics: [{ label: "Active colleges", value: collegeCount }, { label: "Accounts", value: userCount }, { label: "Events", value: eventCount }, { label: "Registrations", value: registrationCount }], recent: toPortalRows(recent) };
  }

  if (role === "college_admin" || role === "organiser") {
    const selected = user.collegeMemberships[0];
    const id = selected ? objectId(selected.collegeId) : null;
    if (!id) return { metrics: [{ label: "College registrations", value: 0 }, { label: "Published events", value: 0 }, { label: "Workspace organisers", value: 0 }], recent: [] };
    const [registrationCount, eventCount, memberCount, recent] = await Promise.all([
      registrations.countDocuments({ ...activeRegistrationsFilter(), collegeId: id }),
      events.countDocuments({ status: "PUBLISHED" }),
      db.collection("college_memberships").countDocuments({ collegeId: id, status: { $ne: "REMOVED" } }),
      registrations.find({ collegeId: id }, { projection: { teamName: 1, registrationCode: 1, eventName: 1, status: 1, createdAt: 1 } }).sort({ createdAt: -1 }).limit(8).toArray(),
    ]);
    return { metrics: [{ label: "College registrations", value: registrationCount }, { label: "Published events", value: eventCount }, { label: "Workspace organisers", value: memberCount }], recent: toPortalRows(recent) };
  }

  const eventIds = user.eventIds.map(objectId).filter((id): id is ObjectId => id !== null);
  if (!eventIds.length) return { metrics: [{ label: "Assigned events", value: 0 }, { label: "Registrations", value: 0 }, { label: "Participants", value: 0 }], recent: [] };
  const [eventCount, registrationCount, participantCount, recent] = await Promise.all([
    events.countDocuments({ _id: { $in: eventIds } }),
    registrations.countDocuments({ ...activeRegistrationsFilter(), eventId: { $in: eventIds } }),
    db.collection("registration_participants").countDocuments({ eventId: { $in: eventIds } }),
    registrations.find({ eventId: { $in: eventIds } }, { projection: { teamName: 1, registrationCode: 1, eventName: 1, status: 1, createdAt: 1, collegeName: 1 } }).sort({ createdAt: -1 }).limit(8).toArray(),
  ]);
  return { metrics: [{ label: "Assigned events", value: eventCount }, { label: "Registrations", value: registrationCount }, { label: "Participants", value: participantCount }], recent: toPortalRows(recent) };
}

const adminModules: Record<string, { title: string; collection: string }> = {
  colleges: { title: "Colleges", collection: "colleges" },
  users: { title: "Users", collection: "users" },
  events: { title: "Events", collection: "events" },
  coordinators: { title: "Coordinator assignments", collection: "event_coordinator_assignments" },
  registrations: { title: "Registrations", collection: "registrations" },
  settings: { title: "Registration settings", collection: "registration_settings" },
  "audit-logs": { title: "Audit log", collection: "audit_logs" },
  faqs: { title: "FAQs", collection: "faqs" },
};
const organiserModules: Record<string, { title: string; collection: string }> = {
  events: { title: "Published events", collection: "events" },
  register: { title: "Events accepting registrations", collection: "events" },
  registrations: { title: "College registrations", collection: "registrations" },
  members: { title: "College workspace members", collection: "college_memberships" },
  profile: { title: "College workspace profile", collection: "colleges" },
};
const coordinatorModules: Record<string, { title: string; collection: string }> = {
  events: { title: "Assigned events", collection: "events" },
  registrations: { title: "Assigned event registrations", collection: "registrations" },
  participants: { title: "Participants in assigned events", collection: "registration_participants" },
};

export async function getPortalModuleRecords(db: Db, user: SessionUser, role: PortalRole, module: string) {
  const definition = (role === "superadmin" ? adminModules : role === "coordinator" ? coordinatorModules : organiserModules)[module];
  if (!definition) return null;
  const collection = db.collection(definition.collection);
  const projection = { passwordHash: 0, tokenHash: 0, resetToken: 0, verificationToken: 0 };
  let filter: Record<string, unknown> = {};

  if (role === "superadmin") {
    if (module === "users") filter = { status: { $ne: "DELETED" } };
  } else if (role === "coordinator") {
    const ids = user.eventIds.map(objectId).filter((id): id is ObjectId => id !== null);
    if (module === "events") filter = { _id: { $in: ids } };
    else filter = { eventId: { $in: ids } };
  } else {
    const selected = user.collegeMemberships[0];
    const id = selected ? objectId(selected.collegeId) : null;
    if (module === "events" || module === "register") filter = module === "register" ? { status: "PUBLISHED", registrationStatus: "OPEN" } : { status: "PUBLISHED" };
    else if (module === "profile") filter = id ? { _id: id } : { _id: null };
    else filter = id ? { collegeId: id } : { collegeId: null };
  }
  const documents = await collection.find(filter, { projection }).sort({ createdAt: -1, name: 1 }).limit(100).toArray();
  return { title: definition.title, rows: toPortalRows(documents as Record<string, unknown>[]) };
}