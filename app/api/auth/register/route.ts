import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { createSession, hashPassword, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

function usernameBase(name: string) {
  return name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "").slice(0, 18) || "student";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
    const college = typeof body.college === "string" ? body.college.trim().replace(/\s+/g, " ") : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Enter a name between 2 and 80 characters." }, { status: 400 });
    }
    if (college.length < 2 || college.length > 120) {
      return NextResponse.json({ error: "Enter a valid college name." }, { status: 400 });
    }
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const db = await getDatabase();
    const users = db.collection("users");
    await users.createIndex({ username: 1 }, { unique: true });
    const base = usernameBase(name);
    let username = "";
    for (let attempt = 0; attempt < 8; attempt++) {
      const suffix = Math.floor(1000 + Math.random() * 9000).toString();
      const candidate = `${base}${suffix}`;
      if (!(await users.findOne({ username: candidate }, { projection: { _id: 1 } }))) {
        username = candidate;
        break;
      }
    }
    if (!username) return NextResponse.json({ error: "Unable to create a username. Please try again." }, { status: 503 });

    const now = new Date();
    const result = await users.insertOne({
      username,
      name,
      college,
      passwordHash: await hashPassword(password),
      role: "student",
      createdAt: now,
      updatedAt: now,
    });
    const { token, expiresAt } = await createSession(db, result.insertedId);
    const response = NextResponse.json({
      message: "Account created.",
      user: { username, name, college, role: "student" },
    }, { status: 201 });
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, expires: expiresAt });
    return response;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "Please try registering again." }, { status: 409 });
    }
    console.error("Registration failed", error);
    return NextResponse.json({ error: "Registration is temporarily unavailable." }, { status: 503 });
  }
}
