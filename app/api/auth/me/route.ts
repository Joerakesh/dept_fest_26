import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDatabase } from "@/lib/db";
import { getSessionUser, SESSION_COOKIE } from "@/lib/auth";

export async function GET() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    const user = await getSessionUser(await getDatabase(), token);
    if (!user) return NextResponse.json({ user: null }, { status: 401 });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session lookup failed", error);
    return NextResponse.json({ error: "Unable to verify session." }, { status: 503 });
  }
}
