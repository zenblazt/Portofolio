import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret || rawSecret.length < 16) {
  // A missing or weak JWT_SECRET means anyone could forge an admin session token.
  // Fail loudly instead of silently falling back to a guessable default.
  console.error(
    "FATAL: JWT_SECRET belum di-set atau terlalu pendek (min 16 karakter). Set JWT_SECRET di environment variables sebelum menjalankan app."
  );
}
const secret = new TextEncoder().encode(rawSecret || "insecure-fallback-do-not-use-in-production");
const COOKIE_NAME = "zenhub_admin_token";
const EXPIRY = "1d";

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export async function signAdminToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(secret);
}

export async function verifyAdminToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
