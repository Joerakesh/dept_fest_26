import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { createSession, hashPassword, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

function secretMatches(provided: string | null, expected: string | undefined) {
  if (!provided || !expected) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const secret = process.env.SUPERADMIN_BOOTSTRAP_SECRET;
  if (!secret) return NextResponse.json({ error: "Bootstrap is disabled." }, { status: 404 });
  if (!secretMatches(request.headers.get("x-bootstrap-secret"), secret)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  try {
    const db = await getDatabase();
    const users = db.collection("users");
    await Promise.all([
      users.createIndex({ username: 1 }, { unique: true }),
      users.createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } }),
    ]);
    const existing = await users.findOne({ $or: [{ role: "superadmin" }, { roles: "superadmin" }] }, { projection: { _id: 1 } });
    if (existing) return NextResponse.json({ error: "A Super Admin already exists. Bootstrap is permanently closed." }, { status: 409 });
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (name.length < 2 || name.length > 80 || !/^[a-z0-9]{4,24}$/.test(username) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || password.length > 128) {
      return NextResponse.json({ error: "Provide a valid name, username, email, and password of at least 12 characters." }, { status: 400 });
    }
    const now = new Date();
    const result = await users.insertOne({ username, email, name, passwordHash: await hashPassword(password), roles: ["superadmin"], status: "ACTIVE", createdAt: now, updatedAt: now });
    const { token, expiresAt } = await createSession(db, result.insertedId);
    const response = NextResponse.json({ user: { username, email, name, roles: ["superadmin"] } }, { status: 201 });
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, expires: expiresAt });
    return response;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ error: "This username or email is already in use." }, { status: 409 });
    console.error("Super Admin bootstrap failed", error);
    return NextResponse.json({ error: "Super Admin bootstrap is temporarily unavailable." }, { status: 503 });
  }
}