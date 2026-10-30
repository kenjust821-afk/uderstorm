import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { signSession, verifySessionRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  const user = await db.adminUser.findUnique({ where: { username } });
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login?error=1', req.url));
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    return NextResponse.redirect(new URL('/admin/login?error=1', req.url));
  }

  const response = NextResponse.redirect(new URL('/admin', req.url));
  response.cookies.set('dunderthings_admin', signSession(username), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export async function GET(req: NextRequest) {
  const session = verifySessionRequest(req);
  return NextResponse.json({ ok: !!session, user: session?.username || null });
}
