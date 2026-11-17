import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { createSession, hashPassword, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import type { ObjectId } from "mongodb";

function usernameBase(name: string) {
  return name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "").slice(0, 18) || "organiser";
}

export async function POST(request: Request) {
  let db: Awaited<ReturnType<typeof getDatabase>> | undefined;
  let createdCollegeId: ObjectId | undefined;
  let createdUserId: ObjectId | undefined;
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const college = typeof body.college === "string" ? body.college.trim().replace(/\s+/g, " ") : "";
    const location = typeof body.location === "string" ? body.location.trim().replace(/\s+/g, " ") : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Enter a name between 2 and 80 characters." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ error: "Enter a valid institution email address." }, { status: 400 });
    if (college.length < 2 || college.length > 120) return NextResponse.json({ error: "Enter a valid college name." }, { status: 400 });
    if (location.length < 2 || location.length > 160) return NextResponse.json({ error: "Enter the college location." }, { status: 400 });
    if (password.length < 8 || password.length > 128) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

    db = await getDatabase();
    const colleges = db.collection("colleges");
    const users = db.collection("users");
    const memberships = db.collection("college_memberships");
    await Promise.all([
      users.createIndex({ username: 1 }, { unique: true }),
      users.createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } }),
      colleges.createIndex({ normalizedName: 1 }, { unique: true, partialFilterExpression: { normalizedName: { $type: "string" } } }),
    ]);

    const normalizedName = college.normalize("NFKC").toLocaleLowerCase("en-US");
    if (await colleges.findOne({ normalizedName }, { projection: { _id: 1 } })) {
      return NextResponse.json({ error: "A workspace for this college already exists. Ask its College Admin for an invitation." }, { status: 409 });
    }
    if (await users.findOne({ email }, { projection: { _id: 1 } })) {
      return NextResponse.json({ error: "An account already uses this email. Sign in or request an invitation." }, { status: 409 });
    }

    const base = usernameBase(name);
    let username = "";
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = `${base}${randomInt(1000, 10000)}`;
      if (!(await users.findOne({ username: candidate }, { projection: { _id: 1 } }))) {
        username = candidate;
        break;
      }
    }
    if (!username) return NextResponse.json({ error: "Unable to create a username. Please try again." }, { status: 503 });

    const now = new Date();
    const collegeResult = await colleges.insertOne({
      name: college,
      normalizedName,
      emailDomain: email.split("@")[1],
      location,
      status: "ACTIVE",
      createdAt: now,
      updatedAt: now,
    });
    createdCollegeId = collegeResult.insertedId;
    const userResult = await users.insertOne({
      username,
      email,
      name,
      passwordHash: await hashPassword(password),
      status: "ACTIVE",
      createdAt: now,
      updatedAt: now,
    });
    createdUserId = userResult.insertedId;
    await memberships.insertOne({
      userId: userResult.insertedId,
      collegeId: collegeResult.insertedId,
      role: "college_admin",
      status: "ACTIVE",
      createdAt: now,
      updatedAt: now,
    });

    const { token, expiresAt } = await createSession(db, userResult.insertedId);
    const response = NextResponse.json({
      message: "College workspace created.",
      user: { username, email, name, role: "college_admin", college },
    }, { status: 201 });
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, expires: expiresAt });
    return response;
  } catch (error) {
    if (db && (createdUserId || createdCollegeId)) {
      await Promise.all([
        createdUserId ? db.collection("users").deleteOne({ _id: createdUserId }) : Promise.resolve(),
        createdCollegeId ? db.collection("colleges").deleteOne({ _id: createdCollegeId }) : Promise.resolve(),
        createdUserId ? db.collection("college_memberships").deleteMany({ userId: createdUserId }) : Promise.resolve(),
      ]).catch((cleanupError) => console.error("College signup cleanup failed", cleanupError));
    }
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "A college workspace or account already exists for those details." }, { status: 409 });
    }
    console.error("College registration failed", error);
    return NextResponse.json({ error: "College registration is temporarily unavailable." }, { status: 503 });
  }
}