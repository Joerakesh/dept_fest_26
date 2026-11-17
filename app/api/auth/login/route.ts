import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { createSession, SESSION_COOKIE, sessionCookieOptions, verifyPassword, type UserRecord } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!/^[a-z0-9]{4,24}$/.test(username) || !password) {
      return NextResponse.json({ error: "Enter your username and password." }, { status: 400 });
    }

    const db = await getDatabase();
    const user = await db.collection<UserRecord>("users").findOne({ username });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    const { token, expiresAt } = await createSession(db, user._id);
    const response = NextResponse.json({
      user: { username: user.username, name: user.name, college: user.college, department: user.department, role: user.role },
    });
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, expires: expiresAt });
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: "Login is temporarily unavailable." }, { status: 503 });
  }
}
