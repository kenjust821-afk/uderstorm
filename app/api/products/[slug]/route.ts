import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const reference = `DU-${Date.now()}`;
  const items = Array.isArray(body.items) ? body.items : [];

  const total = items.reduce((sum: number, item: any) => sum + Number(item.price) * Number(item.quantity), 0) + 3500;

  const order = await db.order.create({
    data: {
      reference,
      customerName: body.customerName,
      phone: body.phone,
      whatsapp: body.whatsapp || body.phone,
      email: body.email || null,
      address: body.address,
      state: body.state,
      city: body.city,
      items: JSON.stringify(items),
      total,
      status: 'New Order',
    },
  });

  const message = encodeURIComponent(
    `New D UNDERTHINGS order\nReference: ${order.reference}\nCustomer: ${body.customerName}\nPhone: ${body.phone}\nWhatsApp: ${body.whatsapp || body.phone}\nAddress: ${body.address}, ${body.city}, ${body.state}\nItems:\n${items.map((item: any) => `- ${item.name} (${item.size}/${item.color}) x${item.quantity} = ₦${Number(item.price) * Number(item.quantity)}`).join('\n')}\nTotal: ₦${total}`
  );

  return NextResponse.json({ ok: true, order, whatsappUrl: `https://wa.me/2348123456789?text=${message}` });
}










