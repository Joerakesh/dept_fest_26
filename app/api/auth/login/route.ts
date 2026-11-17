import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { createSession, getSessionUser, hashToken, SESSION_COOKIE, sessionCookieOptions, verifyPassword, type UserRecord } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const login = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!login || login.length > 254 || !password) {
      return NextResponse.json({ error: "Enter your username or email and password." }, { status: 400 });
    }

    const db = await getDatabase();
    const user = await db.collection<UserRecord>("users").findOne({
      $or: [{ username: login }, { email: login }],
    });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }
    if (user.status === "SUSPENDED" || user.status === "PENDING") {
      return NextResponse.json({ error: "This account is not currently active." }, { status: 403 });
    }

    const { token, expiresAt } = await createSession(db, user._id);
    const sessionUser = await getSessionUser(db, token);
    if (!sessionUser?.roles.length) {
      await db.collection("sessions").deleteOne({ tokenHash: hashToken(token) });
      return NextResponse.json({ error: "This account has no organiser or coordinator role. Ask your College Admin for an invitation." }, { status: 403 });
    }
    const response = NextResponse.json({ user: sessionUser });
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, expires: expiresAt });
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: "Login is temporarily unavailable." }, { status: 503 });
  }
}