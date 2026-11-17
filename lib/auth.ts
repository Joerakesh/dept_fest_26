import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { Db, ObjectId } from "mongodb";

const scrypt = promisify(scryptCallback);
export const SESSION_COOKIE = "techrodeo_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface UserRecord {
  _id: ObjectId;
  username: string;
  name: string;
  college: string;
  department: string;
  passwordHash: string;
  role: "student" | "organizer";
  createdAt: Date;
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [saltHex, keyHex] = stored.split(":");
  if (!saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = (await scrypt(password, Buffer.from(saltHex, "hex"), expected.length)) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function generateSessionToken() {
  return randomBytes(32).toString("base64url");
}

export async function createSession(db: Db, userId: ObjectId) {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.collection("sessions").insertOne({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
    createdAt: new Date(),
  });
  return { token, expiresAt };
}

export async function getSessionUser(db: Db, token?: string | null) {
  if (!token) return null;
  const session = await db.collection("sessions").findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  });
  if (!session) return null;
  const user = await db.collection<UserRecord>("users").findOne({ _id: session.userId as ObjectId });
  if (!user) return null;
  return {
    id: user._id.toString(),
    username: user.username,
    name: user.name,
    college: user.college,
    department: user.department,
    role: user.role,
  };
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
};
