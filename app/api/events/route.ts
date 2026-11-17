import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/server-auth";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const events = await (await getDatabase()).collection("events")
      .find({ status: "PUBLISHED" })
      .project({ name: 1, slug: 1, category: 1, description: 1, eventDate: 1, startTime: 1, endTime: 1, venue: 1, minTeamSize: 1, maxTeamSize: 1, registrationStatus: 1, registrationClosesAt: 1 })
      .sort({ eventDate: 1, startTime: 1, name: 1 }).toArray();
    return NextResponse.json({ data: events.map(({ _id, ...event }) => ({ ...event, id: _id.toString() })) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to load published events", error);
    return NextResponse.json({ error: "Events are temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (!user.roles.includes("superadmin")) return NextResponse.json({ error: "Super Admin access required." }, { status: 403 });
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const eventDate = typeof body.eventDate === "string" ? body.eventDate.trim() : "";
    const startTime = typeof body.startTime === "string" ? body.startTime.trim() : "";
    const endTime = typeof body.endTime === "string" ? body.endTime.trim() : "";
    const minTeamSize = Number(body.minTeamSize);
    const maxTeamSize = Number(body.maxTeamSize);
    if (name.length < 2 || name.length > 100 || !category || category.length > 80 || !description || description.length > 4000) {
      return NextResponse.json({ error: "Enter an event name, category, and description." }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || !/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime) || !Number.isInteger(minTeamSize) || !Number.isInteger(maxTeamSize) || minTeamSize < 1 || maxTeamSize < minTeamSize || maxTeamSize > 20) {
      return NextResponse.json({ error: "Enter valid event timing and team-size rules." }, { status: 400 });
    }
    const slug = name.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const db = await getDatabase();
    await db.collection("events").createIndex({ slug: 1 }, { unique: true });
    const now = new Date();
    const status = body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
    const event = { name, slug, category, description, eventDate, startTime, endTime, venue: typeof body.venue === "string" ? body.venue.trim() : "", minTeamSize, maxTeamSize, registrationStatus: body.registrationStatus === "OPEN" ? "OPEN" : "CLOSED", status, createdBy: new ObjectId(user.id), createdAt: now, updatedAt: now };
    const result = await db.collection("events").insertOne(event);
    try { await db.collection("audit_logs").insertOne({ actorUserId: new ObjectId(user.id), action: "event.created", resourceType: "event", resourceId: result.insertedId, metadata: { slug, status }, createdAt: now }); } catch (auditError) { console.error("Event created but audit entry failed", auditError); }
    return NextResponse.json({ data: { id: result.insertedId.toString(), ...event } }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ error: "An event with that name already exists." }, { status: 409 });
    console.error("Unable to create event", error);
    return NextResponse.json({ error: "Event creation failed." }, { status: 503 });
  }
}