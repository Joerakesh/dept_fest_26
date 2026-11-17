import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDatabase();
    const [eventCount, registrationCount, activeColleges, firstEvent] = await Promise.all([
      db.collection("events").countDocuments({ status: "PUBLISHED" }),
      db.collection("registrations").countDocuments({ status: { $nin: ["CANCELLED", "CANCELED", "ARCHIVED"] } }),
      db.collection("colleges").countDocuments({ status: "ACTIVE" }),
      db.collection("events").find({ status: "PUBLISHED", eventDate: { $type: "string" } }, { projection: { eventDate: 1 } }).sort({ eventDate: 1 }).limit(1).next(),
    ]);
    return NextResponse.json({ data: { eventCount, registrationCount, activeColleges, eventDate: firstEvent?.eventDate ?? null } }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to load public festival summary", error);
    return NextResponse.json({ error: "Festival information is temporarily unavailable." }, { status: 503 });
  }
}