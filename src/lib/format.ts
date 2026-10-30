import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

const SECRET = process.env.JWT_SECRET || 'dunderthings-secret';

export function signSession(username: string) {
  const payload = JSON.stringify({ username, exp: Date.now() + 86400000 });
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

export function verifySession(token: string | undefined) {
  if (!token) return null;
  const [payloadBase64, signature] = token.split('.');
  if (!payloadBase64 || !signature) return null;
  const expected = crypto.createHmac('sha256', SECRET).update(Buffer.from(payloadBase64, 'base64url').toString('utf8')).digest('base64url');
  if (expected !== signature) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8')) as { username: string; exp: number };
    if (payload.exp < Date.now()) return null;
    return { username: payload.username };
  } catch {
    return null;
  }
}

export function verifySessionRequest(req: NextRequest) {
  const token = req.cookies.get('dunderthings_admin')?.value;
  return verifySession(token);
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('dunderthings_admin')?.value;
  return verifySession(token);
}
























