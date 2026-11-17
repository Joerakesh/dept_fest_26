import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import type { Document, ObjectId } from "mongodb";

interface EventDocument extends Document {
  _id: ObjectId;
  name: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export async function GET() {
  try {
    const events = await (await getDatabase())
      .collection<EventDocument>("events")
      .find({ status: "PUBLISHED" })
      .sort({ name: 1 })
      .toArray();

    const data = events.map(({ _id, ...event }) => ({ ...event, id: _id.toString() }));
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unable to load published events", error);
    return NextResponse.json({ error: "Events are temporarily unavailable." }, { status: 503 });
  }
}

// Keep writes closed until a server-verified Super Admin session is implemented.
export async function POST(_request: Request) {
  return NextResponse.json({ error: "Event creation is unavailable until authentication is configured." }, { status: 503 });
}
