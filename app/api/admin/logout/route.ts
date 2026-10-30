import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin/login', req.url));
  response.cookies.set('dunderthings_admin', '', { maxAge: 0, path: '/' });
  return response;
}
