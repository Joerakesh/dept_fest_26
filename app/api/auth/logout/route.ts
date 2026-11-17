import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDatabase } from "@/lib/db";
import { hashToken, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      await (await getDatabase()).collection("sessions").deleteOne({ tokenHash: hashToken(token) });
    } catch (error) {
      console.error("Session cleanup failed", error);
    }
  }
  const response = NextResponse.json({ message: "Signed out." });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
