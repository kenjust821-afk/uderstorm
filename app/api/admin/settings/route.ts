import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySessionRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = verifySessionRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await db.setting.findMany({ orderBy: { key: 'asc' } });
  return NextResponse.json(Object.fromEntries(settings.map((setting) => [setting.key, setting.value])));
}

export async function PUT(req: NextRequest) {
  const session = verifySessionRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await req.json();

  for (const [key, value] of Object.entries(payload)) {
    await db.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }

  return NextResponse.json({ ok: true });
}
